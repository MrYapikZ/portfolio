'use client';
import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { DiscordLogoIcon, FacebookLogoIcon, GithubLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useLockBodyScroll } from 'react-use';
import { gsap } from "gsap";
import { SplitText } from 'gsap/SplitText';
import Autoplay from "embla-carousel-autoplay";
import { HomeProps } from "@/types/home";

gsap.registerPlugin(SplitText);

export default function HomeDesktop({ names, altNames, socials, projects }: HomeProps) {
  useLockBodyScroll(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const tl = useRef<GSAPTimeline | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const navTextRef = useRef<HTMLParagraphElement>(null);
  const japaneseNameRef = useRef<HTMLHeadingElement>(null);
  const nameHeadingRef = useRef<HTMLHeadingElement>(null);
  const bioParagraphRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const contactIconsRef = useRef<HTMLDivElement>(null);
  const creditRef = useRef<HTMLDivElement>(null);
  const artCreditRef = useRef<HTMLParagraphElement>(null);

  const carouselAutoplay = useRef(Autoplay({ delay: 3000, playOnInit: false }));

  useEffect(() => {
    const japaneseNameSplit = new SplitText(japaneseNameRef.current, { type: "chars" });
    let ctx = gsap.context(() => {

      tl.current = gsap.timeline({
        onComplete: () => {
          carouselAutoplay.current?.play();
          isLoading && setIsLoading(false);
        }
      })
        .from(navRef.current, {
          x: -200,
          duration: 1,
          opacity: 0,
          ease: "power3.inOut"
        }, 1)
        .from(navTextRef.current, {
          x: -200,
          duration: 1,
          opacity: 0,
          ease: "power3.inOut"
        }, "<0.05")
        .from(projectsRef.current, {
          x: 800,
          duration: 1,
          opacity: 0,
          ease: "power3.inOut"
        }, "<")
        .from(carouselRef.current, {
          x: 800,
          duration: 1,
          opacity: 0,
          ease: "power3.inOut"
        }, "<0.05")
        .from(bioRef.current, {
          x: 800,
          duration: 1,
          opacity: 0,
          ease: "power3.inOut"
        }, "-=0.8")
        .from(bioParagraphRef.current, {
          x: 800,
          duration: 1,
          opacity: 0,
          ease: "power3.inOut"
        }, "-=0.85")
        .from(contactRef.current, {
          x: 800,
          duration: 1,
          opacity: 0,
          ease: "power3.inOut"
        }, "-=0.8")
        .from(emailRef.current, {
          x: 800,
          duration: 1,
          opacity: 0,
          ease: "power3.inOut"
        }, "<0.05")
        .from(contactIconsRef.current, {
          x: 800,
          duration: 1,
          opacity: 0,
          stagger: 0.2,
          ease: "power3.inOut"
        }, "<0.075")
        .from(creditRef.current, {
          y: 200,
          duration: 1,
          opacity: 0,
          ease: "power3.inOut"
        }, "<0.125")
        .from(artCreditRef.current, {
          y: 200,
          duration: 1,
          opacity: 0,
          ease: "power3.inOut"
        }, "<0.125")
        .from(japaneseNameSplit.chars, {
          duration: 1,
          opacity: 0,
          y: 50,
          stagger: 0.2,
          ease: "power3.inOut"
        }, "<0.5")
        .from(nameRef.current, {
          y: 400,
          duration: 1,
          opacity: 0,
          ease: "power3.inOut"
        }, "<0.05")
        .from(nameHeadingRef.current, {
          y: 400,
          opacity: 0,
          duration: 1,
          ease: "power3.inOut"
        }, "<0.05");
    });

    return () => {
      ctx.revert();
      tl.current?.kill();
    }
  }, []);

  useEffect(() => {
    if (isLoading || names.length <= 1 || altNames.length <= 1) return;

    const nameElement = nameHeadingRef.current;
    const japaneseElement = japaneseNameRef.current;
    if (!nameElement || !japaneseElement) return;

    let japaneseNameSplit: SplitText | null = new SplitText(japaneseElement, { type: "chars" });
    let switchTimeline: GSAPTimeline | null = null;
    let cycleDelay: gsap.core.Tween | null = null;

    const scheduleNextCycle = () => {
      cycleDelay = gsap.delayedCall(5, runCycle);
    };

    const runCycle = () => {
      switchTimeline?.kill();
      gsap.killTweensOf(nameElement);
      if (japaneseNameSplit) {
        gsap.killTweensOf(japaneseNameSplit.chars);
      }
      const currentSplit = japaneseNameSplit;
      if (!currentSplit) return;

      switchTimeline = gsap.timeline({
        onComplete: () => {
          gsap.set(japaneseElement, { opacity: 0 });
          japaneseNameSplit?.revert();
          setCurrentIndex((prev) => (prev + 1) % names.length);

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              japaneseNameSplit = new SplitText(japaneseElement, { type: "chars" });

              gsap.timeline({ onComplete: scheduleNextCycle })
                .set(japaneseElement, { opacity: 1 }, 0)
                .fromTo(
                  nameElement,
                  { y: 400, opacity: 0 },
                  { y: 0, opacity: 1, duration: 1, ease: "power3.inOut" },
                  0
                )
                .fromTo(
                  japaneseNameSplit.chars,
                  { y: 50, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: "power3.inOut" },
                  0
                );
            });
          });
        }
      })
        .to(nameElement, {
          y: 400,
          opacity: 0,
          duration: 1,
          ease: "power3.inOut"
        }, 0)
        .to(currentSplit.chars, {
          duration: 0.5,
          opacity: 0,
          y: 50,
          stagger: 0.2,
          ease: "power3.inOut"
        }, 0);
    };

    scheduleNextCycle();

    return () => {
      cycleDelay?.kill();
      switchTimeline?.kill();
      gsap.killTweensOf(nameElement);
      if (japaneseNameSplit) {
        gsap.killTweensOf(japaneseNameSplit.chars);
        japaneseNameSplit.revert();
      }
    };
  }, [isLoading, names.length]);

  return (
    <>
      <section id="home-desktop" className="p-4 h-screen w-screen overflow-hidden bg-white">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/background/wallhaven-9dq9wk.png"
            alt="background"
            fill
            priority
            loading="eager"
            className="object-cover scale-x-[-1]"
          />
          <div className="absolute inset-0 bg-white/0"></div>
          <div className="relative w-full h-full border-4 border-black grid grid-cols-12 grid-rows-6">
            {/* Nav */}
            <div ref={navRef} className="bg-white border-r-4 border-black row-start-1 row-end-7 flex items-center justify-center">
              <p ref={navTextRef} className="font-sans font-bold text-[clamp(4.5rem,5vw,6rem)] [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180">
                STUPID GENERALIST
              </p>
            </div>

            {/* Name */}
            <div ref={nameRef} className="relative bg-white border-l-4 border-t-4 border-black col-start-4 col-end-9 row-start-5 row-end-7 flex flex-col items-center justify-center gap-4">
              <h1 ref={nameHeadingRef} className="font-heading text-[clamp(20rem,20vw,32rem)]">
                {names[currentIndex]}
              </h1>
            </div>

            {/* Projects */}
            <div ref={projectsRef} className="bg-white border-b-4 border-l-4 border-black col-start-9 col-end-13 row-start-1 row-end-3 flex flex-col items-center justify-center p-4">
              <Carousel ref={carouselRef} plugins={[carouselAutoplay.current]} className="h-full">
                <CarouselContent className="h-full">
                  {projects.map((project, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div className="p-1 h-full">
                        <Card className="relative h-full">
                          {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
                          <img
                            src={project.image}
                            alt={project.title}
                            className="relative z-20 aspect-video h-10/12 w-full object-cover brightness-80 dark:brightness-40"
                          />
                          <CardHeader className="h-24">
                            <CardTitle className="font-sans text-xl leading-none">
                              {project.link ? (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-zinc-500 underline transition-colors duration-300"
                                >
                                  {project.title}
                                </a>
                              ) : (
                                project.title
                              )}
                            </CardTitle>
                            <CardAction>
                              <Badge variant="outline">{project.category}</Badge>
                            </CardAction>
                            <CardDescription className="font-sans">{project.description}</CardDescription>
                          </CardHeader>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            {/* Bio */}
            <div ref={bioRef} className="bg-white border-b-4 border-l-4 border-black col-start-9 col-end-13 row-start-3 row-end-6 p-8 flex flex-col items-center justify-center">
              <p ref={bioParagraphRef} className="font-sans text-xl">
                I’m a <b>Technical Director</b> in the animation industry, currently exploring Software Engineering, Data Science, and Game Development to understand how technology can enhance storytelling and design.
              </p>
            </div>
            {/* Contact */}
            <div ref={contactRef} className="relative bg-white border-l-4 border-black col-start-9 col-end-13 row-start-6 row-end-7 flex flex-col items-center justify-center">
              <a ref={emailRef} className="text-2xl" href="mailto:yapi@expiproject.com">yapi@expiproject.com</a>
              <TooltipProvider delayDuration={0}>
                <div ref={contactIconsRef} className="flex flex-row items-center justify-center gap-8">
                  {socials.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <Tooltip key={index}>
                        {/* Pindahkan trigger agar membungkus tag <a> atau Ikon */}
                        <TooltipTrigger asChild>
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                            className="group relative transition-all duration-300 hover:-translate-y-1"
                          >
                            <Icon
                              size={32}
                              className="text-black transition-colors group-hover:text-zinc-500"
                            />
                          </a>
                        </TooltipTrigger>

                        <TooltipContent
                          side="bottom"
                          className="bg-black text-white border-none rounded-none font-sans uppercase tracking-widest text-[10px]"
                        >
                          <p>{social.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
              <div ref={creditRef} className="absolute bottom-0 right-0 p-4 flex flex-row items-center gap-2 text-[clamp(0.675rem,5vw,0.875rem)] font-sans">
                <p>
                  <span>Designed by </span>
                  <a className="font-sans text-sm font-bold" href="https://www.expiproject.com">ExpiProject</a>
                </p>
                <p>© 2026 ExpiProject</p>
              </div>
              <p ref={artCreditRef} className="text-xs font-sans bottom-0 left-0 absolute p-2">
                *Image not mine.
              </p>
            </div>

            {/* Japanese Name */}
            <div className="col-start-2 col-end-4 row-start-1 row-end-7 flex flex-col items-center justify-end">
              <h1 ref={japaneseNameRef} className="font-japanese text-[clamp(7rem,5vw,14rem)] whitespace-nowrap align-end text-end tracking-[-1rem] text-white p-8 px-14 [writing-mode:vertical-rl] [text-orientation:upright] [-webkit-text-stroke:4px_black]">
                {altNames[currentIndex]}
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
          <div className="absolute top-0 w-full h-full border-4 border-black grid grid-cols-12 grid-rows-6 pointer-events-none"></div>
        </div>
      </section >
    </>
  );
}
