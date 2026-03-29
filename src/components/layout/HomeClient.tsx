"use client";

import { useState } from "react";
import IntroAnimation from "@/components/layout/IntroAnimation";
import FaqAccordion from "@/components/sections/home/FaqAccordion";
import FeaturedProjects from "@/components/sections/home/FeaturedProjects";
import HeroSection from "@/components/sections/home/HeroSection";
import HomeCTA from "@/components/sections/home/HomeCTA";
import SkillUsed from "@/components/sections/home/SkillUsed";

export default function HomeClient() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}
      <HeroSection ready={introComplete} />
      <FeaturedProjects />
      <SkillUsed />
      <FaqAccordion />
      <HomeCTA />
    </>
  );
}
