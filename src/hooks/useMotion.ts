import { useState, useSyncExternalStore } from 'react'

const query = '(prefers-reduced-motion: reduce)'
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(query)
  media.addEventListener('change', notify)
  return () => media.removeEventListener('change', notify)
}
const snapshot = () => window.matchMedia(query).matches

export function useMotion() {
  const reduced = useSyncExternalStore(subscribe, snapshot, () => true)
  const [paused, setPaused] = useState(false)
  const [sequence, setSequence] = useState(0)
  return {
    reduced, paused, sequence,
    toggle: () => setPaused(value => !value),
    replay: () => {
      if (reduced) return
      setPaused(false)
      setSequence(value => value + 1)
    },
  }
}

export type Motion = ReturnType<typeof useMotion>
