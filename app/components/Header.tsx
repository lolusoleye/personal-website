import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Ire Soleye home">
          Ire Soleye
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link href="#about">About</Link>
          <Link href="#projects">Projects</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  )
}

