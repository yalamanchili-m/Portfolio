"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { planPlacement, type AgentPlan } from "@/lib/tetris/agent";
import {
  absoluteCells,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  ROTATIONS,
  TetrisEngine,
  type Board,
  type ClearEvent,
  type PieceType,
} from "@/lib/tetris/engine";

/* ------------------------------------------------------------------ */
/* Geometry, timing and storage keys                                   */
/* ------------------------------------------------------------------ */

/** 10 x 20 cells at 28px gives the classic 280 x 560 well. */
const CELL = 28;
const AGENT_STEP_MS = 100;
/** Delayed auto shift: pause before a held direction starts repeating. */
const DAS_MS = 170;
/** Auto repeat rate once DAS has charged. */
const ARR_MS = 40;
const SOFT_DROP_REPEAT_MS = 45;
const COUNTDOWN_STEP_MS = 720;
const HIGH_SCORE_KEY = "tetris-high-score";
const AI_BENCHMARK_KEY = "tetris-ai-benchmark";

type Mode = "agent" | "human";

type SoundKind =
  | "move"
  | "rotate"
  | "lock"
  | "drop"
  | "clear"
  | "tetris"
  | "level"
  | "over"
  | "tick"
  | "go";

type Callout = {
  id: number;
  primary: string;
  secondary?: string;
  tone: "clear" | "tetris";
};

type Palette = {
  board: string;
  grid: string;
  ghost: string;
  flash: string;
  overlay: string;
  overlayText: string;
  pieces: Record<PieceType, string>;
};

type Telemetry = {
  score: number;
  lines: number;
  level: number;
  hold: PieceType | null;
  holdUsed: boolean;
  next: PieceType[];
  plan: AgentPlan | null;
  evaluated: number;
  elapsedMs: number;
};

/** Imperative hooks wired to the DOM buttons, filled in by the game effect. */
type Controls = {
  startHuman: () => void;
  startAgent: () => void;
  restart: () => void;
  togglePause: () => void;
  action: (force?: (engine: TetrisEngine) => void) => void;
};

const EMPTY_TELEMETRY: Telemetry = {
  score: 0,
  lines: 0,
  level: 1,
  hold: null,
  holdUsed: false,
  next: [],
  plan: null,
  evaluated: 0,
  elapsedMs: 0,
};

const FALLBACK_PALETTE: Palette = {
  board: "#111822",
  grid: "rgba(30, 41, 59, 0.9)",
  ghost: "rgba(220, 230, 238, 0.42)",
  flash: "rgba(226, 240, 250, 0.88)",
  overlay: "rgba(15, 23, 42, 0.72)",
  overlayText: "#dce6ee",
  pieces: {
    I: "#b8c7d6",
    J: "#385366",
    L: "#8fa8b8",
    O: "#dce6ee",
    S: "#2e7d6b",
    T: "#6c8ea4",
    Z: "#4a6b82",
  },
};

/** Colours lifted from CSS custom properties, re-read on every theme flip. */
function readPalette(): Palette {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;

  return {
    board: read("--tetris-board", FALLBACK_PALETTE.board),
    grid: read("--tetris-grid", FALLBACK_PALETTE.grid),
    ghost: read("--tetris-ghost", FALLBACK_PALETTE.ghost),
    flash: read("--tetris-flash", FALLBACK_PALETTE.flash),
    overlay: read("--tetris-overlay", FALLBACK_PALETTE.overlay),
    overlayText: read("--tetris-overlay-text", FALLBACK_PALETTE.overlayText),
    pieces: {
      I: read("--piece-i", FALLBACK_PALETTE.pieces.I),
      J: read("--piece-j", FALLBACK_PALETTE.pieces.J),
      L: read("--piece-l", FALLBACK_PALETTE.pieces.L),
      O: read("--piece-o", FALLBACK_PALETTE.pieces.O),
      S: read("--piece-s", FALLBACK_PALETTE.pieces.S),
      T: read("--piece-t", FALLBACK_PALETTE.pieces.T),
      Z: read("--piece-z", FALLBACK_PALETTE.pieces.Z),
    },
  };
}

/* ------------------------------------------------------------------ */
/* Canvas drawing                                                      */
/* ------------------------------------------------------------------ */

/** Beveled Guideline-style block: lit top-left, shaded bottom-right. */
function drawBlock(ctx: CanvasRenderingContext2D, px: number, py: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(px, py, CELL, CELL);
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fillRect(px, py, CELL, 2);
  ctx.fillRect(px, py, 2, CELL);
  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.fillRect(px, py + CELL - 2, CELL, 2);
  ctx.fillRect(px + CELL - 2, py, 2, CELL);
}

/** Crisp hollow ghost outline at the landing row. */
function drawGhost(ctx: CanvasRenderingContext2D, px: number, py: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(px + 1.5, py + 1.5, CELL - 3, CELL - 3);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.1;
  ctx.fillRect(px + 3, py + 3, CELL - 6, CELL - 6);
  ctx.restore();
}

function drawGrid(ctx: CanvasRenderingContext2D, color: string) {
  const width = BOARD_WIDTH * CELL;
  const height = BOARD_HEIGHT * CELL;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 1; x < BOARD_WIDTH; x += 1) {
    ctx.moveTo(x * CELL + 0.5, 0);
    ctx.lineTo(x * CELL + 0.5, height);
  }
  for (let y = 1; y < BOARD_HEIGHT; y += 1) {
    ctx.moveTo(0, y * CELL + 0.5);
    ctx.lineTo(width, y * CELL + 0.5);
  }
  ctx.stroke();
}

