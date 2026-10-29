import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()
const html = readFileSync(resolve(root, 'index.html'), 'utf8')

const localReferences = [
  '/favicon.ico',
  '/favicon.svg',
  '/favicon-16.png',
  '/favicon-32.png',
  '/favicon-48.png',
  '/favicon-64.png',
  '/apple-touch-icon-180.png',
  '/site.webmanifest',
  '/og/naj-og-1200x630.png',
]

const publicPath = (urlPath: string) => resolve(root, 'public', urlPath.replace(/^\//, ''))

describe('browser and platform metadata', () => {
  it('uses the approved public identity in author and structured metadata', () => {
    expect(html).toContain('name="author" content="Naj Builds"')
    const structured = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
    expect(structured).toBeDefined()
    const data = JSON.parse(structured!)
    expect(data.name).toBe('Naj Builds')
    expect(data.publisher.name).toBe('Chris')
    expect(data.url).toBe('https://najbuilds.com/')
  })

  it('references every supplied favicon, social image and manifest file', () => {
    for (const reference of localReferences) {
      expect(html).toContain(reference)
      expect(existsSync(publicPath(reference))).toBe(true)
    }
  })

  it('exposes Open Graph and X card metadata for the supplied social image', () => {
    expect(html).toContain('property="og:image" content="https://najbuilds.com/og/naj-og-1200x630.png"')
    expect(html).toContain('property="og:image:width" content="1200"')
    expect(html).toContain('property="og:image:height" content="630"')
    expect(html).toContain('name="twitter:card" content="summary_large_image"')
    expect(html).toContain('name="twitter:site" content="@najbuilds"')
    expect(html).toContain('name="twitter:image" content="https://najbuilds.com/og/naj-og-1200x630.png"')
  })

  it('keeps the web manifest valid and points at supplied app icons', () => {
    const manifest = JSON.parse(
      readFileSync(resolve(root, 'public/site.webmanifest'), 'utf8'),
    ) as {
      name: string
      display: string
      icons: Array<{ src: string; sizes: string; type: string; purpose?: string }>
    }

    expect(manifest.name).toBe('Naj Builds')
    expect(manifest.display).toBe('browser')
    expect(manifest.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ src: '/icons/icon-192.png', sizes: '192x192' }),
        expect.objectContaining({ src: '/icons/icon-512.png', sizes: '512x512' }),
        expect.objectContaining({
          src: '/icons/icon-512-maskable.png',
          sizes: '512x512',
          purpose: 'maskable',
        }),
      ]),
    )

    for (const icon of manifest.icons) {
      expect(existsSync(publicPath(icon.src))).toBe(true)
    }
  })
})
