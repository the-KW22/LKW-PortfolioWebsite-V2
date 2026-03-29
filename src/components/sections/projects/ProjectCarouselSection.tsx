import CategoryDivider from "./CategoryDivider";
import ProjectCarousel, { type Project } from "./ProjectCarousel";

const MiniSeriesProject: Project[] = [
  {
    id: "01",
    category: "Mini Series",
    title: "Mini Expenses Tracker",
    images: [
      "/images/projects/mini-series/mini-expenses-tracker/Dashboard.jpeg",
      "/images/projects/mini-series/mini-expenses-tracker/ExpensesPage.jpeg",
      "/images/projects/mini-series/mini-expenses-tracker/IncomePage.jpeg",
      "/images/projects/mini-series/mini-expenses-tracker/ProfilePage.jpeg",
      "/images/projects/mini-series/mini-expenses-tracker/ThemeSelection.jpeg",
    ],
    description:
      "A simple and user-friendly personal finance web app that helps users track income, expenses, budgets and gain insights through real-time alerts and visual analytics.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "MongoDB", "NextAuth"],
    liveUrl: "https://mini-expenses-tracker.vercel.app/",
    note: "In order to have the full dashboard view, you need to create an account and sign in.",
  },
  {
    id: "02",
    category: "Mini Series",
    title: "Mini Dashboard",
    images: [
      "/images/projects/mini-series/mini-dashboard/1.png",
      "/images/projects/mini-series/mini-dashboard/2.png",
      "/images/projects/mini-series/mini-dashboard/3.png",
      "/images/projects/mini-series/mini-dashboard/4.png",
      "/images/projects/mini-series/mini-dashboard/5.png",
    ],
    description:
      "A modern personal dashboard web app that can manage tasks and take notes.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "local storage"],
    liveUrl: "https://mini-dashboard-umber.vercel.app/",
    note: null,
  },
  {
    id: "03",
    category: "Mini Series",
    title: "Mini Weather",
    images: [
      "/images/projects/mini-series/mini-weather/HomePage.jpeg",
      "/images/projects/mini-series/mini-weather/WeatherPage.jpeg",
      "/images/projects/mini-series/mini-weather/AirQualityPage.jpeg",
    ],
    description:
      "A lightweight weather web app focused on API integration and backend-driven functionality, delivering real-time weather and air quality data.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "OpenWeather API", "AirVisual API", "Recharts"],
    liveUrl: "https://mini-weather-opal.vercel.app/",
    note: "API key is rate-limited. If the live demo returns no data, the limit may have been reached.",
  },
  {
    id: "04",
    category: "Mini Series",
    title: "Mini Subscription Manager",
    images: [
      "/images/projects/mini-series/mini-subscription-manager/1.png",
      "/images/projects/mini-series/mini-subscription-manager/2.png",
      "/images/projects/mini-series/mini-subscription-manager/3.png",
      "/images/projects/mini-series/mini-subscription-manager/4.png",
    ],
    description:
      "A subscription tracking app that helps users manage recurring payments, visualise spending, and get reminded before renewals.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "MongoDB", "NextAuth"],
    liveUrl: "#",
    note: "This web app is still under construction...",
  },
];

const WebDesignProject: Project[] = [
  {
    id: "01",
    category: "Web Design",
    title: "Pet Shop Website Design",
    images: [
      "/images/projects/web-design/pet-shop-landing/1.png",
      "/images/projects/web-design/pet-shop-landing/2.png",
      "/images/projects/web-design/pet-shop-landing/3.png",
      "/images/projects/web-design/pet-shop-landing/4.png",
      "/images/projects/web-design/pet-shop-landing/5.png",
      "/images/projects/web-design/pet-shop-landing/6.png",
    ],
    description:
      "A modern and visually appealing pet shop landing design concept to showcase premium UI design with smooth interactions and clean layout.",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "Lenis"],
    liveUrl: "https://pet-shop-web-template.vercel.app/",
    note: "This is a design-only project. The live demo is a static implementation of the Figma mockup.",
  },
  {
    id: "02",
    category: "Web Design",
    title: "Portfolio Landing Page",
    images: [
      "/images/projects/web-design/personal-portfolio-landing/1.png",
      "/images/projects/web-design/personal-portfolio-landing/2.png",
      "/images/projects/web-design/personal-portfolio-landing/3.png",
      "/images/projects/web-design/personal-portfolio-landing/4.png",
      "/images/projects/web-design/personal-portfolio-landing/5.png",
    ],
    description:
      "A personal portfolio landing page concept exploring typography-led design, smooth scroll interactions, and a bold dark aesthetic.",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
    liveUrl: "https://landing-page-design01.vercel.app/",
    note: null,
  },
];

export default function ProjectCarouselSection() {
  return (
    <section>
      <div id="mini-series" className="mt-20">
        <CategoryDivider title="Mini Series" index={1} count={MiniSeriesProject.length} />
        <ProjectCarousel projects={MiniSeriesProject} />
      </div>


      <div id="web-design">
        <CategoryDivider title="Web Design" index={2} count={WebDesignProject.length} />
        <ProjectCarousel projects={WebDesignProject} />
      </div>
    </section>
  )
}
