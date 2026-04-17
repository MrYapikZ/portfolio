'use client';
import { useState, useEffect } from "react";
import HomeDesktop from "@/components/page/home-desktop";
import HomeMobile from "@/components/page/home-mobile";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="fixed inset-0 bg-white" />;
  }
  return (
    <>
      {isMobile ? <HomeMobile /> : <HomeDesktop />}
    </>
  );
}
