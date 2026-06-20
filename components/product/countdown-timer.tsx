'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function getTimeLeft(target: number): TimeLeft {
  const diff = target - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  }
}

interface CountdownTimerProps {
  /** ISO date string for the drop */
  date: string
  labels: { days: string; hours: string; minutes: string; seconds: string }
}

export function CountdownTimer({ date, labels }: CountdownTimerProps) {
  const target = new Date(date).getTime()
  // Render zeros on the server / first paint, then hydrate to avoid mismatch.
  const [time, setTime] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(getTimeLeft(target))
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { value: time.days, label: labels.days },
    { value: time.hours, label: labels.hours },
    { value: time.minutes, label: labels.minutes },
    { value: time.seconds, label: labels.seconds },
  ]

  return (
    <div
      className="grid grid-cols-4 gap-2 sm:gap-3"
      role="timer"
      aria-live="off"
      suppressHydrationWarning
    >
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center justify-center border border-white/15 py-3 sm:py-4"
        >
          <span className="text-2xl sm:text-3xl font-light tabular-nums leading-none" suppressHydrationWarning>
            {mounted ? String(unit.value).padStart(2, '0') : '--'}
          </span>
          <span className="mt-1.5 text-[10px] tracking-[0.15em] uppercase text-white/40">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
