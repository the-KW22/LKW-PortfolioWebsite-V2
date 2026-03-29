import {
    siReact, siNextdotjs, siTypescript, siJavascript, siHtml5, siCss,
    siTailwindcss, siGreensock, siFramer, siVite, siFigma,
    siNodedotjs, siPhp, siPython, siOpenjdk, siCplusplus,
    siMongodb, siMysql, siFirebase,
    siGit, siGithub, siVscodium, siPostman, siDocker, siVercel, siNetlify, siLinux, siNpm,
} from "simple-icons";
import { Marquee } from "../ui/marquee";

// REST APIs — custom SVG path
const restApiPath = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z";

// Spline — custom SVG path (bezier/curve icon)
const splinePath = "M21 7c0-2.21-1.79-4-4-4s-4 1.79-4 4c0 1.86 1.27 3.43 3 3.87V13c0 2.21-1.79 4-4 4s-4-1.79-4-4v-.13A4.01 4.01 0 0 0 7 9c0-2.21-1.79-4-4-4S-1 6.79-1 9s1.79 4 4 4c.35 0 .68-.05 1-.13V17c0 3.31 2.69 6 6 6s6-2.69 6-6v-2.13c1.73-.44 3-2.01 3-3.87zM3 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm14-2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z";

type SkillDef = { name: string; path: string };

const FRONTEND_SKILLS: SkillDef[] = [
    { name: "React",          path: siReact.path },
    { name: "Next.js",        path: siNextdotjs.path },
    { name: "TypeScript",     path: siTypescript.path },
    { name: "JavaScript",     path: siJavascript.path },
    { name: "HTML5",          path: siHtml5.path },
    { name: "CSS3",           path: siCss.path },
    { name: "Tailwind CSS",   path: siTailwindcss.path },
    { name: "GSAP",           path: siGreensock.path },
    { name: "Framer Motion",  path: siFramer.path },
    { name: "Vite",           path: siVite.path },
    { name: "Figma",          path: siFigma.path },
];

const BACKEND_SKILLS: SkillDef[] = [
    { name: "Node.js",   path: siNodedotjs.path },
    { name: "PHP",       path: siPhp.path },
    { name: "Python",    path: siPython.path },
    { name: "Java",      path: siOpenjdk.path },
    { name: "C++",       path: siCplusplus.path },
    { name: "REST APIs", path: restApiPath },
    { name: "MongoDB",   path: siMongodb.path },
    { name: "MySQL",     path: siMysql.path },
    { name: "Firebase",  path: siFirebase.path },
];

const TOOL_SKILLS: SkillDef[] = [
    { name: "Git",       path: siGit.path },
    { name: "GitHub",    path: siGithub.path },
    { name: "VS Code",   path: siVscodium.path },
    { name: "Postman",   path: siPostman.path },
    { name: "Docker",    path: siDocker.path },
    { name: "Vercel",    path: siVercel.path },
    { name: "Netlify",   path: siNetlify.path },
    { name: "Linux",     path: siLinux.path },
    { name: "npm / pnpm",path: siNpm.path },
    { name: "Spline",    path: splinePath },
];

function SkillPill({ name, path }: SkillDef) {
    return (
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#2A2A2A] bg-[#141414] text-sm font-medium text-[#A3A3A3] whitespace-nowrap cursor-default select-none transition-colors duration-200 hover:border-[#4A4A4A] hover:text-[#F5F5F5] group">
            <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 shrink-0 fill-[#555] group-hover:fill-[#CCC] transition-colors duration-200"
                aria-label={name}
            >
                <path d={path} />
            </svg>
            {name}
        </div>
    );
}

export default function SkillsMarquee() {
    return (
        <div className="relative w-full py-6 overflow-hidden">
            {/* Left fade edge */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-linear-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
            {/* Right fade edge */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-linear-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />

            <div className="flex flex-col gap-3">
                <Marquee pauseOnHover className="[--gap:0.75rem]">
                    {FRONTEND_SKILLS.map((skill) => (
                        <SkillPill key={skill.name} {...skill} />
                    ))}
                </Marquee>

                <Marquee pauseOnHover reverse className="[--gap:0.75rem]">
                    {BACKEND_SKILLS.map((skill) => (
                        <SkillPill key={skill.name} {...skill} />
                    ))}
                </Marquee>

                <Marquee pauseOnHover className="[--gap:0.75rem]">
                    {TOOL_SKILLS.map((skill) => (
                        <SkillPill key={skill.name} {...skill} />
                    ))}
                </Marquee>
            </div>
        </div>
    );
}
