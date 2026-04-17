'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useIsMobile } from '../hooks/use-mobile';

const INTERACTIVE_SELECTORS = `
  button, a[href], input:not([type="hidden"]), textarea, select,
  [role="button"], [role="link"], [role="textbox"], [contenteditable],
  .cursor-hover, [data-slot="input"], [data-slot="control"], .glass-card
`;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use quickTo for better performance on mousemove
    // This creates a high-performance setter for X and Y
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Adjusting for the initial left-2 top-2 (8px) plus half the cursor size (10px)
      xTo(e.clientX - 18);
      yTo(e.clientY - 18);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTORS)) {
        gsap.to(cursor, {
          scale: 1.5,
          rotation: 225, // GSAP uses rotation instead of rotate
          opacity: 0.6,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTORS)) {
        gsap.to(cursor, {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return isMobile ? null : (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-2 top-2 z-[9999] h-5 w-5"
    >
      <div className="relative h-full w-full">
        {/* Top Left */}
        <div className="absolute left-0 top-0 h-1 w-1 border-l border-t border-black dark:border-white" />
        {/* Top Right */}
        <div className="absolute right-0 top-0 h-1 w-1 border-r border-t border-black dark:border-white" />
        {/* Bottom Left */}
        <div className="absolute bottom-0 left-0 h-1 w-1 border-b border-l border-black dark:border-white" />
        {/* Bottom Right */}
        <div className="absolute bottom-0 right-0 h-1 w-1 border-b border-r border-black dark:border-white" />

        {/* Center Crosshair */}
        <div className="absolute top-1/2 left-1/2 h-0 w-2 -translate-x-1/2 -translate-y-1/2 border-t border-black dark:border-white" />
        <div className="absolute top-1/2 left-1/2 h-2 w-0 -translate-x-1/2 -translate-y-1/2 border-l border-black dark:border-white" />
      </div>
    </div>
  );
}