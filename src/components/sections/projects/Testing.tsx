"use client";

import MediaCarousel, { type CarouselItem } from "@/components/ui/MediaCarousel";

const Moonwave: CarouselItem[] = [
    {
        id: "01",
        title: "Moonwave",
        category: "Web Designs",
        description: "A modern hero section with a dynamic animated background that captures attention.",
        tags: ["Vite", "TypeScript", "Tailwind CSS", "Nano Banana", "Kling"],
        liveUrl: "https://music-studio-web-design.vercel.app/",
        fullPageScreenshot: "/images/projects/web-design/moonwave/moonwave-full-page-screenshot.png",
        media: [
            { type: "video", src: "/video/Moonwave.mp4" },
        ],
    },
];

const Brickly: CarouselItem[] = [
    {
        id: "02",
        title: "Brickly",
        category: "Web Designs",
        description: "A modern hero section with a dynamic animated background that captures attention.",
        tags: ["Vite", "TypeScript", "Tailwind CSS", "Nano Banana", "Kling"],
        liveUrl: "https://real-estate-web-design-gray.vercel.app/",
        fullPageScreenshot: "/images/projects/web-design/brickly/brickly-full-page-screenshot.png",
        media: [
            { type: "video", src: "/video/Brickly.mp4" },
        ],
    },
];

const PetShop: CarouselItem[] = [
    {
        id: "03",
        title: "Pet Shop Website Design",
        category: "Web Design",
        description: "A modern and visually appealing pet shop landing design concept to showcase premium UI design with smooth interactions and clean layout.",
        tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "Lenis"],
        liveUrl: "https://pet-shop-web-template.vercel.app/",
        fullPageScreenshot: "/images/projects/web-design/pet-shop-landing/pet-shop-full-page-screenshot.png",
        media: [
            { type: "image", src: "/images/projects/web-design/pet-shop-landing/1.png" },
            { type: "image", src: "/images/projects/web-design/pet-shop-landing/2.png" },
            { type: "image", src: "/images/projects/web-design/pet-shop-landing/3.png" },
            { type: "image", src: "/images/projects/web-design/pet-shop-landing/4.png" },
            { type: "image", src: "/images/projects/web-design/pet-shop-landing/5.png" },
            { type: "image", src: "/images/projects/web-design/pet-shop-landing/6.png" },
        ],
    },
];

const PortfolioLanding: CarouselItem[] = [
    {
        id: "04",
        title: "Portfolio Landing Page",
        category: "Web Design",
        description: "A personal portfolio landing page concept exploring typography-led design, smooth scroll interactions, and a bold dark aesthetic.",
        tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
        fullPageScreenshot: "/images/projects/web-design/personal-portfolio-landing/portfolio-landing-full-page-screenshot.png",
        liveUrl: "https://landing-page-design01.vercel.app/",
        media: [
            { type: "image", src: "/images/projects/web-design/personal-portfolio-landing/1.png" },
            { type: "image", src: "/images/projects/web-design/personal-portfolio-landing/2.png" },
            { type: "image", src: "/images/projects/web-design/personal-portfolio-landing/3.png" },
            { type: "image", src: "/images/projects/web-design/personal-portfolio-landing/4.png" },
            { type: "image", src: "/images/projects/web-design/personal-portfolio-landing/5.png" },
        ],
    },
];

export default function Testing() {
    return (
        <div className="min-h-screen bg-page flex items-center justify-center p-8">
            <div className="w-4xl gap-2">
                <MediaCarousel items={Moonwave} />
                <MediaCarousel items={Brickly} />
                <MediaCarousel items={PetShop} />
                <MediaCarousel items={PortfolioLanding} />
            </div>
        </div>
    );
}
