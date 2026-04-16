'use client';
import CyberBackground from "@/components/cyber-background";
import { GlitchBackground } from "@/components/glitch-background";
import { InteractiveGridPattern } from "@/components/interactive-grid-pattern";
import PopUpWindow from "@/components/popup-window";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const mousePos = useRef({ x: 0, y: 0 });
  const delayedPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const factor = 0.2; 

      delayedPos.current.x += (mousePos.current.x - delayedPos.current.x) * factor;
      delayedPos.current.y += (mousePos.current.y - delayedPos.current.y) * factor;

      setPosition({
        x: delayedPos.current.x,
        y: delayedPos.current.y
      });

      requestAnimationFrame(animate);
    };

    const frameId = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(frameId);
    };
  }, []);
  return (
    <>
      <section className="p-4 h-screen w-screen overflow-hidden bg-black">
        <div className="h-full w-full relative">
          {/* top left */}
          <div className="absolute top-0 left-0 z-90">
            <nav className="border-t border-[#F5E709]">
              <a className="font-heading text-2xl text-[#F5E709] font-bold tracking-[1rem]" href="/">
                Dexkhead
              </a>
            </nav>
          </div>

          {/* core content */}
          <div className="[clip-path:var(--hero-clip)] h-full w-full relative bg-[#F5E709]">
            {/* <InteractiveGridPattern className="absolute inset-0 -z-10" cellSize={50} glowColor="rgba(245, 231, 9, 0.1)" borderColor="rgba(245, 231, 9, 0.2)" proximity={150} /> */}
            {/* <GlitchBackground className="absolute inset-0 -z-20" color="#F5E709" intensity={0.5} /> */}
            {/* <CyberBackground speed={5} /> */}
            {/* top info */}
            <div className="relative w-auto flex flex-row items-end justify-between ml-76 sm:ml-80 mr-8 sm:mr-12 pt-4 pb-2 border-b-2 border-black">
              <p className="hidden md:block font-heading text-sm tracking-[0.25rem]">
                x: {position.x.toFixed(2)} / y: {position.y.toFixed(2)}
              </p>
              <p className="font-heading text-lg text-md md:text-2xl font-black tracking-[0.25rem]">
                ID
              </p>
            </div>
            {/* title */}
            <div className="relative -z-10">
              {/* top left */}
              <div className="absolute left-5 md:left-20 top-5 md:top-20">
                <div className="absolute w-full h-full -z-10">
                  <div className="absolute top-0 left-0 border-t-4 2xl:border-t-8 border-l-4 2xl:border-l-8 border-black w-5 2xl:w-10 h-5 2xl:h-10" />
                  <div className="absolute top-0 right-0 border-t-4 2xl:border-t-8 border-r-4 2xl:border-r-8 border-black w-5 2xl:w-10 h-5 2xl:h-10" />
                  <div className="absolute bottom-0 left-0 border-b-4 2xl:border-b-8 border-l-4 2xl:border-l-8 border-black w-5 2xl:w-10 h-5 2xl:h-10" />
                  <div className="absolute bottom-0 right-0 border-b-4 2xl:border-b-8 border-r-4 2xl:border-r-8 border-black w-5 2xl:w-10 h-5 2xl:h-10" />
                </div>
                <h1 className="font-heading align-center text-3xl md:text-6xl 2xl:text-9xl font-black tracking-[1rem] p-4">
                  Dexkhead
                </h1>
              </div>
              {/* right */}
              <div className="absolute right-0 top-50 2xl:top-35 mr-8 2xl:mr-16">
                <h1 className="font-heading text-4xl sm:text-8xl lg:text-[12rem] font-black tracking-[1rem] md:tracking-[2rem] 2xl:tracking-[4rem] align-top [writing-mode:vertical-rl] [text-orientation:upright]">
                  甲板頭
                </h1>
              </div>
            </div>
            {/* action button */}
            <div className="absolute bottom-20 left-0 md:left-30 w-full flex flex-col md:flex-row items-center gap-24 md:gap-48 px-12 py-4">
              <Button variant="link" className="flex flex-col items-center font-heading font-bold text-4xl 2xl:text-6xl">
                Work
                <p className="font-normal text-lg">
                  仕事
                </p>
              </Button>
              <Button variant="link" className="flex flex-col items-center font-heading font-bold text-4xl 2xl:text-6xl">
                Contact
                <p className="font-normal text-lg">
                  接触
                </p>
              </Button>
            </div>
            {/* center */}
            <div className="absolute top-1/2 left-1/2 font-heading text-6xl sm:text-8xl font-black tracking-[0.25rem] leading-24 sm:leading-36 -translate-x-1/2 -translate-y-1/2">
              D X <br/> H D
            </div>
          </div>

          {/* bottom right */}
          <div className="absolute bottom-0 right-0">
            <div className="font-heading text-sm text-[#F5E709] font-bold tracking-[0.25rem] border-b border-[#F5E709]">
              Version v0.1.0
            </div>
          </div>
        </div>
      </section>
      {/* <PopUpWindow/> */}
    </>
  );
}
