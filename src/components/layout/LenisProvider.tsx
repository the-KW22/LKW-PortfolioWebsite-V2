'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger)

function LenisScrollTriggerSync() {
  const lenis = useLenis(() => {
    ScrollTrigger.update()
  })

  const pathname = usePathname()

  // Resize and refresh GSAP ScrollTrigger on route change
  useEffect(() => {
    const id = setTimeout(() => {
      lenis?.resize()
      ScrollTrigger.refresh()
    }, 300)
    return () => clearTimeout(id)
  }, [pathname, lenis])

  // Handle hash-anchor scroll and same-page back-to-top via history.pushState
  useEffect(() => {
    if (typeof window === 'undefined') return

    const origPushState = history.pushState

    history.pushState = function (this: History, ...args: Parameters<typeof history.pushState>) {
      const prevPathname = window.location.pathname
      origPushState.apply(this, args)

      setTimeout(() => {
        const hash = window.location.hash
        const nextPathname = window.location.pathname

        if (hash) {
          const target = document.querySelector(hash)
          if (target) {
            lenis?.scrollTo(target as HTMLElement, { offset: -80, immediate: false })
          }
        } else if (prevPathname === nextPathname) {
          // Same page, hash removed (e.g. /about-me#skills → /about-me) → scroll to top
          lenis?.scrollTo(0, { immediate: false, duration: 0.8 })
        }
      }, 300)
    }

    return () => {
      history.pushState = origPushState
    }
  }, [lenis])

  return null
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}
