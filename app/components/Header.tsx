'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  const handleAnchorClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault()
    const id = hash.replace('#', '')

    if (isHome) {
      // If we're already on the home page, scroll to the section smoothly
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        // update the hash in the URL without causing a navigation
        history.replaceState(null, '', `#${id}`)
        return
      }
      // fallback: set location hash
      window.location.hash = id
      return
    }

    // If we're on another page, perform a full navigation to root with the hash so
    // the browser performs a regular load and scrolls to the anchor reliably.
    // Using window.location is more robust for cross-page hash navigation.
    window.location.href = `/#${id}`
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Ire Soleye home">
          Ire Soleye
        </Link>
        <nav className="nav" aria-label="Primary">
          <a href={isHome ? '#projects' : '/#projects'} onClick={(e) => handleAnchorClick(e, '#projects')}>Projects</a>
          <Link href="/blog">Notes</Link>
        </nav>
      </div>
    </header>
  )
}

