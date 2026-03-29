'use client'

import React from 'react'
import { Film, Music2, Plane, Zap, Sparkles, Star, Circle, Trophy, Coffee, Headphones } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type FloatEntry = {
    icon: LucideIcon
    size: number
    animClass: string
    delay: string
    pos: React.CSSProperties
    rStart?: string
    rEnd?: string
}

const ITEMS: FloatEntry[] = [
    { icon: Film,       size: 110, animClass: 'animate-float-slow', delay: '0s',   rStart: '-5deg', rEnd: '3deg',  pos: { top: '6%',    left: '3%'   } },
    { icon: Music2,     size: 80,  animClass: 'animate-float-med',  delay: '1.5s', rStart: '4deg',  rEnd: '-3deg', pos: { top: '5%',    right: '5%'  } },
    { icon: Plane,      size: 90,  animClass: 'animate-float-slow', delay: '0.6s', rStart: '-8deg', rEnd: '4deg',  pos: { top: '44%',   left: '1%'   } },
    { icon: Sparkles,   size: 64,  animClass: 'animate-float-fast', delay: '2s',   rStart: '6deg',  rEnd: '-5deg', pos: { top: '38%',   right: '2%'  } },
    { icon: Trophy,     size: 96,  animClass: 'animate-float-med',  delay: '0.3s', rStart: '-4deg', rEnd: '6deg',  pos: { bottom: '9%', left: '5%'   } },
    { icon: Coffee,     size: 58,  animClass: 'animate-float-slow', delay: '3s',   rStart: '2deg',  rEnd: '-7deg', pos: { bottom: '8%', right: '4%'  } },
    { icon: Zap,        size: 70,  animClass: 'animate-float-fast', delay: '1s',   rStart: '-3deg', rEnd: '5deg',  pos: { top: '65%',   left: '26%'  } },
    { icon: Star,       size: 50,  animClass: 'animate-float-med',  delay: '2.5s', rStart: '7deg',  rEnd: '-3deg', pos: { top: '18%',   left: '22%'  } },
    { icon: Circle,     size: 44,  animClass: 'animate-float-slow', delay: '1.8s', rStart: '-6deg', rEnd: '2deg',  pos: { top: '55%',   right: '18%' } },
    { icon: Headphones, size: 72,  animClass: 'animate-float-med',  delay: '0.9s', rStart: '3deg',  rEnd: '-6deg', pos: { top: '20%',   right: '22%' } },
]

export default function FloatingHobbyBg() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {ITEMS.map(({ icon: Icon, size, animClass, delay, pos, rStart = '0deg', rEnd = '0deg' }, i) => (
                <div
                    key={i}
                    className={`absolute ${animClass}`}
                    style={{
                        ...pos,
                        animationDelay: delay,
                        '--float-r-start': rStart,
                        '--float-r-end': rEnd,
                    } as React.CSSProperties}
                >
                    <Icon size={size} strokeWidth={0.6} className="text-foreground opacity-[0.1]" />
                </div>
            ))}
        </div>
    )
}
