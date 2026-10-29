import { ArrowUpRight, Mail, Menu, X as CloseIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { brandAssets, type Theme } from '../lib/brand'
import { primaryNav, siteLinks } from '../lib/site'
import { ExternalLink } from './ExternalLink'
import { ThemeToggle } from './ThemeToggle'

type HeaderProps = {
  theme: Theme
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  return (
    <header className="site-header">
      <div className="shell flex h-[76px] items-center justify-between gap-4 md:h-[88px]">
        <a href="/" className="brand-lockup shrink-0" aria-label="Naj Builds — home">
          <img
            src={brandAssets.horizontal[theme]}
            alt=""
            width={848}
            height={280}
            className="hidden h-auto w-[11.25rem] md:block"
          />
          <img
            src={brandAssets.horizontalCompact[theme]}
            alt=""
            width={848}
            height={280}
            className="h-auto w-[10rem] md:hidden"
          />
        </a>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <nav aria-label="Primary" className="hidden items-center md:flex">
            {primaryNav.map((item) => (
              <ExternalLink key={item.label} href={item.href} className="nav-link">
                {item.label}
                <ArrowUpRight
                  aria-hidden="true"
                  className="nav-link-icon h-3 w-3"
                  strokeWidth={1.8}
                />
              </ExternalLink>
            ))}
          </nav>

          <a href={siteLinks.email} className="btn btn--outline btn--sm hidden md:inline-flex">
            Say hello
            <Mail aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
          </a>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <button
            ref={menuButtonRef}
            type="button"
            className="icon-button md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <CloseIcon aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
            ) : (
              <Menu aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="mobile-nav absolute inset-x-0 top-full md:hidden">
          <nav aria-label="Mobile" className="shell py-3">
            {primaryNav.map((item) => (
              <ExternalLink
                key={item.label}
                href={item.href}
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
              </ExternalLink>
            ))}
            <a
              href={siteLinks.email}
              className="btn btn--primary mt-3 w-full"
              onClick={() => setMenuOpen(false)}
            >
              Say hello
              <Mail aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
