import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../lib/brand'

type ThemeToggleProps = {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      className="icon-button group"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        {theme === 'dark' ? (
          <Sun
            key="sun"
            aria-hidden="true"
            className="theme-icon h-4 w-4 transition-transform duration-500 group-hover:rotate-45"
            strokeWidth={1.6}
          />
        ) : (
          <Moon
            key="moon"
            aria-hidden="true"
            className="theme-icon h-4 w-4 transition-transform duration-500 group-hover:-rotate-12"
            strokeWidth={1.6}
          />
        )}
      </span>
    </button>
  )
}
