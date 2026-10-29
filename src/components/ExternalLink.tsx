import type { ReactNode } from 'react'

type ExternalLinkProps = {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  ariaLabel?: string
}

export function ExternalLink({
  href,
  children,
  className,
  onClick,
  ariaLabel,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
