import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('Naj Builds landing page', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.dataset.theme = 'dark'
  })

  it('renders the approved headline, supporting copy and portfolio status', () => {
    render(<App />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveAccessibleName("Hey, I'm Chris. Now watch what I build.")

    expect(
      screen.getByText(
        'Frontend engineering, quality assurance, technical stories and real-world projects.',
      ),
    ).toBeInTheDocument()

    expect(screen.getAllByText('Full portfolio in development.').length).toBeGreaterThan(0)
  })

  it('uses the supplied destinations for every primary channel', () => {
    render(<App />)

    const blogs = screen.getAllByRole('link', { name: /^Blog/ })
    const githubs = screen.getAllByRole('link', { name: /^GitHub/ })
    const xLinks = screen.getAllByRole('link', { name: /^X/ })
    const emails = screen.getAllByRole('link', { name: /Email|contact@najbuilds.com/i })

    expect(blogs.length).toBeGreaterThan(0)
    expect(githubs.length).toBeGreaterThan(0)
    expect(xLinks.length).toBeGreaterThan(0)
    expect(emails.length).toBeGreaterThan(0)

    for (const link of blogs) {
      expect(link).toHaveAttribute('href', 'https://najbuilds.hashnode.dev/')
      expect(link).toHaveAttribute('target', '_blank')
    }
    for (const link of githubs) {
      expect(link).toHaveAttribute('href', 'https://github.com/Mabel007')
    }
    for (const link of xLinks) {
      expect(link).toHaveAttribute('href', 'https://x.com/najbuilds')
    }
    for (const link of emails) {
      expect(link).toHaveAttribute('href', 'mailto:contact@najbuilds.com')
    }
  })

  it('switches branding between the approved dark and light logo variants', async () => {
    const user = userEvent.setup()
    render(<App />)

    const homeLinks = screen.getAllByRole('link', { name: 'Naj Builds — home' })
    const headerHome = homeLinks[0]
    const headerLogo = headerHome?.querySelector('img')
    expect(headerLogo?.getAttribute('src')).toContain('dark-mode')

    await user.click(screen.getByRole('button', { name: 'Switch to light theme' }))

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('naj-theme')).toBe('light')
    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' }),
    ).toBeInTheDocument()
    expect(headerHome?.querySelector('img')?.getAttribute('src')).toContain('light-mode')
  })
})


describe('motion and navigation regression checks', () => {
  afterEach(() => vi.restoreAllMocks())

  it('pauses all motion and replay resumes without losing control focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)
    await user.click(screen.getByRole('button', { name: 'Pause motion' }))
    expect(container.querySelector('.app-shell')).toHaveAttribute('data-paused', 'true')
    expect(screen.getByRole('button', { name: 'Play Build illustration' })).toBeDisabled()
    const oldLetters = container.querySelector('.kinetic-heading')
    const replay = screen.getByRole('button', { name: 'Replay intro' })
    await user.click(replay)
    expect(container.querySelector('.app-shell')).toHaveAttribute('data-paused', 'false')
    expect(container.querySelector('.kinetic-heading')).not.toBe(oldLetters)
    expect(replay).toHaveFocus()
    expect(screen.getByRole('button', { name: 'Play Build illustration' })).toBeEnabled()
  })

  it('closes the mobile disclosure with Escape and restores focus', async () => {
    const user = userEvent.setup()
    render(<App />)
    const trigger = screen.getByRole('button', { name: 'Open navigation menu' })
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveFocus()
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument()
  })

  it('respects reduced motion and keeps the introduction accessible', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(query => ({ media: query, matches: query.includes('prefers-reduced-motion'), onchange: null, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn() }))
    render(<App />)
    expect(screen.getByRole('button', { name: 'Replay intro' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Pause motion' })).toBeDisabled()
    expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName("Hey, I'm Chris. Now watch what I build.")
    expect(screen.getByText('Reduced motion is on. Enjoy the still version.')).toBeInTheDocument()
  })
})
