'use client';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { DiscordLogoIcon, FacebookLogoIcon, GithubLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useLockBodyScroll } from 'react-use';

export default function Home() {
  useLockBodyScroll(true);
  return (
    <>
      <section className="p-4 h-screen w-screen overflow-hidden bg-white touch-none">
        <div className="relative w-full h-full overflow-hidden">
          
          <Image
            src="/background/wallhaven-9dq9wk.png"
            alt="background"
            fill
            priority
            className="object-cover scale-x-[-1]"
          />
          <div className="absolute inset-0 bg-white/0"></div>

          

          <div className="relative w-full h-full border-4 border-black grid grid-cols-12 grid-rows-6">
            {/* Nav */}
            <div className="bg-white border-r-4 border-black row-start-1 row-end-7 flex items-center justify-center">
              <p className="font-sans font-bold text-8xl [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180">
                STUPID GENERALIST
              </p>
            </div>

            {/* Projects */}
            <div className="bg-white border-b-4 border-l-4 border-black col-start-9 col-end-13 row-start-1 row-end-3 flex flex-col items-center justify-center p-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1 ">
                        <Card className="w-full h-80">
                          {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
                          <img
                            src='/background/wallhaven-1qd9o1.png'
                            alt={`Project ${index + 1}`}

                            className="relative z-20 aspect-video h-64 w-full object-cover brightness-80 dark:brightness-40"
                          />
                          <CardHeader>
                            <CardTitle className="font-sans">Project {index + 1}</CardTitle>
                          </CardHeader>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* <div className="flex justify-between mt-2">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div> */}
              </Carousel>
            </div>
            {/* Bio */}
            <div className="bg-white border-b-4 border-l-4 border-black col-start-9 col-end-13 row-start-3 row-end-6 p-8 flex flex-col items-center justify-center">
              <p className="font-sans text-xl">
                I’m a <b>Technical Director</b> in the animation industry, currently exploring Software Engineering, Data Science, and Game Development to understand how technology can enhance storytelling and design.
              </p>
            </div>
            {/* Contact */}
            <div className="relative bg-white border-l-4 border-black col-start-9 col-end-13 row-start-6 row-end-7 flex flex-col items-center justify-center">
              <a className="text-2xl" href="mailto:yapi@expiproject.com">yapi@expiproject.com</a>
              <div className="flex flex-row gap-8">
                <InstagramLogoIcon size={32} />
                <FacebookLogoIcon size={32} />
                <DiscordLogoIcon size={32} />
                <GithubLogoIcon size={32} />
              </div>
              <div className="absolute bottom-0 right-0 p-4 flex flex-row items-center gap-2 font-sans">
                <p>
                  <span className="font-sans text-sm">Designed by </span>
                  <a className="font-sans text-sm font-bold" href="https://www.expiproject.com">ExpiProject</a>
                </p>
                <p className="font-sans text-sm">© 2026 ExpiProject</p>
              </div>
              <p className="text-xs font-sans bottom-0 left-0 absolute p-2">
                *Image not mine.
              </p>
            </div>
            {/* Contact */}
            <div className="relative bg-white border-l-4 border-t-4 border-black col-start-4 col-end-9 row-start-5 row-end-7 flex flex-col items-center justify-center gap-4">
              <h1 className="font-heading text-[24rem]">
                russianwaifu
              </h1>
            </div>
            {/* Japanese Name */}
            <div className="col-start-2 col-end-4 row-start-3 row-end-7 flex flex-col items-center justify-end">
              <h1 className="font-japanese text-[12rem] text-white p-8 px-14 align-end [writing-mode:vertical-rl] [text-orientation:upright] [-webkit-text-stroke:4px_black]">
                甲板頭
              </h1>
            </div>
          </div>
          
          {/* Noise Filter Overlay */}
          <div 
            className="fixed inset-0 pointer-events-none z-50 opacity-80"
            style={{
              backgroundImage: "url('/texture/100-90-100.png')",
              backgroundRepeat: "repeat",
              mixBlendMode: "overlay"
            }}
            aria-hidden="true"
          />
        </div>
      </section >
    </>
  );
}
