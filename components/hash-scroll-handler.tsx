"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

function getCurrentHash() {
  const hash = window.location.hash.slice(1)

  if (!hash) return ""

  try {
    return decodeURIComponent(hash)
  } catch {
    return hash
  }
}

function scrollToCurrentHash() {
  const hash = getCurrentHash()

  if (!hash) return false

  const element = document.getElementById(hash)

  if (!element) return false

  element.scrollIntoView({ behavior: "smooth", block: "start" })
  return true
}

export function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    const timeouts: number[] = []

    const scheduleHashScroll = () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout))
      timeouts.length = 0

      if (!window.location.hash) return

      const retryDelays = [0, 100, 300]

      retryDelays.forEach((delay) => {
        timeouts.push(window.setTimeout(scrollToCurrentHash, delay))
      })
    }

    scheduleHashScroll()
    window.addEventListener("hashchange", scheduleHashScroll)

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout))
      window.removeEventListener("hashchange", scheduleHashScroll)
    }
  }, [pathname])

  return null
}
