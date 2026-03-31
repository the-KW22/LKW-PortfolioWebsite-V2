import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import { PageTransitionProvider } from "@/components/layout/PageTransitionProvider";
import { cn } from "@/lib/utils";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { SpeedInsights } from '@vercel/speed-insights/next';

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});


const chromaSans = localFont({
  src: [
    { path: "../../public/font/chroma-sans-font/ChromaSans-Thin.otf", weight: "100" },
    { path: "../../public/font/chroma-sans-font/ChromaSans-ExtraLight.otf", weight: "200" },
    { path: "../../public/font/chroma-sans-font/ChromaSans-Light.otf", weight: "300" },
    { path: "../../public/font/chroma-sans-font/ChromaSans-Regular.otf", weight: "400" },
    { path: "../../public/font/chroma-sans-font/ChromaSans-Medium.otf", weight: "500" },
    { path: "../../public/font/chroma-sans-font/ChromaSans-Bold.otf", weight: "700" },
    { path: "../../public/font/chroma-sans-font/ChromaSans-UltraBold.otf", weight: "800" },
    { path: "../../public/font/chroma-sans-font/ChromaSans-Black.otf", weight: "900" },
  ],
  variable: "--font-chroma",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://leowkaiwen.dev";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Leow Kai Wen — Full Stack Developer",
    template: "%s | Leow Kai Wen",
  },
  description:
    "Portfolio of Leow Kai Wen, a fresh graduate Full Stack Developer from Kuala Lumpur, Malaysia.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Kuala Lumpur",
    "Malaysia",
    "Junior Developer",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Leow Kai Wen", url: siteUrl }],
  creator: "Leow Kai Wen",
  icons: {
    icon: [
      { url: "/icons/kw22-logo-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/kw22-logo-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/icons/kw22-logo.ico",
  },
  openGraph: {
    siteName: "Leow Kai Wen Portfolio",
    locale: "en_MY",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        nunitoSans.variable,
        chromaSans.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <PageTransitionProvider>
          <Nav />

          <LenisProvider>
            {children}
          </LenisProvider>
          
          <Footer />
        </PageTransitionProvider>

        <SpeedInsights />
      </body>
    </html>
  );
}
