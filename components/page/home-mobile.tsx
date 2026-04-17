'use client';
import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import { DiscordLogoIcon, FacebookLogoIcon, GithubLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from 'gsap/SplitText';
import Autoplay from "embla-carousel-autoplay"

gsap.registerPlugin(SplitText);

interface HomeMobileProps {
  names: string[];
  altNames: string[];
}

export default function HomeMobile({ names, altNames }: HomeMobileProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
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
                carouselAutoplay.current.play();
            }
        })
            .from(japaneseNameSplit.chars, {
                duration: 1,
                opacity: 0,
                y: 50,
                stagger: 0.2,
                ease: "power3.inOut"
            }, 1)
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
        };
    }, []);

    return (
        <>
            <section id="home-mobile" className="p-4 min-h-screen w-full overflow-x-hidden bg-white">
                <div className="relative w-full h-full overflow-x-hidden border-4 border-black">
                    <Image
                        src="/background/wallhaven-9dq9wk.png"
                        alt="background"
                        fill
                        priority
                        loading="eager"
                        className="object-cover scale-x-[-1] max-h-screen"
                    />
                    <div className="absolute inset-0 bg-white/0"></div>
                    <div className="relative w-full h-screen grid grid-cols-3 grid-rows-8">
                        {/* Japanese Name */}
                        <div className="col-start-3 col-end-4 row-start-1 row-end-6 flex flex-col items-center justify-start">
                            <h1 ref={japaneseNameRef} className="font-japanese text-[clamp(8rem,5vw,14rem)] text-white p-8 px-14 align-start [writing-mode:vertical-rl] [text-orientation:upright] [-webkit-text-stroke:4px_black]">
                                {altNames[currentIndex]}
                            </h1>
                        </div>

                        {/* Name */}
                        <div ref={nameRef} className="col-start-1 col-end-4 row-start-7 row-end-9 relative bg-white border-t-4 border-black flex flex-col items-center justify-center gap-4">
                            <h1 ref={nameHeadingRef} className="font-heading text-[clamp(12rem,20vw,100rem)]">
                                {names[currentIndex]}
                            </h1>
                        </div>
                    </div>
                    <div className="relative w-full h-screen grid grid-cols-3 grid-rows-8">
                        {/* Bio */}
                        <div ref={bioRef} className="col-start-1 col-end-4 row-start-1 row-end-4 bg-white border-t-4 border-black flex flex-col items-center justify-center">
                            <p ref={bioParagraphRef} className="p-4 font-sans text-xl">
                                I’m a <b>Technical Director</b> in the animation industry, currently exploring Software Engineering, Data Science, and Game Development to understand how technology can enhance storytelling and design.
                            </p>
                        </div>
                        {/* Projects */}
                        <div ref={projectsRef} className="col-start-1 col-end-4 row-start-4 row-end-7 bg-white border-t-4 border-black flex flex-col items-center justify-center p-4">
                            <Carousel ref={carouselRef} plugins={[carouselAutoplay.current]} className="h-full">
                                <CarouselContent className="h-full">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <CarouselItem key={index} className="h-full">
                                            <div className="p-1 h-full">
                                                <Card className="relative h-full">
                                                    {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
                                                    <img
                                                        src='/background/wallhaven-1qd9o1.png'
                                                        alt={`Project ${index + 1}`}

                                                        className="relative z-20 aspect-video h-10/12 w-full object-cover brightness-80 dark:brightness-40"
                                                    />
                                                    <CardHeader className="h-24">
                                                        <CardTitle className="font-sans">Project {index + 1}</CardTitle>
                                                    </CardHeader>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>
                        {/* Contact */}
                        <div ref={contactRef} className="col-start-1 col-end-4 row-start-7 row-end-9 relative bg-white border-t-4 border-black flex flex-col items-center justify-center">
                            <a ref={emailRef} className="text-2xl" href="mailto:yapi@expiproject.com">yapi@expiproject.com</a>
                            <div ref={contactIconsRef} className="flex flex-row gap-8">
                                <InstagramLogoIcon size={32} />
                                <FacebookLogoIcon size={32} />
                                <DiscordLogoIcon size={32} />
                                <GithubLogoIcon size={32} />
                            </div>
                            <div ref={creditRef} className="absolute bottom-0 right-0 p-6 flex flex-row items-center gap-2 text-[clamp(0.675rem,5vw,0.875rem)] font-sans">
                                <p className="flex flex-row gap-2">
                                    <span className="hidden sm:block">Designed by </span>
                                    <a className="font-sans text-sm font-bold" href="https://www.expiproject.com">ExpiProject</a>
                                </p>
                                <p>© 2026 ExpiProject</p>
                            </div>
                            <p ref={artCreditRef} className="text-xs font-sans bottom-0 left-0 absolute p-2">
                                *Image not mine.
                            </p>
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
