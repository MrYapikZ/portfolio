import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Urbanist } from "next/font/google";
import localFont from "next/font/local"
import "./globals.css";
import { cn } from "@/lib/utils";
import CustomCursor from "@/components/custom-cursor";
import SmoothScroll from "@/components/SmoothScroll";

const nexusbold = localFont({ src: "./fonts/Nexusbold.ttf", variable: '--font-nexus' });

const buildingstracks = localFont({src:"./fonts/Buildingsandundertherailwaytracksfree_ver.otf", variable: '--font-buildingstracks'})

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-mono' });

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "russianwaifu | Yapi",
    template: "%s | Yapi"
  },
  keywords: [
    "Muhammad Yafi Al Haidar", 
    "Yapi", 
    "MrYapikZ",
    "russianwaifu",
    "dexkhead",
    "deckhead",
    "ExpiProject", 
    "Full-stack Developer Bandung", 
    "Next.js Developer", 
    "Creative Technologist Indonesia",
    "Web Development",
    "Software Engineer",
    "Portfolio",
    "Game Developer",
    "Open Source Contributor",
    "Tech Enthusiast",
    "Programming",
  ],
  authors: [{ name: "yapi" }],
  creator: "yapi",
  robots: {
    index: true,
    follow: true,
  },
  description: "Yapi's personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-mono", jetbrainsMono.variable, nexusbold.variable, buildingstracks.variable, urbanist.variable, "no-scrollbar", "select-none")}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        </body>
    </html>
  );
}
