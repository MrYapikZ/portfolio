'use client';
import Image from "next/image";
import { DiscordLogoIcon, FacebookLogoIcon, GithubLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react";

export default function Home() {
  return (
    <>
      <section className="p-4 h-screen w-screen overflow-hidden bg-white">
        <div className="relative w-full h-full overflow-hidden">
        <Image
          src="/background/wallhaven-1qd9o1.png"
          alt="background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/0"></div>

        <div className="relative w-full h-full border-4 border-black grid grid-cols-12 grid-rows-6">
          {/* Nav */}
          <div className="bg-white border-r-4 border-black row-start-1 row-end-7 flex items-center justify-center">
            <p className="font-sans font-bold text-8xl [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180">
              STUPID GENERALIST
            </p>
          </div>
          {/* Name */}
          <div className="bg-white border-b-4 border-l-4 border-black col-start-9 col-end-13 flex flex-col items-center justify-center">
            <h1 className="font-heading text-[12rem]">
              Dexkhead
            </h1>
          </div>
          {/* Projects */}
          <div className="bg-white border-b-4 border-l-4 border-black col-start-9 col-end-13 row-start-2 row-end-4">

          </div>
          {/* Bio */}
          <div className="bg-white border-l-4 border-black col-start-9 col-end-13 row-start-4 row-end-7 p-8 flex flex-col items-center justify-center">
            <p className="font-sans text-xl">
              I’m a <b>Technical Director</b> in the animation industry, currently exploring Software Engineering, Data Science, and Game Development to understand how technology can enhance storytelling and design.
            </p>
          </div>
          {/* Contact */}
          <div className="bg-white border-l-4 border-t-4 border-black col-start-4 col-end-9 row-start-5 row-end-7 flex flex-col items-center justify-center gap-4">
            <a className="text-xl" href="mailto:yapi@expiproject.com">yapi@expiproject.com</a>
            <div className="flex flex-row gap-8">
              <InstagramLogoIcon size={32} />
              <FacebookLogoIcon size={32} />
              <DiscordLogoIcon size={32} />
              <GithubLogoIcon size={32} />
            </div>
          </div>
          {/* Japanese Name */}
          <div className="col-start-2 col-end-4 row-start-3 row-end-7 flex flex-col items-center justify-end">
            <h1 className="font-japanese text-[12rem] text-white p-8 px-14 align-end [writing-mode:vertical-rl] [text-orientation:upright] [-webkit-text-stroke:4px_black]">
              甲板頭
            </h1>
          </div>
        </div>
      </div>
    </section >
    </>
  );
}
