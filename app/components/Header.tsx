'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Ire Soleye home">
          Ire Soleye
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link href={isHome ? "#about" : "/#about"}>About</Link>
          <Link href={isHome ? "#projects" : "/#projects"}>Projects</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  )
}

