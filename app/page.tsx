'use client';
import { useState, useEffect } from "react";
import HomeDesktop from "@/components/page/home-desktop";
import HomeMobile from "@/components/page/home-mobile";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);
  const names = [
    "russianwaifu",
    // "dexkhead", 
    // "mryapikz", 
    // "yapi", 
    // "yp"
  ];
  const altNames = [
    // "ロシアンワイフ",
    "甲板頭",
  ]
  const projects = [
    {
      title: "Afterflash",
      category: "Desktop",
      description: "Photobooth software.",
      image: "/portfolio/preview-afterflash.png",
      // link: "https://afterflash.expiproject.com"
    },
    {
      title: "VRM Viewer",
      category: "Web",
      description: "A simple VRM model viewer built with Three.js.",
      image: "/portfolio/preview-vrmviewer.png",
      link: "https://github.com/MrYapikZ/nextjs-vrm-preview.git"
    }
  ];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="fixed inset-0 bg-white" />;
  }
  return (
    <>
      {isMobile ? <HomeMobile names={names} altNames={altNames} projects={projects} /> : <HomeDesktop names={names} altNames={altNames} projects={projects} />}
    </>
  );
}
