import { ArrowUpRight, Mail } from 'lucide-react'
import { brandAssets, type Theme } from '../lib/brand'
import { footerLinks, siteLinks } from '../lib/site'
import { ExternalLink } from './ExternalLink'

type FooterProps = {
  theme: Theme
}

const year = new Date().getFullYear()

export function Footer({ theme }: FooterProps) {
  return (
    <footer className="border-t border-line py-12 md:py-14">
      <div className="shell">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-16">
          <div>
            <a href="/" className="inline-flex items-center gap-3" aria-label="Naj Builds — home">
              <img
                src={brandAssets.horizontal[theme]}
                alt=""
                width={848}
                height={280}
                className="h-auto w-[11.25rem]"
              />
            </a>
            <p className="mt-5 max-w-[30ch] text-sm leading-relaxed text-muted">
              Built with curiosity. Tested with care. — CMN
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-20"
          >
            <div>
              <p className="footer-heading">Explore</p>
              <ul className="mt-5 space-y-3">
                {footerLinks.explore.map((item) => (
                  <li key={item.label}>
                    <ExternalLink href={item.href} className="footer-link group">
                      {item.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3 w-3 opacity-50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                        strokeWidth={1.8}
                      />
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="footer-heading">Contact</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a href={siteLinks.email} className="footer-link contact-play group">
                    contact@najbuilds.com
                    <Mail
                      aria-hidden="true"
                      className="h-3 w-3 opacity-50 transition-opacity duration-300 group-hover:opacity-100"
                      strokeWidth={1.8}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Naj Builds. All rights reserved.</p>
          <p>ShowCase Me — portfolio workspace in development.</p>
        </div>
      </div>
    </footer>
  )
}
