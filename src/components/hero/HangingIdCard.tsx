"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * HANGING PHYSICS ID CARD
 * ------------------------------------------------------------------
 * The custom PVC badge artwork (public/manvitha.png) suspended from a
 * ceiling bracket at the top edge of the hero's right column by a
 * woven Steel Blue / Slate Blue lanyard and a brushed-silver swivel
 * lobster clasp.
 *
 * The strap is anchored at (top: 0) and its angle (rotate) plus length
 * (scaleY) are derived from the badge's live x / y / drop motion values
 * with useTransform, so it pivots and stretches with the card and can
 * never detach.
 *
 * Physics:
 *  - Damped spring arrival drop from y: -520 (145 / 14 / 1.25).
 *  - Ambient pendulum sway, ±1.8°, running while idle.
 *  - Click / tap impulse: lateral kick + depth dip + rotational torque.
 *  - Free drag with elastic constraints; springs back to rest.
 *  - Cursor-driven 3D tilt and laminate gloss sheen.
 *  - Reduced motion: no drop, sway, tilt or drag; rendered at rest.
 */

const IMG_W = 639;
const IMG_H = 1011;

const CARD_W = 300;
const CARD_H = Math.round((CARD_W * IMG_H) / IMG_W); // 475
const CARD_TOP = 156;

const STRAP_TOP_W = 27;
const STRAP_BOTTOM_W = 17;

// Brushed-silver clasp geometry (56 × 76 svg).
const CLASP_W = 56;
const CLASP_EYE_Y = 9; // swivel eye centre, where the strap threads through
const CLASP_HOOK = 60; // eye → bottom of the D-ring hooked on the card
const REST_STRAP = CARD_TOP - CLASP_HOOK;

const BRACKET_W = 116;
const BRACKET_H = 10;

const SWAY_DEG = 1.8;

