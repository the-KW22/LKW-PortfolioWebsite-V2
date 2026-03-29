import type { Metadata } from "next";
import AboutMeIntro from "@/components/sections/about/AboutMeIntro";
import InfiniteSkillsMarquee from "@/components/sections/about/InfiniteSkillMarquee";
import OutsideOfCoding from "@/components/sections/about/OutsideOfCoding";
import OpportunitiesCTA from "@/components/sections/about/OpportunitiesCTA";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://leowkaiwen.dev";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Leow Kai Wen — a fresh graduate Full Stack Developer from Kuala Lumpur, Malaysia. Specializing in React, Next.js, and TypeScript. Open to junior software engineering roles.",
  alternates: { canonical: `${siteUrl}/about-me` },
  openGraph: {
    title: "About Me — Leow Kai Wen",
    description:
      "Fresh graduate Full Stack Developer from Kuala Lumpur. Specialized in React, Next.js, TypeScript. Open to junior engineering opportunities.",
    url: `${siteUrl}/about-me`,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "About Leow Kai Wen — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me — Leow Kai Wen",
    description:
      "Fresh graduate Full Stack Developer from Kuala Lumpur. Specialized in React, Next.js, TypeScript. Open to junior engineering opportunities.",
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function AboutMe(){
    return(
        <>
            <AboutMeIntro />
            <InfiniteSkillsMarquee />
            <OutsideOfCoding />
            <OpportunitiesCTA />
        </>
    )
}