/**
 * Agentic Tetris — pure engine.
 *
 * Framework-free board state, tetromino geometry, SRS rotation, hold, lock
 * delay and Guideline scoring. Nothing in this module touches React or the
 * DOM, so it can be simulated headlessly by the AI planner and driven by any
 * renderer.
 */

export type PieceType = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const ALL_PIECES: PieceType[] = ["I", "J", "L", "O", "S", "T", "Z"];

/** Grace period after a piece touches down, in milliseconds. */
export const LOCK_DELAY_MS = 500;
/** Maximum number of times a grounded piece may reset its lock timer. */
export const MAX_LOCK_RESETS = 15;

export type Board = (PieceType | null)[][];

export interface ActivePiece {
  type: PieceType;
  rotation: number;
  /** Column of the piece matrix origin. */
  x: number;
  /** Row of the piece matrix origin. */
  y: number;
  /** Increments on every spawn so consumers can key per-piece work. */
  serial: number;
}

export interface CellOffset {
  x: number;
  y: number;
}

/** A line clear the renderer can celebrate and flash. */
export interface ClearEvent {
  /** Row indices that were cleared, top-first. */
  rows: number[];
  count: number;
  /** Points awarded, including back-to-back and combo bonuses. */
  points: number;
  /** "SINGLE" | "DOUBLE" | "TRIPLE" | "TETRIS" */
  label: string;
  backToBack: boolean;
  /** Active combo chain (0 when this clear did not extend one). */
  combo: number;
}

/** Snapshot of the board as it looked on the frame a clear resolved. */
export interface ClearFlash {
  rows: number[];
  board: Board;
  startedAt: number;
}

const BASE_SHAPES: Record<PieceType, number[][]> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

function rotateCW(matrix: number[][]): number[][] {
  const size = matrix.length;
  return matrix.map((row, y) => row.map((_, x) => matrix[size - 1 - x][y]));
}

function toOffsets(matrix: number[][]): CellOffset[] {
  const cells: CellOffset[] = [];
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) cells.push({ x, y });
    });
  });
  return cells;
}

/** Offset cells for every piece in its four SRS rotation states. */
export const ROTATIONS: Record<PieceType, CellOffset[][]> = ALL_PIECES.reduce(
  (table, type) => {
    const states: CellOffset[][] = [];
    let matrix = BASE_SHAPES[type];
    for (let rotation = 0; rotation < 4; rotation += 1) {
      states.push(toOffsets(matrix));
      matrix = rotateCW(matrix);
    }
    table[type] = states;
    return table;
  },
  {} as Record<PieceType, CellOffset[][]>,
);

/** Matrix width per piece — used to centre the spawn. */
export const PIECE_SIZE: Record<PieceType, number> = ALL_PIECES.reduce(
  (table, type) => {
    table[type] = BASE_SHAPES[type].length;
    return table;
  },
  {} as Record<PieceType, number>,
);

/*
 * Super Rotation System wall kicks. Offsets are in screen space (y grows
 * downward), already converted from the standard up-positive tables.
 */
const JLSTZ_KICKS: Record<string, [number, number][]> = {
  "0>1": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  "1>0": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  "1>2": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  "2>1": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  "2>3": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  "3>2": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  "3>0": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  "0>3": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
};