export function HangingIdCard({ photoSrc = "/manvitha.png" }: { photoSrc?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const [anchorX, setAnchorX] = useState<number | null>(null);

  const reduceMotion = useReducedMotion();

  // Badge translation + independent entrance drop.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const drop = useMotionValue(-520);

  // Ambient pendulum, 3D tilt and click torque.
  const sway = useMotionValue(-SWAY_DEG);
  const tiltX = useSpring(0, { stiffness: 170, damping: 20, mass: 0.8 });
  const tiltY = useSpring(0, { stiffness: 170, damping: 20, mass: 0.8 });
  const torque = useSpring(0, { stiffness: 110, damping: 10, mass: 1 });

  // Lean into horizontal displacement so drags read as a pendulum swing.
  const dragSwingZ = useTransform(x, [-110, 0, 110], [-6, 0, 6]);
  const rotateZ = useTransform(
    [sway, dragSwingZ, torque],
    ([s, ds, t]: number[]) => s + ds + t,
  );

  // Laminate gloss follows the pointer across the card face.
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(24);
  const glare = useMotionTemplate`radial-gradient(260px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.55), transparent 64%)`;

  const dropOpacity = useTransform(drop, [-520, -430, -140, 0], [0, 0.55, 0.95, 1]);
  const strapOpacity = useTransform(drop, [-520, -460, -140, 0], [0, 0.25, 0.9, 1]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const measure = () => setAnchorX(element.clientWidth / 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Arrival drop — damped spring, bounces at the end of the strap.
  useEffect(() => {
    if (reduceMotion) {
      drop.set(0);
      return;
    }
    const controls = animate(drop, 0, {
      type: "spring",
      stiffness: 145,
      damping: 14,
      mass: 1.25,
    });
    return () => controls.stop();
  }, [drop, reduceMotion]);

  // Ambient sway — gentle continuous pendulum between -1.8° and 1.8°.
  useEffect(() => {
    if (reduceMotion) {
      sway.set(0);
      return;
    }
    sway.set(-SWAY_DEG);
    const controls = animate(sway, SWAY_DEG, {
      duration: 5.4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    });
    return () => controls.stop();
  }, [sway, reduceMotion]);

  // The hanger is one rigid assembly measured from the bracket (0) down to the
  // badge's live top-centre anchor. The card rotates about that same anchor, so
  // the pivot never moves: strap angle/length and clasp placement always land
  // on the badge, whatever it is doing (drag, tap, bounce, entrance drop).
  const strapGeometry = useTransform(
    [x, y, drop],
    ([dx, dy, d]: number[]) => {
      const anchorY = CARD_TOP + dy + d; // card top centre, container coords
      const ey = Math.max(anchorY, 1);
      const dist = Math.hypot(dx, ey);
      const strapLen = Math.max(dist - CLASP_HOOK, 0);
      return {
        angle: (Math.atan2(dx, ey) * 180) / Math.PI,
        strapLen,
      };
    },
  );

  // CSS rotates clockwise, so a downward strap needs -angle to lean toward a
  // card displaced to the right.
  const strapRotate = useTransform(strapGeometry, (g) => -g.angle);
  const strapScaleY = useTransform(strapGeometry, (g) =>
    Math.max(0.02, g.strapLen / REST_STRAP),
  );

  // Clasp sits at the strap's lower tip, aligned with the strap axis, so its
  // D-ring bottom meets the card's top-centre slot exactly.
  const claspLeft = useTransform(strapGeometry, (g) => {
    const rad = (g.angle * Math.PI) / 180;
    return (anchorX ?? 0) + g.strapLen * Math.sin(rad) - CLASP_W / 2;
  });
  const claspTop = useTransform(strapGeometry, (g) => {
    const rad = (g.angle * Math.PI) / 180;
    return g.strapLen * Math.cos(rad) - CLASP_EYE_Y;
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = faceRef.current?.getBoundingClientRect();
    if (!rect) return;

    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    glareX.set(px * 100);
    glareY.set(py * 100);

    if (reduceMotion) return;
    tiltY.set((px - 0.5) * 9);
    tiltX.set(-(py - 0.5) * 7);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
    glareX.set(50);
    glareY.set(24);
  };

  const settle = () => {
    resetTilt();
    animate(x, 0, { type: "spring", stiffness: 120, damping: 11, mass: 1 });
    animate(y, 0, { type: "spring", stiffness: 120, damping: 11, mass: 1 });
    animate(torque, 0, { type: "spring", stiffness: 120, damping: 12, mass: 1 });
  };

  // Click impulse: push the badge away from the clicked side, dip it, and
  // kick a little rotational torque so it swings out and settles back.
  const handleTap = (event: MouseEvent | TouchEvent | PointerEvent) => {
    if (reduceMotion) return;
    const clientX =
      "changedTouches" in event
        ? (event.changedTouches[0]?.clientX ?? 0)
        : event.clientX;
    const rect = faceRef.current?.getBoundingClientRect();
    const px = rect ? (clientX - rect.left) / rect.width - 0.5 : 0;
    const direction = px <= 0 ? 1 : -1;

    animate(x, [x.get(), direction * 62, direction * -18, 0], {
      duration: 1.6,
      ease: "easeInOut",
    });
    animate(y, [y.get(), 38, 0], {
      duration: 1.5,
      ease: "easeInOut",
    });
    animate(torque, [torque.get(), direction * -10, direction * 3.5, 0], {
      duration: 1.7,
      ease: "easeInOut",
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (reduceMotion) return;

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      animate(x, [x.get(), direction * 68, 0], {
        duration: 1.05,
        ease: "easeInOut",
      });
      animate(torque, [0, direction * -7, 0], {
        duration: 1.15,
        ease: "easeInOut",
      });
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const direction = event.key === "ArrowUp" ? -1 : 1;
      animate(y, [y.get(), direction * 72, 0], {
        duration: 1.15,
        ease: "easeInOut",
      });
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      animate(y, [y.get(), 84, 0], { duration: 1.25, ease: "easeInOut" });
      animate(torque, [0, 6, -3, 0], { duration: 1.35, ease: "easeInOut" });
    } else if (event.key === "Escape") {
      settle();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-[700px] w-full justify-center"
      aria-label="Hanging credential badge"
    >
      <span id="badge-instructions" className="sr-only">
        Use the arrow keys to swing the badge, Enter or Space to bounce it, and
        Escape to let it settle. You can also click the badge to nudge it, or
        drag it with a pointer.
      </span>

      {/* Ceiling mount bracket — flush to the top edge (top: 0). */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 z-10 -translate-x-1/2"
        style={{ width: BRACKET_W }}
      >
        <div
          className="relative flex items-center justify-center gap-7 rounded-b-[5px] bg-[#566787] shadow-[0_3px_8px_-2px_rgba(21,34,54,0.4)]"
          style={{ height: BRACKET_H }}
        >
          <span className="size-[3px] rounded-full bg-[#F4F8FB]/70" />
          <span className="size-[3px] rounded-full bg-[#F4F8FB]/70" />
        </div>
        <div className="mx-auto h-[3px] w-[38px] rounded-b-full bg-[#1D2D44]/25" />
      </div>

      {/* Woven lanyard + clasp — anchored at top: 0. Angle, length and
          clasp position derive from the badge's live x / y / drop so the
          hanger stays attached to the card at all times. */}
      {anchorX !== null ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 z-[5] origin-top drop-shadow-[0_5px_5px_rgba(21,34,54,0.28)]"
          style={{
            left: anchorX,
            width: STRAP_TOP_W,
            height: REST_STRAP,
            marginLeft: -STRAP_TOP_W / 2,
            rotate: strapRotate,
            scaleY: strapScaleY,
            opacity: strapOpacity,
            transformOrigin: "50% 0%",
            clipPath: `polygon(0 0, 100% 0, calc(50% + ${STRAP_BOTTOM_W / 2}px) 100%, calc(50% - ${STRAP_BOTTOM_W / 2}px) 100%)`,
            backgroundColor: "#5478B2",
            backgroundImage: [
              // diagonal weave, cross weave
              "repeating-linear-gradient(45deg, rgba(244,248,251,0.18) 0 1px, transparent 1px 5px)",
              "repeating-linear-gradient(-45deg, rgba(21,34,54,0.18) 0 1px, transparent 1px 5px)",
              // stitched centre seam
              "repeating-linear-gradient(180deg, rgba(244,248,251,0.42) 0 5px, transparent 5px 11px)",
              // base fabric shading — rolls away at both edges
              "linear-gradient(90deg, #3B5073 0%, #566787 16%, #5478B2 38%, #6F8FC0 50%, #5478B2 62%, #566787 84%, #3B5073 100%)",
            ].join(", "),
            backgroundSize: "6px 6px, 6px 6px, 1.5px 100%, 100% 100%",
            backgroundPosition: "0 0, 0 0, 50% 0, 0 0",
            backgroundRepeat: "repeat, repeat, repeat, no-repeat",
          }}
        />
      ) : null}

      {/* Brushed-silver swivel clasp — pinned to the strap's lower tip and
          hooked over the badge's top-centre slot. Rendered outside the card
          so it tracks the card's anchor instead of its rotation. */}
      {anchorX !== null ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-30"
          style={{
            left: claspLeft,
            top: claspTop,
            rotate: strapRotate,
            opacity: strapOpacity,
            transformOrigin: `${CLASP_W / 2}px ${CLASP_EYE_Y}px`,
          }}
        >
          <MetallicClasp />
        </motion.div>
      ) : null}

      {/* Entrance drop wrapper */}
      <motion.div
        className="absolute z-10"
        style={{
          top: CARD_TOP,
          left: "50%",
          marginLeft: -CARD_W / 2,
          y: drop,
          opacity: dropOpacity,
        }}
      >
        {/* Draggable badge */}
        <motion.div
          ref={faceRef}
          drag={!reduceMotion}
          dragConstraints={{ top: -20, bottom: 110, left: -100, right: 100 }}
          dragElastic={0.35}
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 120, bounceDamping: 12 }}
          onDragEnd={settle}
          onTap={handleTap}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
          onBlur={resetTilt}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="group"
          aria-roledescription="interactive hanging credential"
          aria-label="ID badge for Manvitha Yalamanchili. Click it to swing, drag it, or use the arrow keys."
          aria-describedby="badge-instructions"
          whileDrag={{ scale: 1.015, zIndex: 30 }}
          style={{
            x,
            y,
            rotateX: tiltX,
            rotateY: tiltY,
            rotateZ,
            transformPerspective: 1200,
            transformOrigin: "50% 0%",
            width: CARD_W,
            height: CARD_H,
          }}
          className="relative cursor-grab touch-none rounded-2xl outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-steel-blue active:cursor-grabbing"
        >
          {/* PVC card — exact artwork aspect ratio, specular rim, layered shadow */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-10 mx-auto h-[2px] w-[54px] rounded-b-full bg-[#152236]/15"
          />

          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/70 bg-[#FFFFFF] shadow-[0_28px_60px_-12px_rgba(21,34,54,0.38),0_8px_20px_-4px_rgba(84,120,178,0.22)] ring-1 ring-[#152236]/8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc}
              alt="ID badge for Manvitha Yalamanchili — Computer Science, building systems that make an impact"
              draggable={false}
              className="h-full w-full rounded-2xl object-contain select-none"
            />

            {/* specular edge + static laminate highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-gradient-to-br from-white/35 via-transparent to-transparent ring-1 ring-white/45 ring-inset"
            />
            {/* cursor-tracking glossy PVC reflection */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-75"
              style={{ background: glare }}
            />
          </div>
        </motion.div>
      </motion.div>

      <p className="absolute bottom-1 w-full text-center text-[11px] font-medium tracking-[0.18em] text-[#475872]/80 uppercase">
        Click, drag or hover the badge
      </p>
    </div>
  );
}

function MetallicClasp() {
  return (
    <svg
      width="56"
      height="76"
      viewBox="0 0 56 76"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_8px_10px_rgba(0,0,0,0.35)]"
    >
      <defs>
        <linearGradient
          id="clasp-metal"
          x1="9"
          y1="2"
          x2="47"
          y2="74"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F6F3EA" />
          <stop offset="0.18" stopColor="#D6D8D9" />
          <stop offset="0.42" stopColor="#8A9198" />
          <stop offset="0.62" stopColor="#E4E6E6" />
          <stop offset="0.82" stopColor="#9AA1A7" />
          <stop offset="1" stopColor="#E9E7DE" />
        </linearGradient>
        <linearGradient id="clasp-dark" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#626a72" />
          <stop offset="1" stopColor="#2f363d" />
        </linearGradient>
      </defs>

      {/* swivel eye — the strap threads through here */}
      <ellipse
        cx="28"
        cy="9"
        rx="10"
        ry="6.5"
        stroke="url(#clasp-metal)"
        strokeWidth="3.6"
      />
      <rect
        x="25.5"
        y="12"
        width="5"
        height="9"
        rx="2.5"
        fill="url(#clasp-metal)"
      />

      {/* lobster clasp body */}
      <path
        d="M17 23c0-4 5-6 11-6s11 2 11 6v14c0 7-5 11-11 11s-11-4-11-11V23Z"
        fill="url(#clasp-metal)"
        stroke="#646b73"
        strokeWidth="0.8"
      />
      <path
        d="M22 25v11c0 3.4 2.6 5.8 6 5.8s6-2.4 6-5.8V25"
        stroke="url(#clasp-dark)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M39 30c4 0 6 3 6 6s-2.5 5.5-6 5.5"
        stroke="url(#clasp-metal)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* swivel D-ring, hooked through the card's die-cut slot */}
      <path
        d="M19 50c0-4 4-6 9-6s9 2 9 6v11c0 5-4 8-9 8s-9-3-9-8V50Z"
        stroke="url(#clasp-metal)"
        strokeWidth="4"
      />
      <path
        d="M20 51c0-3 3.5-5 8-5s8 2 8 5"
        stroke="#F7F4EC"
        strokeOpacity="0.6"
        strokeWidth="1"
      />
    </svg>
  );
}
