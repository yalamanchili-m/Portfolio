/**
 * Agentic Tetris — heuristic agent.
 *
 * For the active piece it enumerates every reachable (rotation, landing
 * column) pair, drops a copy of the board, clears lines, and scores the
 * result with a Dellacherie-style weighted heuristic. Pure simulation, no
 * timers or DOM, so the cost is measured and reported per decision.
 */

import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  cellsCollide,
  ROTATIONS,
  type Board,
  type CellOffset,
  type PieceType,
} from "./engine";

/** Weights, exactly as exposed in the telemetry panel. */
export const WEIGHTS = {
  lines: 0.76,
  aggregateHeight: -0.51,
  holes: -0.36,
  bumpiness: -0.18,
} as const;

export interface BoardFeatures {
  aggregateHeight: number;
  holes: number;
  bumpiness: number;
}

export interface HeuristicBreakdown extends BoardFeatures {
  lines: number;
  total: number;
}

export interface AgentPlan {
  rotation: number;
  column: number;
  row: number;
  cells: CellOffset[];
  breakdown: HeuristicBreakdown;
}

export interface AgentReport {
  plan: AgentPlan | null;
  evaluated: number;
  elapsedMs: number;
}

export function measureBoard(board: Board): BoardFeatures {
  const heights: number[] = [];

  for (let x = 0; x < BOARD_WIDTH; x += 1) {
    let height = 0;
    for (let y = 0; y < BOARD_HEIGHT; y += 1) {
      if (board[y][x] !== null) {
        height = BOARD_HEIGHT - y;
        break;
      }
    }
    heights.push(height);
  }

  let holes = 0;
  for (let x = 0; x < BOARD_WIDTH; x += 1) {
    let covered = false;
    for (let y = 0; y < BOARD_HEIGHT; y += 1) {
      if (board[y][x] !== null) covered = true;
      else if (covered) holes += 1;
    }
  }

  let bumpiness = 0;
  for (let x = 0; x < heights.length - 1; x += 1) {
    bumpiness += Math.abs(heights[x] - heights[x + 1]);
  }

  return {
    aggregateHeight: heights.reduce((sum, height) => sum + height, 0),
    holes,
    bumpiness,
  };
}

function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

/** Drop a simulated piece from the top and return its resting row, or null. */
function landingRow(board: Board, cells: CellOffset[], x: number): number | null {
  const placed = cells.map((cell) => ({ x: x + cell.x, y: cell.y }));
  if (cellsCollide(board, placed)) return null;

  let y = 0;
  for (;;) {
    const next = placed.map((cell) => ({ x: cell.x, y: cell.y + y + 1 }));
    if (cellsCollide(board, next)) return y;
    y += 1;
  }
}

export function planPlacement(board: Board, type: PieceType): AgentReport {
  const started = performance.now();
  let evaluated = 0;
  let best: AgentPlan | null = null;

  for (let rotation = 0; rotation < 4; rotation += 1) {
    const cells = ROTATIONS[type][rotation];
    const minX = Math.min(...cells.map((cell) => cell.x));
    const maxX = Math.max(...cells.map((cell) => cell.x));

    for (let column = -minX; column + maxX < BOARD_WIDTH; column += 1) {
      const row = landingRow(board, cells, column);
      evaluated += 1;
      if (row === null) continue;

      const next = cloneBoard(board);
      for (const cell of cells) {
        const x = column + cell.x;
        const y = row + cell.y;
        if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
          next[y][x] = type;
        }
      }

      const clearedRows = next.filter((line) => line.every((cell) => cell !== null));
      const lines = clearedRows.length;
      const settled = next.filter((line) => !line.every((cell) => cell !== null));
      while (settled.length < BOARD_HEIGHT) {
        settled.unshift(Array.from({ length: BOARD_WIDTH }, () => null));
      }

      const features = measureBoard(settled);
      const total =
        WEIGHTS.lines * lines +
        WEIGHTS.aggregateHeight * features.aggregateHeight +
        WEIGHTS.holes * features.holes +
        WEIGHTS.bumpiness * features.bumpiness;

      if (!best || total > best.breakdown.total) {
        best = {
          rotation,
          column,
          row,
          cells: cells.map((cell) => ({
            x: column + cell.x,
            y: row + cell.y,
          })),
          breakdown: { lines, ...features, total },
        };
      }
    }
  }

  return { plan: best, evaluated, elapsedMs: performance.now() - started };
}
