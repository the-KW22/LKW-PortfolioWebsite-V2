import CategoryDivider from "./CategoryDivider";
import MediaCarousel, { type CarouselItem } from "@/components/ui/MediaCarousel";

const MiniExpensesTracker: CarouselItem[] = [
  {
    id: "01",
    category: "Mini Series",
    title: "Mini Expenses Tracker",
    description: "A simple and user-friendly personal finance web app that helps users track income, expenses, budgets and gain insights through real-time alerts and visual analytics.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "MongoDB", "NextAuth"],
    liveUrl: "https://mini-expenses-tracker.vercel.app/",
    note: "In order to have the full dashboard view, you need to create an account and sign in.",
    media: [
      { type: "image", src: "/images/projects/mini-series/mini-expenses-tracker/Dashboard.jpeg" },
      { type: "image", src: "/images/projects/mini-series/mini-expenses-tracker/ExpensesPage.jpeg" },
      { type: "image", src: "/images/projects/mini-series/mini-expenses-tracker/IncomePage.jpeg" },
      { type: "image", src: "/images/projects/mini-series/mini-expenses-tracker/ProfilePage.jpeg" },
      { type: "image", src: "/images/projects/mini-series/mini-expenses-tracker/ThemeSelection.jpeg" },
    ],
  },
];

const MiniDashboard: CarouselItem[] = [
  {
    id: "02",
    category: "Mini Series",
    title: "Mini Dashboard",
    description: "A modern personal dashboard web app that can manage tasks and take notes.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "local storage"],
    liveUrl: "https://mini-dashboard-umber.vercel.app/",
    media: [
      { type: "image", src: "/images/projects/mini-series/mini-dashboard/1.png" },
      { type: "image", src: "/images/projects/mini-series/mini-dashboard/2.png" },
      { type: "image", src: "/images/projects/mini-series/mini-dashboard/3.png" },
      { type: "image", src: "/images/projects/mini-series/mini-dashboard/4.png" },
      { type: "image", src: "/images/projects/mini-series/mini-dashboard/5.png" },
    ],
  },
];

const MiniWeather: CarouselItem[] = [
  {
    id: "03",
    category: "Mini Series",
    title: "Mini Weather",
    description: "A lightweight weather web app focused on API integration and backend-driven functionality, delivering real-time weather and air quality data.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "OpenWeather API", "AirVisual API", "Recharts"],
    liveUrl: "https://mini-weather-opal.vercel.app/",
    note: "API key is rate-limited. If the live demo returns no data, the limit may have been reached.",
    media: [
      { type: "image", src: "/images/projects/mini-series/mini-weather/HomePage.jpeg" },
      { type: "image", src: "/images/projects/mini-series/mini-weather/WeatherPage.jpeg" },
      { type: "image", src: "/images/projects/mini-series/mini-weather/AirQualityPage.jpeg" },
    ],
  },
];

const MiniSubscriptionManager: CarouselItem[] = [
  {
    id: "04",
    category: "Mini Series",
    title: "Mini Subscription Manager",
    description: "A subscription tracking app that helps users manage recurring payments, visualise spending, and get reminded before renewals.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "MongoDB", "NextAuth"],
    liveUrl: "#",
    note: "This web app is still under construction...",
    media: [
      { type: "image", src: "/images/projects/mini-series/mini-subscription-manager/1.png" },
      { type: "image", src: "/images/projects/mini-series/mini-subscription-manager/2.png" },
      { type: "image", src: "/images/projects/mini-series/mini-subscription-manager/3.png" },
      { type: "image", src: "/images/projects/mini-series/mini-subscription-manager/4.png" },
    ],
  },
];

const Moonwave: CarouselItem[] = [
  {
    id: "01",
    category: "Web Design",
    title: "Moonwave",
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
    category: "Web Design",
    title: "Brickly",
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
    id: "01",
    category: "Web Design",
    title: "Pet Shop Website Design",
    description: "A modern and visually appealing pet shop landing design concept to showcase premium UI design with smooth interactions and clean layout.",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "Lenis"],
    liveUrl: "https://pet-shop-web-template.vercel.app/",
    note: "This is a design-only project. The live demo is a static implementation of the Figma mockup.",
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
    id: "02",
    category: "Web Design",
    title: "Portfolio Landing Page",
    description: "A personal portfolio landing page concept exploring typography-led design, smooth scroll interactions, and a bold dark aesthetic.",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
    liveUrl: "https://landing-page-design01.vercel.app/",
    fullPageScreenshot: "/images/projects/web-design/personal-portfolio-landing/portfolio-landing-full-page-screenshot.png",
    media: [
      { type: "image", src: "/images/projects/web-design/personal-portfolio-landing/1.png" },
      { type: "image", src: "/images/projects/web-design/personal-portfolio-landing/2.png" },
      { type: "image", src: "/images/projects/web-design/personal-portfolio-landing/3.png" },
      { type: "image", src: "/images/projects/web-design/personal-portfolio-landing/4.png" },
      { type: "image", src: "/images/projects/web-design/personal-portfolio-landing/5.png" },
    ],
  },
];

export default function ProjectCarouselSection() {
  return (
    <section>
      <div id="mini-series" className="mt-20">
        <CategoryDivider title="Mini Series" index={1} count={4} />
        <div className="flex items-center justify-center p-8">
          <div className="w-4xl flex flex-col gap-8">
            <MediaCarousel items={MiniExpensesTracker} />
            <MediaCarousel items={MiniDashboard} />
            <MediaCarousel items={MiniWeather} />
            <MediaCarousel items={MiniSubscriptionManager} />
          </div>
        </div>
      </div>

      <div id="web-design">
        <CategoryDivider title="Web Design" index={2} count={4} />
        <div className="flex items-center justify-center p-8">
          <div className="w-4xl flex flex-col gap-8">
            <MediaCarousel items={Moonwave} />
            <MediaCarousel items={Brickly} />
            <MediaCarousel items={PetShop} />
            <MediaCarousel items={PortfolioLanding} />
          </div>
        </div>
      </div>
    </section>
  );
}