function drawSettled(
  ctx: CanvasRenderingContext2D,
  board: Board,
  pieces: Record<PieceType, string>,
) {
  for (let y = 0; y < BOARD_HEIGHT; y += 1) {
    for (let x = 0; x < BOARD_WIDTH; x += 1) {
      const type = board[y][x];
      if (type) drawBlock(ctx, x * CELL, y * CELL, pieces[type]);
    }
  }
}

/* ------------------------------------------------------------------ */
/* Synthesised arcade audio                                            */
/* ------------------------------------------------------------------ */

function playCue(ctx: AudioContext, kind: SoundKind) {
  const now = ctx.currentTime;

  const note = (
    freq: number,
    start: number,
    duration: number,
    type: OscillatorType,
    peak: number,
  ) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now + start);
    gain.gain.setValueAtTime(0.0001, now + start);
    gain.gain.exponentialRampToValueAtTime(peak, now + start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + start);
    osc.stop(now + start + duration + 0.03);
  };

  switch (kind) {
    case "move":
      note(520, 0, 0.04, "square", 0.045);
      break;
    case "rotate":
      note(700, 0, 0.05, "triangle", 0.06);
      break;
    case "lock":
      note(150, 0, 0.07, "sine", 0.08);
      break;
    case "drop":
      note(120, 0, 0.09, "sine", 0.1);
      note(70, 0.012, 0.12, "square", 0.04);
      break;
    case "clear":
      note(660, 0, 0.1, "triangle", 0.07);
      note(990, 0.06, 0.12, "triangle", 0.06);
      break;
    case "tetris":
      [523, 659, 784, 1047].forEach((freq, index) =>
        note(freq, index * 0.065, 0.16, "triangle", 0.075),
      );
      break;
    case "level":
      [784, 988, 1175].forEach((freq, index) =>
        note(freq, index * 0.06, 0.13, "sine", 0.07),
      );
      break;
    case "over":
      [392, 330, 262].forEach((freq, index) =>
        note(freq, index * 0.14, 0.28, "sine", 0.075),
      );
      break;
    case "tick":
      note(460, 0, 0.07, "square", 0.05);
      break;
    case "go":
      note(880, 0, 0.28, "square", 0.055);
      break;
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * AGENTIC TETRIS — a play.tetris.com-style cabinet.
 *
 * Three columns inside a 780px console: HOLD and the key legend on the
 * left, the 10x20 bordered well in the centre, NEXT plus the stacked
 * scoreboard on the right. Guideline rules live in the pure engine (7-bag,
 * SRS kicks both ways, hold, 500ms lock delay, graded scoring with
 * back-to-back and combo bonuses); this component owns the canvas, DAS/ARR
 * input, the countdown takeover, synthesised audio and the telemetry pill.
 *
 * The demo runs itself whenever the cabinet is on screen, and hands over to
 * a fresh human game the moment a game key or pad button is used.
 */
export function AgenticTetris({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<TetrisEngine | null>(null);
  const paletteRef = useRef<Palette>(FALLBACK_PALETTE);
  const modeRef = useRef<Mode>("agent");
  const pausedRef = useRef(false);
  const countdownRef = useRef<number | null>(null);
  const soundOnRef = useRef(false);
  const soundPromptedRef = useRef(false);
  const visibleRef = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);
  const planRef = useRef<AgentPlan | null>(null);
  const planSerialRef = useRef(-1);
  const endedRef = useRef(false);
  const bestRef = useRef(0);
  const aiBenchmarkRef = useRef(0);
  const calloutIdRef = useRef(0);

  const [mode, setMode] = useState<Mode>("agent");
  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [live, setLive] = useState(false);
  const [dropping, setDropping] = useState(false);
  const [telemetry, setTelemetry] = useState<Telemetry>(EMPTY_TELEMETRY);
  const [aiBenchmark, setAiBenchmark] = useState(0);
  const [aiPeak, setAiPeak] = useState(0);
  const [callouts, setCallouts] = useState<Callout[]>([]);
  const [result, setResult] = useState<{ score: number; lines: number } | null>(null);
  const [mathOpen, setMathOpen] = useState(false);

  const controlsRef = useRef<Controls>({
    startHuman: () => {},
    startAgent: () => {},
    restart: () => {},
    togglePause: () => {},
    action: () => {},
  });

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    soundOnRef.current = soundOn;
    if (!soundOn) return;
    const ctx = (audioRef.current ??= new AudioContext());
    if (ctx.state === "suspended") void ctx.resume();
    playCue(ctx, "rotate");
  }, [soundOn]);

  // Personal bests live in localStorage; refs are seeded after mount so the
  // server and first client render agree on zero.
  useEffect(() => {
    const storedBest = Number(window.localStorage.getItem(HIGH_SCORE_KEY));
    if (Number.isFinite(storedBest) && storedBest > 0) bestRef.current = storedBest;
    const storedAi = Number(window.localStorage.getItem(AI_BENCHMARK_KEY));
    if (Number.isFinite(storedAi) && storedAi > 0) aiBenchmarkRef.current = storedAi;

    const timer = window.setTimeout(() => {
      setAiBenchmark(aiBenchmarkRef.current);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  /**
   * Browsers only allow audio after a gesture, so the first interaction with
   * the cabinet arms sound instead of making the visitor hunt for the toggle.
   */
  const enableSoundOnFirstInteraction = useCallback(() => {
    if (soundPromptedRef.current || soundOnRef.current) return;
    soundPromptedRef.current = true;
    try {
      const ctx = (audioRef.current ??= new AudioContext());
      if (ctx.state === "suspended") void ctx.resume();
    } catch {
      /* audio is a nicety; a blocked context must never break the game */
    }
    setSoundOn(true);
  }, []);

  const cue = useCallback((kind: SoundKind) => {
    if (!soundOnRef.current) return;
    try {
      const ctx = (audioRef.current ??= new AudioContext());
      if (ctx.state === "suspended") void ctx.resume();
      playCue(ctx, kind);
    } catch {
      /* audio is a nicety; a blocked context must never break the game */
    }
  }, []);

  const resetPlan = useCallback(() => {
    planRef.current = null;
    planSerialRef.current = -1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = BOARD_WIDTH * CELL * dpr;
    canvas.height = BOARD_HEIGHT * CELL * dpr;
    ctx.scale(dpr, dpr);

    paletteRef.current = readPalette();

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    let engine: TetrisEngine | null = null;
    let agentAcc = 0;
    let uiAcc = 0;
    let overAcc = 0;
    let last = performance.now();
    let raf = 0;
    let evaluated = 0;
    let elapsedMs = 0;
    let seenLevel = 1;
    let aiRunPeak = 0;

    // Held-key state for DAS/ARR and soft-drop repeat.
    const held = { left: false, right: false, down: false, dir: 0, dirTimer: 0, downTimer: 0 };

    const evaluate = () => {
      const active = engine?.active;
      if (!engine || !active) return;
      const started = performance.now();
      const report = planPlacement(engine.board, active.type);
      planRef.current = report.plan;
      planSerialRef.current = active.serial;
      elapsedMs = performance.now() - started;
      evaluated = report.evaluated;
    };

    const announce = (event: ClearEvent) => {
      const id = (calloutIdRef.current += 1);
      const primary =
        event.count === 4
          ? `TETRIS! +${event.points}`
          : `${event.label} +${event.points}`;
      const secondary = event.backToBack
        ? "BACK-TO-BACK"
        : event.combo > 1
          ? `COMBO x${event.combo}`
          : undefined;
      setCallouts((current) => [
        ...current.slice(-2),
        { id, primary, secondary, tone: event.count === 4 ? "tetris" : "clear" },
      ]);
      later(
        () => setCallouts((current) => current.filter((callout) => callout.id !== id)),
        1100,
      );
    };

    const clearCountdown = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.length = 0;
    };

    const startHuman = () => {
      const current = engineRef.current;
      if (!current) return;
      clearCountdown();
      current.reset();
      resetPlan();
      endedRef.current = false;
      seenLevel = 1;
      held.left = false;
      held.right = false;
      held.down = false;
      held.dir = 0;
      setResult(null);
      setCallouts([]);
      setMode("human");
      modeRef.current = "human";
      setPaused(false);
      pausedRef.current = false;

      setCountdown(3);
      countdownRef.current = 3;
      cue("tick");
      [2, 1].forEach((value, index) => {
        later(() => {
          setCountdown(value);
          countdownRef.current = value;
          cue("tick");
        }, COUNTDOWN_STEP_MS * (index + 1));
      });
      later(() => {
        setCountdown(0);
        countdownRef.current = 0;
        cue("go");
      }, COUNTDOWN_STEP_MS * 3);
      later(() => {
        setCountdown(null);
        countdownRef.current = null;
        last = performance.now();
      }, COUNTDOWN_STEP_MS * 3 + 520);
    };

    const startAgent = () => {
      const current = engineRef.current;
      if (!current) return;
      clearCountdown();
      current.reset();
      resetPlan();
      endedRef.current = false;
      seenLevel = 1;
      setResult(null);
      setCallouts([]);
      setCountdown(null);
      countdownRef.current = null;
      setMode("agent");
      modeRef.current = "agent";
      setPaused(false);
      pausedRef.current = false;
      aiRunPeak = 0;
    };

    const togglePause = () => {
      if (modeRef.current !== "human") return;
      setPaused((current) => {
        pausedRef.current = !current;
        return !current;
      });
    };

    /** Any control press either plays, or takes over from the demo. */
    const act = (force?: (engine: TetrisEngine) => void) => {
      const current = engineRef.current;
      if (!current) return;
      if (modeRef.current !== "human" || countdownRef.current !== null) {
        startHuman();
        return;
      }
      if (!force || pausedRef.current) return;
      force(current);
      resetPlan();
    };

    controlsRef.current = { startHuman, startAgent, restart: startHuman, togglePause, action: act };

    const engineGameKeys = new Set([
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp",
      " ",
      "z",
      "Z",
      "x",
      "X",
      "c",
      "C",
      "Control",
      "Shift",
      "a",
      "A",
      "d",
      "D",
      "s",
      "S",
      "w",
      "W",
    ]);

    const hardDrop = () => {
      const current = engineRef.current;
      if (!current) return;
      current.hardDrop();
      resetPlan();
      cue("drop");
      setDropping(true);
      later(() => setDropping(false), 170);
    };

    const stepAgent = (dt: number) => {
      const active = engine?.active;
      if (!engine || !active) return;
      if (planSerialRef.current !== active.serial || !planRef.current) evaluate();

      agentAcc += dt;
      if (agentAcc < AGENT_STEP_MS) return;
      agentAcc = 0;

      const plan = planRef.current;
      if (!plan) {
        engine.hardDrop();
        return;
      }
      if (active.rotation !== plan.rotation) {
        if (!engine.rotate(1)) engine.hardDrop();
        return;
      }
      if (active.x !== plan.column) {
        if (!engine.move(plan.column > active.x ? 1 : -1)) engine.hardDrop();
        return;
      }
      engine.hardDrop();
      cue("drop");
      setDropping(true);
      later(() => setDropping(false), 170);
      resetPlan();
    };

    const stepHuman = (dt: number) => {
      if (!engine) return;

      if (held.dir !== 0) {
        held.dirTimer -= dt;
        let guard = 0;
        while (held.dirTimer <= 0 && guard < 6) {
          engine.move(held.dir);
          held.dirTimer += ARR_MS;
          guard += 1;
        }
      }

      if (held.down) {
        held.downTimer -= dt;
        let guard = 0;
        while (held.downTimer <= 0 && guard < 6) {
          if (!engine.softDrop()) break;
          held.downTimer += SOFT_DROP_REPEAT_MS;
          guard += 1;
        }
      }

      engine.tick(dt);
    };

    const render = () => {
      const palette = paletteRef.current;
      const width = BOARD_WIDTH * CELL;
      const height = BOARD_HEIGHT * CELL;
      ctx.fillStyle = palette.board;
      ctx.fillRect(0, 0, width, height);

      if (engine) {
        const flash = engine.flash;
        const elapsed = flash ? performance.now() - flash.startedAt : 0;

        if (flash && elapsed < 150) {
          // Flash the pre-collapse stack, then let the rows drop away.
          drawSettled(ctx, flash.board, palette.pieces);
          ctx.save();
          ctx.globalAlpha = Math.max(0, 1 - elapsed / 150);
          ctx.fillStyle = palette.flash;
          for (const row of flash.rows) ctx.fillRect(0, row * CELL, width, CELL);
          ctx.restore();
        } else {
          if (flash) engine.flash = null;
          drawSettled(ctx, engine.board, palette.pieces);
        }

        const active = engine.active;
        if (active && !engine.over) {
          const target =
            modeRef.current === "agent" && planRef.current
              ? planRef.current.cells
              : modeRef.current === "human"
                ? engine.ghostCells()
                : [];
          for (const { x, y } of target) {
            if (y >= 0) drawGhost(ctx, x * CELL, y * CELL, palette.ghost);
          }

          for (const { x, y } of absoluteCells(active)) {
            if (y >= 0) drawBlock(ctx, x * CELL, y * CELL, palette.pieces[active.type]);
          }
        }
      }

      drawGrid(ctx, palette.grid);

      // The demo tops out and restarts silently; humans get the DOM overlay.
      if (engine?.over && modeRef.current === "agent") {
        ctx.fillStyle = palette.overlay;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = palette.overlayText;
        ctx.font = "600 12px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillText("BENCHMARK LOGGED", width / 2, height / 2 - 4);
        ctx.fillStyle = palette.ghost;
        ctx.font = "500 10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText("restarting agent…", width / 2, height / 2 + 16);
      }
    };

    const recordAiBenchmark = (peak: number) => {
      if (peak <= aiBenchmarkRef.current) return;
      aiBenchmarkRef.current = peak;
      setAiBenchmark(peak);
      try {
        window.localStorage.setItem(AI_BENCHMARK_KEY, String(peak));
      } catch {
        /* storage can be blocked; the in-memory figure still works */
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(now - last, 100);
      last = now;
      if (!visibleRef.current || !engine) return;

      const frozen = pausedRef.current || countdownRef.current !== null;

      if (engine.over) {
        if (modeRef.current === "human") {
          if (!endedRef.current) {
            endedRef.current = true;
            setResult({ score: engine.score, lines: engine.lines });
            cue("over");
          }
        } else {
          overAcc += dt;
          if (overAcc > 1600) {
            overAcc = 0;
            engine.reset();
            resetPlan();
            aiRunPeak = 0;
            seenLevel = 1;
          }
        }
      } else if (!frozen) {
        endedRef.current = false;
        if (modeRef.current === "agent") stepAgent(dt);
        else stepHuman(dt);
      }

      const events = engine.drainEvents();
      if (events.length > 0) {
        const latest = events[events.length - 1];
        announce(latest);
        cue(latest.count === 4 ? "tetris" : "clear");
      }

      if (engine.level !== seenLevel) {
        seenLevel = engine.level;
        cue("level");
      }

      render();

      uiAcc += dt;
      if (uiAcc >= 100) {
        uiAcc = 0;
        setTelemetry({
          score: engine.score,
          lines: engine.lines,
          level: engine.level,
          hold: engine.hold,
          holdUsed: engine.holdUsed,
          next: engine.nextPieces,
          plan: planRef.current,
          evaluated,
          elapsedMs,
        });

        if (modeRef.current === "agent") {
          if (engine.score > aiRunPeak) {
            aiRunPeak = engine.score;
            setAiPeak(aiRunPeak);
          }
          if (engine.over) recordAiBenchmark(aiRunPeak);
        } else if (engine.score > bestRef.current) {
          bestRef.current = engine.score;
          try {
            window.localStorage.setItem(HIGH_SCORE_KEY, String(engine.score));
          } catch {
            /* storage can be blocked; the in-memory best still works */
          }
        }
      }
    };

    render();
    raf = requestAnimationFrame(frame);

    const startObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          held.dir = 0;
          held.left = false;
          held.right = false;
          held.down = false;
          return;
        }
        last = performance.now();
        if (!engine) {
          engine = new TetrisEngine();
          engineRef.current = engine;
          render();
          setLive(true);
        }
      },
      { threshold: 0.35 },
    );
    if (wrapRef.current) startObserver.observe(wrapRef.current);

    const themeObserver = new MutationObserver(() => {
      paletteRef.current = readPalette();
      render();
    });
    themeObserver.observe(document.documentElement, { attributeFilter: ["data-theme"] });

    const isTyping = (target: EventTarget | null) => {
      const element = target as HTMLElement | null;
      if (!element) return false;
      const tag = element.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        element.isContentEditable
      );
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!visibleRef.current || !engineRef.current || isTyping(event.target)) return;
      if (event.metaKey || event.altKey) return;

      const key = event.key;
      if (key === "p" || key === "P") {
        if (modeRef.current === "human") {
          event.preventDefault();
          togglePause();
        }
        return;
      }

      if (!engineGameKeys.has(key)) return;

      if (modeRef.current !== "human" || countdownRef.current !== null) {
        event.preventDefault();
        startHuman();
        return;
      }
      if (pausedRef.current) return;

      const current = engineRef.current;
      // Space and the arrows scroll the page; they belong to the board here.
      if (key === " " || key.startsWith("Arrow")) event.preventDefault();

      switch (key) {
        case "ArrowLeft":
        case "a":
        case "A":
          event.preventDefault();
          held.left = true;
          held.right = false;
          held.dir = -1;
          held.dirTimer = DAS_MS;
          if (current.move(-1)) cue("move");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          event.preventDefault();
          held.right = true;
          held.left = false;
          held.dir = 1;
          held.dirTimer = DAS_MS;
          if (current.move(1)) cue("move");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          event.preventDefault();
          held.down = true;
          held.downTimer = SOFT_DROP_REPEAT_MS;
          current.softDrop();
          break;
        case "ArrowUp":
        case "x":
        case "X":
        case "w":
        case "W":
          event.preventDefault();
          if (current.rotate(1)) cue("rotate");
          break;
        case "z":
        case "Z":
        case "Control":
          event.preventDefault();
          if (current.rotate(-1)) cue("rotate");
          break;
        case " ":
          event.preventDefault();
          if (!event.repeat) hardDrop();
          break;
        case "c":
        case "C":
        case "Shift":
          event.preventDefault();
          if (!event.repeat && current.holdPiece()) cue("rotate");
          break;
        default:
          break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          held.left = false;
          held.dir = held.right ? 1 : 0;
          if (held.dir === 1) held.dirTimer = DAS_MS;
          break;
        case "ArrowRight":
        case "d":
        case "D":
          held.right = false;
          held.dir = held.left ? -1 : 0;
          if (held.dir === -1) held.dirTimer = DAS_MS;
          break;
        case "ArrowDown":
        case "s":
        case "S":
          held.down = false;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(raf);
      startObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      timers.forEach((timer) => window.clearTimeout(timer));
      engineRef.current = null;
    };
  }, [cue, resetPlan]);

  const handlePanelPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    // The sound toggle owns its own click; don't fight it with auto-enable.
    if (target?.closest('button[aria-label="Muted"], button[aria-label="Sound On"]')) return;
    enableSoundOnFirstInteraction();
  };

  const handlePointerTakeover = () => {
    if (mode !== "human") controlsRef.current.startHuman();
  };

  const benchmark = Math.max(aiBenchmark, aiPeak);
  const plan = telemetry.plan;
  const breakdown = plan?.breakdown;

  return (
    <div
      ref={wrapRef}
      onPointerDown={handlePanelPointerDown}
      aria-label="Tetris cabinet. Press any game key or the pad to take over from the AI demo."
      className={`relative mx-auto w-full max-w-[780px] rounded-3xl border border-slate-blue/20 bg-surface p-3 shadow-tactile sm:p-4 ${className}`}
    >
      {/* ------------------------------------------------------------ */}
      {/* Header bar                                                    */}
      {/* ------------------------------------------------------------ */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-blue/15 pb-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="rounded-md bg-steel-blue px-2 py-1 font-mono text-[12px] leading-none font-bold tracking-[0.28em] text-on-accent">
            TETRIS
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-blue/25 bg-tint px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.1em] text-secondary uppercase">
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${
                mode === "agent" ? "bg-online soft-pulse" : "bg-steel-blue"
              }`}
            />
            {mode === "agent" ? "AI Demo" : "Your Turn"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <CabinetButton
            glyph={paused ? "▶" : "❚❚"}
            label={paused ? "Resume" : "Pause"}
            keycap="P"
            active={paused}
            disabled={mode !== "human"}
            onClick={() => controlsRef.current.togglePause()}
          />
          <CabinetButton
            glyph="↻"
            label="Restart"
            onClick={() => controlsRef.current.restart()}
          />
          <CabinetButton
            glyph="♪"
            label={soundOn ? "Sound On" : "Muted"}
            active={soundOn}
            onClick={() => setSoundOn((current) => !current)}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Three-column cabinet                                          */}
      {/* ------------------------------------------------------------ */}
      <div className="mt-3 flex flex-col gap-3 lg:grid lg:grid-cols-[130px_280px_150px] lg:items-start lg:justify-center lg:gap-4">
        {/* LEFT — HOLD + legend */}
        <aside className="order-2 flex items-start gap-3 lg:order-1 lg:w-[130px] lg:flex-col">
          <div className="w-[96px] shrink-0 lg:w-full">
            <Chamber label="HOLD">
              <div className="flex h-14 items-center justify-center">
                {telemetry.hold ? (
                  <PiecePreview type={telemetry.hold} cell={11} dim={telemetry.holdUsed} />
                ) : (
                  <span className="font-mono text-[10px] tracking-[0.14em] text-slate-blue/60 uppercase">
                    empty
                  </span>
                )}
              </div>
            </Chamber>
          </div>

          <div className="hidden min-w-0 flex-1 flex-col gap-1 lg:flex">
            <LegendKey keys="← →" action="Move" />
            <LegendKey keys="↑ / X" action="Rotate CW" />
            <LegendKey keys="Z" action="Rotate CCW" />
            <LegendKey keys="↓" action="Soft drop" />
            <LegendKey keys="SPACE" action="Hard drop" />
            <LegendKey keys="C / SHIFT" action="Hold" />
          </div>
        </aside>

        {/* CENTER — the well */}
        <div className="order-1 flex min-w-0 flex-col items-center lg:order-2">
          <div className={`relative w-full max-w-[286px] ${dropping ? "board-drop" : ""}`}>
            <div
              className="rounded-2xl p-[3px]"
              style={{ border: "3px solid var(--border-strong)", background: "var(--tetris-frame)" }}
            >
              <canvas
                ref={canvasRef}
                role="img"
                aria-label={`Tetris well, 10 by 20. Mode ${
                  mode === "agent" ? "AI demo" : "human control"
                }. Score ${telemetry.score}, level ${telemetry.level}, ${telemetry.lines} lines.`}
                onPointerDown={handlePointerTakeover}
                className="block h-auto w-full touch-none rounded-lg"
                style={{ aspectRatio: `${BOARD_WIDTH} / ${BOARD_HEIGHT}` }}
              />
            </div>

            {/* Floating action callouts */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
            >
              {callouts.map((callout) => (
                <span
                  key={callout.id}
                  className="score-float absolute top-[26%] left-1/2 flex flex-col items-center gap-0.5 text-center font-mono"
                >
                  <span
                    className={`text-[14px] font-bold tracking-[0.06em] ${
                      callout.tone === "tetris" ? "text-online" : "text-steel-blue"
                    } drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]`}
                  >
                    {callout.primary}
                  </span>
                  {callout.secondary ? (
                    <span className="text-[9.5px] font-semibold tracking-[0.16em] text-secondary uppercase">
                      {callout.secondary}
                    </span>
                  ) : null}
                </span>
              ))}
            </div>

            {/* Countdown */}
            {countdown !== null ? (
              <div className="pointer-events-none absolute inset-0 grid place-items-center rounded-2xl bg-[var(--tetris-overlay)] backdrop-blur-[1px]">
                <p
                  key={countdown}
                  className="font-serif text-[65px] leading-none text-primary"
                  aria-live="assertive"
                >
                  {countdown === 0 ? "GO!" : countdown}
                </p>
              </div>
            ) : null}

            {/* Paused */}
            {paused && mode === "human" && !result && countdown === null ? (
              <div className="absolute inset-0 grid place-items-center rounded-2xl bg-[var(--tetris-overlay)] backdrop-blur-[1px]">
                <div className="text-center">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-slate-blue uppercase">
                    paused
                  </p>
                  <p className="mt-1 text-[12px] text-secondary">press P or ▶ to resume</p>
                </div>
              </div>
            ) : null}

            {/* Demo idle banner */}
            {mode === "agent" && !result && live ? (
              <button
                type="button"
                onClick={() => controlsRef.current.startHuman()}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-steel-blue/50 bg-surface/95 px-3.5 py-2 font-mono text-[10.5px] font-semibold tracking-[0.12em] whitespace-nowrap text-primary uppercase shadow-tactile backdrop-blur transition-colors duration-200 hover:border-steel-blue hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue"
              >
                Press <kbd className="mx-1 rounded border border-slate-blue/30 bg-tint px-1 py-0.5 text-[10px]">space</kbd> or click to play
              </button>
            ) : null}

            {/* Game over */}
            {result ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-2xl bg-[var(--tetris-overlay)] px-3 text-center backdrop-blur-[2px]">
                <p className="font-mono text-[10px] tracking-[0.2em] text-slate-blue uppercase">
                  {result.lines} lines · level {telemetry.level}
                </p>
                <p className="font-serif text-[35px] leading-none text-primary tabular-nums">
                  {result.score}
                </p>
                <p className="font-mono text-[9.5px] tracking-[0.16em] text-secondary uppercase">
                  ai best {benchmark}
                </p>
                <p className="text-[11px] leading-snug text-secondary">
                  {result.score >= benchmark && benchmark > 0
                    ? "You out-stacked the agent."
                    : "The heuristic agent wins this round."}
                </p>
                <div className="mt-1 flex w-full flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => controlsRef.current.startHuman()}
                    className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-steel-blue bg-steel-blue px-3 text-[12px] font-semibold text-on-accent shadow-tactile transition-transform duration-150 hover:bg-steel-blue/90 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue"
                  >
                    <span aria-hidden="true">↻</span> Play Again
                  </button>
                  <button
                    type="button"
                    onClick={() => controlsRef.current.startAgent()}
                    className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-blue/30 bg-surface px-3 text-[12px] font-semibold text-secondary shadow-tactile transition-transform duration-150 hover:border-steel-blue/50 hover:text-steel-blue active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue"
                  >
                    Let AI Demo
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* RIGHT — NEXT + scoreboard */}
        <aside className="order-3 flex w-full flex-col gap-2 lg:w-[150px]">
          <Chamber label="NEXT">
            <div className="flex items-center justify-around gap-1 lg:h-[186px] lg:flex-col lg:justify-center lg:gap-2">
              {[0, 1, 2].map((slot) => {
                const type = telemetry.next[slot];
                return (
                  <div
                    key={slot}
                    className="flex h-12 w-full items-center justify-center lg:h-[52px] lg:border-b lg:border-slate-blue/10 lg:last:border-0"
                  >
                    {type ? (
                      <PiecePreview type={type} cell={slot === 0 ? 12 : 10} dim={slot > 0} />
                    ) : (
                      <span className="font-mono text-[10px] text-slate-blue/40">·</span>
                    )}
                  </div>
                );
              })}
            </div>
          </Chamber>

          <div className="grid grid-cols-3 gap-1.5 lg:grid-cols-1 lg:gap-2">
            <Metric label="SCORE" value={telemetry.score} big />
            <Metric label="LEVEL" value={telemetry.level} />
            <Metric label="LINES" value={telemetry.lines} />
          </div>
        </aside>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Touch / click arcade pad                                      */}
      {/* ------------------------------------------------------------ */}
      <div className="mt-3 grid grid-cols-6 gap-1.5 sm:gap-2">
        <PadKey glyph="⇄" label="Hold" keycap="C" onClick={() => controlsRef.current.action((e) => e.holdPiece())} />
        <PadKey glyph="←" label="Left" keycap="←" onClick={() => controlsRef.current.action((e) => e.move(-1))} />
        <PadKey glyph="↻" label="Rotate" keycap="↑" onClick={() => controlsRef.current.action((e) => e.rotate(1))} />
        <PadKey glyph="→" label="Right" keycap="→" onClick={() => controlsRef.current.action((e) => e.move(1))} />
        <PadKey glyph="↓" label="Down" keycap="↓" onClick={() => controlsRef.current.action((e) => e.softDrop())} />
        <PadKey glyph="⤓" label="Drop" keycap="␣" accent onClick={() => controlsRef.current.action((e) => e.hardDrop())} />
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Heuristic telemetry pill                                      */}
      {/* ------------------------------------------------------------ */}
      <div className="mt-3 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setMathOpen((open) => !open)}
          aria-expanded={mathOpen}
          aria-controls="ai-telemetry"
          className="inline-flex items-center gap-2 rounded-full border border-slate-blue/25 bg-tint px-3 py-1.5 font-mono text-[10.5px] font-semibold tracking-[0.12em] text-secondary uppercase transition-colors duration-150 hover:border-steel-blue/50 hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue"
        >
          <span
            aria-hidden="true"
            className={`size-1.5 rounded-full ${mode === "agent" ? "bg-online soft-pulse" : "bg-steel-blue"}`}
          />
          AI Telemetry
          <span aria-hidden="true" className={`text-[9px] transition-transform ${mathOpen ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>

        {mathOpen ? (
          <div
            id="ai-telemetry"
            className="mt-2 w-full rounded-2xl border border-slate-blue/20 bg-tint p-3 font-mono"
          >
            <dl className="grid grid-cols-3 gap-2 text-center">
              <div>
                <dt className="text-[9px] tracking-[0.12em] text-slate-blue uppercase">eval</dt>
                <dd className="mt-0.5 text-[14px] text-primary tabular-nums">
                  {breakdown ? breakdown.total.toFixed(2) : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-[9px] tracking-[0.12em] text-slate-blue uppercase">states</dt>
                <dd className="mt-0.5 text-[14px] text-primary tabular-nums">
                  {mode === "agent" && live ? telemetry.evaluated : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-[9px] tracking-[0.12em] text-slate-blue uppercase">ms</dt>
                <dd className="mt-0.5 text-[14px] text-primary tabular-nums">
                  {mode === "agent" && live ? telemetry.elapsedMs.toFixed(1) : "—"}
                </dd>
              </div>
            </dl>

            <dl className="mt-3 flex flex-col gap-2 border-t border-slate-blue/15 pt-2.5">
              <WeightRow label="lines" value={breakdown?.lines} weight={0.76} />
              <WeightRow label="height" value={breakdown?.aggregateHeight} weight={-0.51} />
              <WeightRow label="holes" value={breakdown?.holes} weight={-0.36} />
              <WeightRow label="bumpiness" value={breakdown?.bumpiness} weight={-0.18} />
            </dl>

            <p className="mt-2.5 text-[10px] leading-relaxed text-secondary">
              total = 0.76·lines − 0.51·height − 0.36·holes − 0.18·bumpiness
            </p>
          </div>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        {mode === "human" ? `Your turn. Score ${telemetry.score}.` : `AI demo running. Score ${telemetry.score}.`}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Presentation pieces                                                 */
/* ------------------------------------------------------------------ */

function Chamber({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-w-0 flex-col rounded-xl border border-slate-blue/25 bg-tint p-1.5">
      <p className="mb-1 px-1 font-mono text-[9.5px] font-semibold tracking-[0.2em] text-slate-blue uppercase">
        {label}
      </p>
      <div className="rounded-lg bg-surface/70 p-1 shadow-[inset_0_1px_3px_rgba(21,34,54,0.12)]">
        {children}
      </div>
    </div>
  );
}

function Metric({ label, value, big = false }: { label: string; value: number; big?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col justify-center rounded-xl border border-slate-blue/25 bg-tint px-2 py-1.5 lg:px-2.5 lg:py-2">
      <p className="font-mono text-[9px] tracking-[0.18em] text-slate-blue uppercase">{label}</p>
      <p
        className={`mt-0.5 font-mono leading-none font-bold text-primary tabular-nums ${
          big ? "text-[20px] lg:text-[23px]" : "text-[16px] lg:text-[18px]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function CabinetButton({
  glyph,
  label,
  keycap,
  onClick,
  active = false,
  disabled = false,
}: {
  glyph: string;
  label: string;
  keycap?: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      aria-label={keycap ? `${label} (${keycap})` : label}
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-lg border px-2 py-1 font-mono text-[10.5px] font-semibold tracking-[0.08em] uppercase transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue disabled:cursor-not-allowed disabled:opacity-45 ${
        active
          ? "border-steel-blue bg-steel-blue text-on-accent"
          : "border-slate-blue/25 bg-tint text-secondary hover:border-steel-blue/50 hover:text-steel-blue"
      }`}
    >
      <span aria-hidden="true" className="text-[11px] leading-none">
        {glyph}
      </span>
      {label}
      {keycap ? (
        <span
          aria-hidden="true"
          className={`rounded border px-1 py-px text-[8.5px] ${
            active ? "border-on-accent/35 text-on-accent/80" : "border-slate-blue/25 text-slate-blue"
          }`}
        >
          {keycap}
        </span>
      ) : null}
    </button>
  );
}

function LegendKey({ keys, action }: { keys: string; action: string }) {
  return (
    <div className="flex items-center justify-between gap-1.5">
      <span className="rounded border border-slate-blue/25 bg-surface px-1 py-0.5 font-mono text-[9px] tracking-[0.04em] text-secondary">
        {keys}
      </span>
      <span className="truncate text-[10px] text-secondary/80">{action}</span>
    </div>
  );
}

function PadKey({
  glyph,
  label,
  keycap,
  onClick,
  accent = false,
}: {
  glyph: string;
  label: string;
  keycap: string;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label} (${keycap})`}
      className={`relative flex min-h-[3.5rem] flex-col items-center justify-center gap-1 rounded-xl border px-1 py-2 transition-[background-color,border-color,color,transform,box-shadow] duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue sm:min-h-[3.75rem] ${
        accent
          ? "border-steel-blue bg-steel-blue text-on-accent shadow-[var(--shadow-key)] hover:bg-steel-blue/90"
          : "border-slate-blue/25 bg-surface text-primary shadow-[var(--shadow-key)] hover:border-steel-blue/55 hover:text-steel-blue"
      }`}
    >
      <span aria-hidden="true" className="text-[17px] leading-none sm:text-[18px]">
        {glyph}
      </span>
      <span className="font-mono text-[10px] font-semibold tracking-[0.08em] uppercase">
        {label}
      </span>
      <span
        aria-hidden="true"
        className={`absolute top-1 right-1 rounded border px-1 font-mono text-[8px] ${
          accent ? "border-on-accent/35 text-on-accent/80" : "border-slate-blue/25 text-slate-blue"
        }`}
      >
        {keycap}
      </span>
    </button>
  );
}

function WeightRow({
  label,
  value,
  weight,
}: {
  label: string;
  value: number | undefined;
  weight: number;
}) {
  const magnitude = Math.min(100, (Math.abs(weight) / 0.76) * 100);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-2">
        <dt className="truncate text-[11px] text-secondary">{label}</dt>
        <dd className="flex shrink-0 items-baseline gap-2">
          <span className="text-[12px] text-primary tabular-nums">{value ?? "—"}</span>
          <span className="w-8 text-right text-[10px] text-slate-blue tabular-nums">
            {weight > 0 ? "+" : "−"}
            {Math.abs(weight).toFixed(2)}
          </span>
        </dd>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-slate-blue/15">
        <div
          className={`h-full rounded-full ${weight > 0 ? "bg-online" : "bg-steel-blue"}`}
          style={{ width: `${magnitude}%` }}
        />
      </div>
    </div>
  );
}

function PiecePreview({
  type,
  cell = 11,
  dim = false,
}: {
  type: PieceType;
  cell?: number;
  dim?: boolean;
}) {
  const offsets = ROTATIONS[type][0];
  const minX = Math.min(...offsets.map((offset) => offset.x));
  const minY = Math.min(...offsets.map((offset) => offset.y));
  const width = Math.max(...offsets.map((offset) => offset.x)) - minX + 1;
  const height = Math.max(...offsets.map((offset) => offset.y)) - minY + 1;
  const filled = new Set(offsets.map((offset) => `${offset.x - minX}:${offset.y - minY}`));

  return (
    <span
      aria-hidden="true"
      className="grid gap-[2px] transition-opacity duration-200"
      style={{
        gridTemplateColumns: `repeat(${width}, ${cell}px)`,
        opacity: dim ? 0.45 : 1,
      }}
    >
      {Array.from({ length: height }).map((_, y) =>
        Array.from({ length: width }).map((__, x) => (
          <span
            key={`${x}-${y}`}
            className="rounded-[2px]"
            style={{
              width: cell,
              height: cell,
              backgroundColor: filled.has(`${x}:${y}`)
                ? `var(--piece-${type.toLowerCase()})`
                : "transparent",
              boxShadow: filled.has(`${x}:${y}`)
                ? "inset 1px 1px 0 rgba(255,255,255,0.35), inset -1px -1px 0 rgba(0,0,0,0.25)"
                : undefined,
            }}
          />
        )),
      )}
    </span>
  );
}