const I_KICKS: Record<string, [number, number][]> = {
  "0>1": [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
  "1>0": [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
  "1>2": [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
  "2>1": [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
  "2>3": [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
  "3>2": [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
  "3>0": [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
  "0>3": [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
};

/** Guideline base points for 1–4 cleared rows, before the level factor. */
export const LINE_SCORES = [0, 100, 300, 500, 800];
/** Guideline back-to-back multiplier for consecutive four-row clears. */
export const BACK_TO_BACK_MULTIPLIER = 1.5;
/** Guideline combo step: 50 points per chained clear. */
export const COMBO_STEP = 50;

const CLEAR_LABELS = ["", "SINGLE", "DOUBLE", "TRIPLE", "TETRIS"];

/** How long the renderer should hold the pre-collapse board for its flash. */
export const CLEAR_FLASH_MS = 150;

export function createBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null as PieceType | null),
  );
}

export function absoluteCells(piece: ActivePiece): CellOffset[] {
  return ROTATIONS[piece.type][piece.rotation].map((cell) => ({
    x: piece.x + cell.x,
    y: piece.y + cell.y,
  }));
}

/** True when the given absolute cells overlap a wall, floor or settled block. */
export function cellsCollide(board: Board, cells: CellOffset[]): boolean {
  return cells.some(
    ({ x, y }) =>
      x < 0 ||
      x >= BOARD_WIDTH ||
      y >= BOARD_HEIGHT ||
      (y >= 0 && board[y][x] !== null),
  );
}

/** Guideline gravity: milliseconds per row at the given level. */
export function gravityInterval(level: number): number {
  return Math.max(70, 800 * Math.pow(0.85, level - 1));
}

export class TetrisEngine {
  board: Board = createBoard();
  active: ActivePiece | null = null;
  queue: PieceType[] = [];
  hold: PieceType | null = null;
  /** True once the hold slot has been used for the current piece. */
  holdUsed = false;
  score = 0;
  lines = 0;
  level = 1;
  over = false;

  /** Clear celebrations drained by the renderer, oldest first. */
  events: ClearEvent[] = [];
  /** Pre-collapse snapshot for the row flash; null once it expires. */
  flash: ClearFlash | null = null;

  private bag: PieceType[] = [];
  private serial = 0;
  private gravityAcc = 0;
  private grounded = false;
  private lockTimer = 0;
  private lockResets = 0;
  private combo = 0;
  private backToBack = 0;

  constructor(private random: () => number = Math.random) {
    this.fillQueue();
    this.spawn();
  }

  /** Full 10x20 reset, keeping the caller's RNG. */
  reset() {
    this.board = createBoard();
    this.queue = [];
    this.hold = null;
    this.holdUsed = false;
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.over = false;
    this.events = [];
    this.flash = null;
    this.bag = [];
    this.serial = 0;
    this.gravityAcc = 0;
    this.grounded = false;
    this.lockTimer = 0;
    this.lockResets = 0;
    this.combo = 0;
    this.backToBack = 0;
    this.fillQueue();
    this.spawn();
  }

  /** 7-bag randomiser: every piece appears once per bag. */
  private draw(): PieceType {
    if (this.bag.length === 0) {
      this.bag = [...ALL_PIECES];
      for (let i = this.bag.length - 1; i > 0; i -= 1) {
        const j = Math.floor(this.random() * (i + 1));
        [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
      }
    }
    return this.bag.pop() as PieceType;
  }

  private fillQueue() {
    while (this.queue.length < 5) this.queue.push(this.draw());
  }

  /** Visible next pieces. */
  get nextPieces(): PieceType[] {
    return this.queue.slice(0, 3);
  }

  /** Milliseconds per row at the current level. */
  get dropInterval(): number {
    return gravityInterval(this.level);
  }

  private spawnAt(type: PieceType) {
    this.serial += 1;
    const size = PIECE_SIZE[type];
    const piece: ActivePiece = {
      type,
      rotation: 0,
      x: Math.floor((BOARD_WIDTH - size) / 2),
      y: 0,
      serial: this.serial,
    };
    this.active = piece;
    this.grounded = false;
    this.lockTimer = 0;
    this.lockResets = 0;
    this.gravityAcc = 0;
    if (cellsCollide(this.board, absoluteCells(piece))) {
      this.over = true;
    }
  }

  private spawn() {
    if (this.queue.length === 0) this.fillQueue();
    const type = this.queue.shift() as PieceType;
    this.fillQueue();
    this.holdUsed = false;
    this.spawnAt(type);
  }

  /** True when the active piece cannot move down any further. */
  private isGrounded(): boolean {
    if (!this.active) return false;
    return cellsCollide(this.board, absoluteCells({ ...this.active, y: this.active.y + 1 }));
  }

  /** Called after any successful move or rotation to refresh lock delay. */
  private touchLockDelay() {
    const grounded = this.isGrounded();
    this.grounded = grounded;
    if (!grounded) {
      this.lockTimer = 0;
      return;
    }
    if (this.lockResets < MAX_LOCK_RESETS) {
      this.lockTimer = 0;
      this.lockResets += 1;
    }
  }

  move(dx: number): boolean {
    if (!this.active || this.over) return false;
    const candidate = { ...this.active, x: this.active.x + dx };
    if (cellsCollide(this.board, absoluteCells(candidate))) return false;
    this.active = candidate;
    this.touchLockDelay();
    return true;
  }

  rotate(direction: 1 | -1 = 1): boolean {
    if (!this.active || this.over || this.active.type === "O") return false;
    const from = this.active.rotation;
    const to = (from + (direction === 1 ? 1 : 3)) % 4;
    const kicks = (this.active.type === "I" ? I_KICKS : JLSTZ_KICKS)[`${from}>${to}`];

    for (const [dx, dy] of kicks) {
      const candidate = {
        ...this.active,
        rotation: to,
        x: this.active.x + dx,
        y: this.active.y + dy,
      };
      if (!cellsCollide(this.board, absoluteCells(candidate))) {
        this.active = candidate;
        this.touchLockDelay();
        return true;
      }
    }
    return false;
  }

  /** Row where the active piece would come to rest. */
  landingRow(): number {
    if (!this.active) return 0;
    let y = this.active.y;
    for (;;) {
      const candidate = { ...this.active, y: y + 1 };
      if (cellsCollide(this.board, absoluteCells(candidate))) return y;
      y += 1;
    }
  }

  /** Ghost cells at the landing position, ignoring rows above the ceiling. */
  ghostCells(): CellOffset[] {
    if (!this.active) return [];
    return absoluteCells({ ...this.active, y: this.landingRow() });
  }

  /** Manual down-step: +1 point per cell, as in the Guideline rules. */
  softDrop(): boolean {
    if (!this.active || this.over) return false;
    const candidate = { ...this.active, y: this.active.y + 1 };
    if (cellsCollide(this.board, absoluteCells(candidate))) {
      this.grounded = true;
      return false;
    }
    this.active = candidate;
    this.score += 1;
    this.gravityAcc = 0;
    this.touchLockDelay();
    return true;
  }

  /** Instant drop: +2 points per cell, then lock with no grace period. */
  hardDrop(): void {
    if (!this.active || this.over) return;
    const landing = this.landingRow();
    this.score += Math.max(0, landing - this.active.y) * 2;
    this.active = { ...this.active, y: landing };
    this.lock();
  }

  /**
   * Guideline hold: swap the active piece into the hold slot. Only one swap
   * is allowed per spawned piece.
   */
  holdPiece(): boolean {
    if (!this.active || this.over || this.holdUsed) return false;
    const outgoing = this.active.type;
    const incoming = this.hold ?? (this.queue.shift() as PieceType);
    this.hold = outgoing;
    this.fillQueue();
    this.spawnAt(incoming);
    this.holdUsed = true;
    return true;
  }

  /**
   * Advance gravity and the lock delay by `dt` milliseconds.
   * Returns true when a piece locked on this tick.
   */
  tick(dt: number): boolean {
    if (!this.active || this.over) return false;
    if (this.flash && performance.now() - this.flash.startedAt > CLEAR_FLASH_MS) {
      this.flash = null;
    }

    if (this.isGrounded()) {
      this.grounded = true;
      this.gravityAcc = 0;
      this.lockTimer += dt;
      if (this.lockTimer >= LOCK_DELAY_MS) {
        this.lock();
        return true;
      }
      return false;
    }

    this.grounded = false;
    this.gravityAcc += dt;
    const interval = this.dropInterval;
    while (this.gravityAcc >= interval) {
      this.gravityAcc -= interval;
      if (!this.softDropSilent()) break;
    }

    if (this.isGrounded()) {
      this.grounded = true;
      this.lockTimer = 0;
    }
    return false;
  }

  /** Gravity step that awards no soft-drop points. */
  private softDropSilent(): boolean {
    if (!this.active) return false;
    const candidate = { ...this.active, y: this.active.y + 1 };
    if (cellsCollide(this.board, absoluteCells(candidate))) return false;
    this.active = candidate;
    return true;
  }

  /** Merge the active piece into the board, score any clear and spawn again. */
  lock(): void {
    if (!this.active) return;
    const active = this.active;
    for (const { x, y } of absoluteCells(active)) {
      if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
        this.board[y][x] = active.type;
      }
    }

    const rows: number[] = [];
    this.board.forEach((row, y) => {
      if (row.every((cell) => cell !== null)) rows.push(y);
    });

    if (rows.length > 0) {
      this.resolveClear(rows);
    } else {
      this.combo = 0;
    }

    this.spawn();
  }

  private resolveClear(rows: number[]) {
    const count = Math.min(rows.length, 4);
    const level = this.level;
    const difficult = count === 4;

    // Snapshot before the rows collapse so the renderer can flash them.
    const snapshot = this.board.map((row) => [...row]);

    let points = LINE_SCORES[count] * level;
    const backToBack = difficult && this.backToBack > 0;
    if (backToBack) points = Math.floor(points * BACK_TO_BACK_MULTIPLIER);

    this.combo += 1;
    if (this.combo > 1) points += COMBO_STEP * (this.combo - 1) * level;

    this.backToBack = difficult ? this.backToBack + 1 : 0;

    this.score += points;
    this.lines += rows.length;
    this.level = 1 + Math.floor(this.lines / 10);

    const survivors = this.board.filter((_, y) => !rows.includes(y));
    while (survivors.length < BOARD_HEIGHT) {
      survivors.unshift(Array.from({ length: BOARD_WIDTH }, () => null));
    }
    this.board = survivors;

    this.flash = { rows, board: snapshot, startedAt: performance.now() };
    this.events.push({
      rows,
      count,
      points,
      label: CLEAR_LABELS[count] ?? "CLEAR",
      backToBack,
      combo: this.combo,
    });
  }

  /** Drain the clear events collected since the last call. */
  drainEvents(): ClearEvent[] {
    const drained = this.events;
    this.events = [];
    return drained;
  }
}
