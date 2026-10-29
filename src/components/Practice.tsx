import { Reveal } from './Reveal'
import { useState } from 'react'
import type { Motion } from '../hooks/useMotion'
import { practice } from '../lib/site'

function PracticeMotif({ title, motion }: { title: string; motion: Motion }) {
  const [take, setTake] = useState(0)
  return <div className="practice-playground">
    <div key={`${motion.sequence}-${take}`} className={`motif motif--${title.toLowerCase()}`} aria-hidden="true">
      {title === 'Build' ? <><span className="mini-toolbar"><i /><i /><i /></span><span className="mini-sidebar" /><span className="mini-content" /><span className="mini-tile" /></> : title === 'Validate' ? <><span className="inspection-line" /><span className="inspection-check">✓</span><span className="inspection-dots">···</span></> : <><span className="delivery-track" /><span className="delivery-box">↑</span><span className="delivery-target">◎</span></>}
    </div>
    <button type="button" className="motion-control motif-control" disabled={motion.reduced || motion.paused} onClick={() => setTake(value => value + 1)} aria-label={`Play ${title} illustration`}>Try {title} <span aria-hidden="true">↗</span></button>
  </div>
}

export function Practice({ motion }: { motion: Motion }) {
  return (
    <section
      id="practice"
      aria-labelledby="practice-title"
      className="relative border-b border-line py-20 md:py-28"
    >
      <div className="shell">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <p className="eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              The practice
            </p>
            <h2 id="practice-title" className="section-title mt-5">
              Three verbs.
              <br />
              <em>One standard.</em>
            </h2>
          </div>
          <p className="section-lede md:col-span-5 md:justify-self-end md:pb-1">
            A simple working method for turning ideas into dependable interfaces — and sharing what
            the process teaches along the way.
          </p>
        </Reveal>

        <div className="practice-grid mt-14 md:mt-16">
          {practice.map((item) => (
              <article key={item.title} className="practice-card group">
                <span className="practice-index" aria-hidden="true">
                  {item.number}
                </span>
                <h3 className="practice-title mt-7">{item.title}</h3>
                <p className="practice-kicker mt-2">{item.kicker}</p>
                <p className="practice-copy mt-6">{item.copy}</p>
                <PracticeMotif title={item.title} motion={motion} />
              </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-faint">Small illustrations of the process. The real work is still taking shape.</p>
      </div>
    </section>
  )
}
