import type { Metadata } from "next";
import HomeClient from "@/components/layout/HomeClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://leowkaiwen.dev";

export const metadata: Metadata = {
  title: "Leow Kai Wen — Full Stack Developer",
  description:
    "Portfolio of Leow Kai Wen, a fresh graduate Full Stack Developer from Kuala Lumpur, Malaysia. Building modern web applications with Next.js, React, TypeScript, and Tailwind CSS.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Leow Kai Wen — Full Stack Developer",
    description:
      "Fresh graduate Full Stack Developer from Kuala Lumpur. Crafting responsive web apps, clean APIs, and modern digital experiences.",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Leow Kai Wen — Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leow Kai Wen — Full Stack Developer",
    description:
      "Fresh graduate Full Stack Developer from Kuala Lumpur. Crafting responsive web apps, clean APIs, and modern digital experiences.",
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function Home() {
  const sameAs: string[] = [];
  if (process.env.NEXT_PUBLIC_GITHUB_URL) sameAs.push(process.env.NEXT_PUBLIC_GITHUB_URL);
  if (process.env.NEXT_PUBLIC_LINKEDIN_URL) sameAs.push(process.env.NEXT_PUBLIC_LINKEDIN_URL);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Leow Kai Wen",
    url: siteUrl,
    email: "kwenleow@gmail.com",
    jobTitle: "Full Stack Developer",
    description:
      "Fresh graduate Full Stack Developer from Kuala Lumpur, Malaysia.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kuala Lumpur",
      addressCountry: "MY",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Full Stack Development",
    ],
    sameAs,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Leow Kai Wen Portfolio",
    url: siteUrl,
    author: {
      "@type": "Person",
      name: "Leow Kai Wen",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeClient />
    </>
  );
}
