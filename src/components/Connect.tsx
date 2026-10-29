import { ArrowUpRight, Mail } from 'lucide-react'
import { siteLinks } from '../lib/site'
import { ExternalLink } from './ExternalLink'
import { Reveal } from './Reveal'

const elsewhere = [
  { label: 'Blog', note: 'The journal', href: siteLinks.blog, external: true },
  { label: 'GitHub', note: 'Code & experiments', href: siteLinks.github, external: true },
  { label: 'X', note: 'Notes in public', href: siteLinks.x, external: true },
] as const

export function Connect() {
  return (
    <section
      id="connect"
      aria-labelledby="connect-title"
      className="relative py-20 md:py-28"
    >
      <div className="shell">
        <Reveal>
          <div className="status-panel">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <p className="eyebrow">
                  <span className="status-dot status-dot--static" aria-hidden="true" />
                  Currently
                </p>
                <h2 id="connect-title" className="section-title mt-5 max-w-[16ch]">
                  Full portfolio
                  <br />
                  <em>in development.</em>
                </h2>
                <p className="section-lede mt-6 max-w-[52ch]">
                  Case studies, project context and evidence are being prepared in ShowCase Me, the
                  portfolio workspace behind Naj Builds.
                </p>
                <p className="mt-4 text-sm text-faint">
                  Until then, the journal and code are open.
                </p>
              </div>

              <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-10">
                <p className="eyebrow">Elsewhere</p>
                <ul className="connect-list mt-5">
                  {elsewhere.map((item) => (
                    <li key={item.label}>
                      <ExternalLink href={item.href} className="connect-link">
                        <span className="flex min-w-0 items-baseline gap-3">
                          <span className="connect-label">{item.label}</span>
                          <span className="connect-note">{item.note}</span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="connect-arrow h-4 w-4 shrink-0"
                          strokeWidth={1.6}
                        />
                      </ExternalLink>
                    </li>
                  ))}
                  <li>
                    <a href={siteLinks.email} className="connect-link">
                      <span className="flex min-w-0 items-baseline gap-3">
                        <span className="connect-label">Email</span>
                        <span className="connect-note">contact@najbuilds.com</span>
                      </span>
                      <Mail
                        aria-hidden="true"
                        className="connect-arrow h-4 w-4 shrink-0"
                        strokeWidth={1.6}
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-faint sm:flex-row sm:items-center sm:justify-between">
              <p>ShowCase Me — portfolio &amp; evidence workspace</p>
              <p className="flex items-center gap-2 text-faint">
                <span className="eyebrow-dot" aria-hidden="true" />
                In development
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
