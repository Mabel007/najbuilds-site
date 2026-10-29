import { ArrowUpRight, Mail, Pause, Play, RotateCcw } from 'lucide-react'
import { useRef, type CSSProperties, type PointerEvent } from 'react'
import { brandAssets, type Theme } from '../lib/brand'
import type { Motion } from '../hooks/useMotion'
import { siteLinks } from '../lib/site'
import { ExternalLink } from './ExternalLink'

function KineticText({ text }: { text: string }) {
  return <>{text.split(' ').map((word, wordIndex) => (
    <span className="kinetic-word" key={wordIndex}>
      {[...word].map((letter, index) => <span className="kinetic-letter" key={index} style={{
        '--letter': index + wordIndex * 4,
        '--tilt': `${(index % 3 - 1) * 18}deg`,
        '--scatter': `${(index % 3 - 1) * 8}px`,
      } as CSSProperties}>{letter}</span>)}{' '}
    </span>
  ))}</>
}

export function Hero({ theme, motion }: { theme: Theme; motion: Motion }) {
  const rings = useRef<HTMLDivElement>(null)
  const reset = () => {
    rings.current?.style.setProperty('--pointer-x', '0px')
    rings.current?.style.setProperty('--pointer-y', '0px')
  }
  const track = (event: PointerEvent<HTMLButtonElement>) => {
    if (motion.paused || motion.reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    rings.current?.style.setProperty('--pointer-x', `${Math.max(-9, Math.min(9, (event.clientX - rect.left - rect.width / 2) * .1))}px`)
    rings.current?.style.setProperty('--pointer-y', `${Math.max(-9, Math.min(9, (event.clientY - rect.top - rect.height / 2) * .1))}px`)
  }
  return (
    <section className="hero playful-hero relative overflow-hidden" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"><div className="hero-grid" /><div className="hero-glow" /></div>
      <div className="shell relative z-10 flex flex-col items-center pb-16 pt-10 text-center md:pb-20 md:pt-14">
        <p className="eyebrow intro-label">CMN / A LITTLE CURIOUS. ALWAYS BUILDING.</p>
        <button className="hero-mark mark-button" type="button" aria-label="Replay introduction and orbit" disabled={motion.reduced} onClick={motion.replay} onPointerMove={track} onPointerLeave={reset} onBlur={reset}>
          <div ref={rings} className="reactive-rings" aria-hidden="true">
            <span className="hero-orbit hero-orbit--outer" /><span className="hero-orbit hero-orbit--inner" /><span key={motion.sequence} className="hero-arc" /><span className="orbit-spark">+</span>
          </div>
          <img src={brandAssets.monogram[theme]} alt="" width={220} height={260} className="relative z-10 h-[4.5rem] w-auto md:h-[5.75rem]" />
        </button>
        <h1 id="hero-title" className="intro-title">
          <span className="sr-only">Hey, I'm Chris. Now watch what I build.</span>
          <span key={motion.sequence} aria-hidden="true" className="kinetic-heading">
            <span className="intro-first"><KineticText text="Hey, I'm Chris." /></span>
            <span className="intro-second"><KineticText text="Now watch what I build." /></span>
          </span>
        </h1>
        <p className="intro-principle">BUILD <span>•</span> VALIDATE <span>•</span> SHIP</p>
        <p className="hero-lede">Frontend engineering, quality assurance, technical stories and real-world projects.</p>
        <div className="hero-actions">
          <ExternalLink href={siteLinks.blog} className="btn btn--primary">Read the blog <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></ExternalLink>
          <a href={siteLinks.email} className="btn btn--outline">Get in touch <Mail aria-hidden="true" className="h-4 w-4" /></a>
        </div>
        <p className="hero-status"><span className="status-dot" aria-hidden="true" />Full portfolio in development.</p>
        <div className="motion-controls" role="group" aria-label="Animation controls">
          <button type="button" className="motion-control" onClick={motion.toggle} disabled={motion.reduced} aria-pressed={motion.paused}>
            {motion.paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}{motion.paused ? 'Resume motion' : 'Pause motion'}
          </button>
          <button type="button" className="motion-control" onClick={motion.replay} disabled={motion.reduced}><RotateCcw aria-hidden="true" />Replay intro</button>
        </div>
        <p className="motion-note">{motion.reduced ? 'Reduced motion is on. Enjoy the still version.' : motion.paused ? 'Motion paused. Replay starts a fresh introduction.' : 'A little motion, then stillness. Replay whenever you like.'}</p>
      </div>
    </section>
  )
}
