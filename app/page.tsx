'use client';
import HomeDesktop from "@/components/page/home-desktop";
import HomeMobile from "@/components/page/home-mobile";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? <HomeMobile /> : <HomeDesktop />}
    </>
  );
}