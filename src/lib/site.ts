export const siteLinks = {
  blog: 'https://najbuilds.hashnode.dev/',
  github: 'https://github.com/Mabel007',
  x: 'https://x.com/najbuilds',
  email: 'mailto:contact@najbuilds.com',
} as const

export const primaryNav = [
  { label: 'Blog', href: siteLinks.blog, external: true },
  { label: 'GitHub', href: siteLinks.github, external: true },
  { label: 'X', href: siteLinks.x, external: true },
] as const

export const practice = [
  {
    number: '01',
    title: 'Build',
    kicker: 'Frontend engineering',
    copy: 'Interfaces shaped around clarity, responsiveness and the small interactions that make a product feel considered.',
  },
  {
    number: '02',
    title: 'Validate',
    kicker: 'Quality assurance',
    copy: 'Quality treated as part of the build, not an afterthought — testing behaviour, edge cases and the details that earn trust.',
  },
  {
    number: '03',
    title: 'Ship',
    kicker: 'Delivery & documentation',
    copy: 'Delivering tested software with clear documentation, then sharing the decisions, process and lessons along the way.',
  },
] as const

export const footerLinks = {
  explore: [
    { label: 'Blog', href: siteLinks.blog, external: true },
    { label: 'GitHub', href: siteLinks.github, external: true },
    { label: 'X', href: siteLinks.x, external: true },
  ],
} as const
