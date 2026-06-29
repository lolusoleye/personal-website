import { createPublicClient } from '@/lib/supabase/server'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Link from 'next/link'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPage() {
  const supabase = createPublicClient()
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <>
      <Header />
      <main className="py-16">
        <div className="container">
          <h1 className="text-2xl font-normal mb-6">Notes</h1>
          {error ? (
            <p className="text-[var(--muted)]">Unable to load notes.</p>
          ) : !posts || posts.length === 0 ? (
            <p className="text-[var(--muted)]">No notes yet.</p>
          ) : (
            <ul className="space-y-1">
              {posts.map((post: any) => (
                <li key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="text-[var(--text)] hover:text-[var(--accent)]">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

