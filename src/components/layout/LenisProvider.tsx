'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

function LenisScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update()
  })

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

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
