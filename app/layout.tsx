import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ire Soleye',
  description: 'CS @ Warwick. Building software.',
  authors: [{ name: 'Ire Soleye' }],
  openGraph: {
    type: 'website',
    url: 'https://iresoleye.me/',
    title: 'Ire Soleye',
    description: 'CS @ Warwick. Building software.',
    siteName: 'Ire Soleye',
  },
  twitter: {
    card: 'summary',
    title: 'Ire Soleye',
    description: 'CS @ Warwick. Building software.',
  },
  alternates: {
    canonical: 'https://iresoleye.me/',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
