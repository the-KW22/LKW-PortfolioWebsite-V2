import type { Metadata } from "next";
import ProjectCarouselSection from "@/components/sections/projects/ProjectCarouselSection";
import ProjectHero from "@/components/sections/projects/ProjectHero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://leowkaiwen.dev";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects built by Leow Kai Wen — full-stack web apps, interactive UIs, and digital tools built with Next.js, React, TypeScript, and modern web technologies.",
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    title: "Projects — Leow Kai Wen",
    description:
      "Full-stack web applications and interactive UIs built with Next.js, React, and TypeScript by Leow Kai Wen.",
    url: `${siteUrl}/projects`,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Projects by Leow Kai Wen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Leow Kai Wen",
    description:
      "Full-stack web applications and interactive UIs built with Next.js, React, and TypeScript by Leow Kai Wen.",
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function Projects(){
    return(
        <>
            <ProjectHero />
            <ProjectCarouselSection />
        </>
    )
}