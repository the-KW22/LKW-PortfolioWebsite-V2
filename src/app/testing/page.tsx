"use client"

import { DecorativeAnimationOverview } from "@/components/layout/DecorativeAnimation";
import { DecorativeBackground } from "@/components/layout/DecorativeElement";
import ShinyText from "@/components/ui/ShinyText";
import Silk from "@/components/ui/Silk";

export default function Testing() {
    return (
        <>
            {/* <div className="pt-20 min-h-screen w-full mx-auto">
                <DecorativeBackground />
            </div>

            <div className="pt-20 min-h-screen w-full mx-auto">
                <DecorativeAnimationOverview />
            </div> */}

            <div className="flex mt-20 min-h-[630px] min-w-[1200px] items-center justify-center bg-red-500">
                {/* Silk background */}
                <div className="absolute inset-0">
                    <Silk color="#1E1E1E" speed={5} scale={1} noiseIntensity={1.5} rotation={0} />
                </div>

                {/* Main content */}
                <div className="relative z-10 flex flex-col items-center justify-center max-w-7xl mx-auto h-full gap-4 md:gap-6 px-4 sm:px-6 text-center">

                    {/* Greeting */}
                    <p className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                        Hi, I&apos;m
                    </p>

                    {/* Name */}
                    <div >
                        <ShinyText
                            text="LEOW KAI WEN"
                            color="#A3A3A3"
                            shineColor="#FFFFFF"
                            speed={2}
                            delay={3}
                            className="font-heading text-4xl md:text-6xl lg:text-[8rem] font-black uppercase leading-none tracking-tight -mt-2"
                        />
                    </div>

                    {/* Role divider */}
                    <div className="flex items-center gap-4 w-full max-w-xs">
                        <span className="flex-1 h-px bg-divider" />
                        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap">
                            Full Stack Developer
                        </span>
                        <span className="flex-1 h-px bg-divider" />
                    </div>

                    {/* Bio */}
                    <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
                        A fresh graduate Software Engineering student that passionate about crafting{' '}
                        <span className="text-foreground font-medium">web applications</span>{' '}
                        and scalable digital solutions.
                    </p>

                </div>
            </div>
        </>
    )
}