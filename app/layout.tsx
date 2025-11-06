import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ire Soleye',
  description: 'Personal website of Ire Soleye — Computer Science student. About and Projects.',
  keywords: ['Ire Soleye', 'computer science', 'student', 'software developer', 'projects'],
  authors: [{ name: 'Ire Soleye' }],
  openGraph: {
    type: 'website',
    url: 'https://iresoleye.me/',
    title: 'Ire Soleye',
    description: 'Personal website of Ire Soleye — Computer Science student. About and Projects.',
    siteName: 'Ire Soleye',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ire Soleye',
    description: 'Personal website of Ire Soleye — Computer Science student. About and Projects.',
  },
  themeColor: '#0f172a',
  alternates: {
    canonical: 'https://iresoleye.me/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

