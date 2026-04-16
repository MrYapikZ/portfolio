'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const INTERACTIVE_SELECTORS = `
  button, a[href], input:not([type="hidden"]), textarea, select,
  [role="button"], [role="link"], [role="textbox"], [contenteditable],
  .cursor-hover, [data-slot="input"], [data-slot="control"], .glass-card
`;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Anime V4: Target and properties are simplified
      animate(cursor, {
        x: e.clientX - 20, // V4 handles x/y as shorthands for translate
        y: e.clientY - 20,
        duration: 200,
        easing: 'inOutExpo', // "easeOutExpo" became "outExpo"
      });
    };
    

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTORS)) {
        animate(cursor, {
          scale: 1.5,
          rotate: 225,
          opacity: 0.6,
          duration: 300,
          easing: 'outQuad'
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTORS)) {
        animate(cursor, {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 300,
          easing: 'outQuad'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-2 top-2 z-[9999] h-5 w-5"
    >
      <div className="relative h-full w-full">
        {/* Top Left */}
        <div className="absolute left-0 top-0 h-1 w-1 border-l border-t border-black" />
        {/* Top Right */}
        <div className="absolute right-0 top-0 h-1 w-1 border-r border-t border-black" />
        {/* Bottom Left */}
        <div className="absolute bottom-0 left-0 h-1 w-1 border-b border-l border-black" />
        {/* Bottom Right */}
        <div className="absolute bottom-0 right-0 h-1 w-1 border-b border-r border-black" />

        {/* <div className="absolute inset-0 rounded-full border border-black" /> */}

        <div className="absolute top-1/2 left-1/2 h-0 w-2 -translate-x-1/2 -translate-y-1/2 border-t border-black" />
        <div className="absolute top-1/2 left-1/2 h-2 w-0 -translate-x-1/2 -translate-y-1/2 border-l border-black" />
      </div>
    </div>
  );
}