"use client";
import { useEffect, useRef } from "react";
import { animate, type Target } from "animejs";

export interface CyberBackgroundProps {
  backgroundColor?: string;
  fragmentColor?: string;
  count?: number;
  maxOpacity?: number;
  speed?: number;
  scanlineOpacity?: number;
  extraFragments?: string[];
  zIndex?: number;
}

const DEFAULT_FRAGMENTS = [
  "+", "//", "01", "RX-7", "[]", "::", "ID",
  "0x1F", "=>", "&&", "null", "{}", "<<", ">>",
  "11001", "FN()", "==", "/*", "*/", "TX", "RX",
  "0xFF", "$$", "..", "ENV", "!==", "~~", "NaN",
  "EOF", "0b10", "#DEF", "ERR", "ACK", "SYN",
  "idx", "ptr", "0x00", ";;", "?:", "true",
  "|>", "<<<", "BUF", "HEX", "DMA", "IRQ",
] as const;

const FONT_SIZES = [10, 11, 12, 14, 16, 18] as const;

type FragKind = "drift" | "glitch" | "pulser";

function getKind(i: number): FragKind {
  if (i % 7 === 0) return "glitch";
  if (i % 11 === 0) return "pulser";
  return "drift";
}

const CyberBackground = ({
  backgroundColor = "#E8D646",
  fragmentColor = "#000000",
  count = 56,
  maxOpacity = 0.35,
  speed = 1,
  scanlineOpacity = 0.04,
  extraFragments = [],
  zIndex = -10,
}: CyberBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const pool = [...DEFAULT_FRAGMENTS, ...extraFragments];

  const det = (i: number, prime: number, range: number) =>
    (i * prime) % range;

  const fragments = Array.from({ length: count }, (_, i) => {
    const kind = getKind(i);
    const opLo = +(0.05 + det(i, 13, 8) / 100).toFixed(2);
    const opHi = +Math.min(maxOpacity, opLo + maxOpacity * 0.85).toFixed(2);

    return {
      i,
      kind,
      text: pool[i % pool.length],
      fontSize: FONT_SIZES[i % FONT_SIZES.length],
      top: `${(det(i, 97, 950) / 10).toFixed(1)}%`,
      left: `${(det(i, 83, 950) / 10).toFixed(1)}%`,
      dx: (det(i, 37, 40) - 20).toFixed(1),
      dy: (det(i, 53, 50) - 25).toFixed(1),
      r0: (det(i, 71, 60) - 30).toFixed(1),
      r1: (det(i, 89, 120) - 60).toFixed(1),
      r2: (det(i, 61, 80) - 40).toFixed(1),
      opLo,
      opHi,
      dur: Math.round(
        (kind === "glitch"
          ? 2000 + det(i, 137, 6000)
          : 4500 + det(i, 317, 6000)) / speed
      ),
      delay: det(i, 479, 5000),
    };
  });

  useEffect(() => {
    const readNum = (target: Target, key: string) => {
      const el = target as HTMLElement;
      return parseFloat(el.dataset[key] ?? "0");
    };

    animate(".cyber-frag-drift", {
      translateX: (target: Target) => {
        const v = readNum(target, "dx");
        return [0, v, -v * 0.6, 0];
      },
      translateY: (target: Target) => {
        const v = readNum(target, "dy");
        return [0, v, v * 0.4, 0];
      },
      rotate: (target: Target) => {
        const r0 = readNum(target, "r0");
        const r1 = readNum(target, "r1");
        const r2 = readNum(target, "r2");
        return [r0, r1, r2, r0];
      },
      opacity: (target: Target) => {
        const lo = readNum(target, "oplo");
        const hi = readNum(target, "ophi");
        return [lo, hi, lo, lo];
      },
      duration: (target: Target) => readNum(target, "dur"),
      delay: (target: Target) => readNum(target, "delay"),
      loop: false,
      easing: "easeInOutSine",
    });

    animate(".cyber-frag-glitch", {
      opacity: [
        { to: 0.06, duration: 50 },
        { to: 0.95, duration: 30 },
        { to: 0.03, duration: 40 },
        { to: 0.85, duration: 20 },
        { to: 0.03, duration: 30 },
        { to: 0.7, duration: 25 },
        { to: 0.03, duration: 50 },
        { to: 0.06, duration: 2000 }, // long pause between bursts
      ],
      duration: (target: Target) => readNum(target, "dur"),
      delay: (target: Target) => readNum(target, "delay"),
      loop: true,
      easing: "steps(1)",
    });

    animate(".cyber-frag-pulser", {
      opacity: [0.05, maxOpacity, 0.05],
      scale: [1, 1.15, 1],
      duration: (target: Target) => readNum(target, "dur"),
      delay: (target: Target) => readNum(target, "delay"),
      loop: true,
      easing: "easeInOutQuad",
    });
  }, [count, maxOpacity, speed]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden select-none pointer-events-none"
      style={{ zIndex, backgroundColor }}
    >
      {fragments.map(({ i, kind, text, fontSize, top, left, dx, dy, r0, r1, r2, opLo, opHi, dur, delay }) => (
        <span
          key={i}
          className={`cyber-frag-${kind} absolute font-mono font-bold`}
          style={{
            top,
            left,
            fontSize,
            color: fragmentColor,
            opacity: opLo,
            willChange: "transform, opacity",
          }}
          data-dx={dx}
          data-dy={dy}
          data-r0={r0}
          data-r1={r1}
          data-r2={r2}
          data-oplo={opLo}
          data-ophi={opHi}
          data-dur={dur}
          data-delay={delay}
        >
          {text}
        </span>
      ))}

      {/* <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            transparent 0px, transparent 3px,
            rgba(0,0,0,${scanlineOpacity}) 3px,
            rgba(0,0,0,${scanlineOpacity}) 4px
          )`,
        }}
      /> */}

      {/* <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,0,0.025),rgba(0,255,0,0.015),rgba(0,0,255,0.025))]" /> */}

      {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,transparent_50%,rgba(0,0,0,0.18)_100%)]" /> */}
    </div>
  );
};

export default CyberBackground;