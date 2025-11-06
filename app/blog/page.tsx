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
      <main className="section">
        <div className="container">
          <h1>Blog</h1>
          {error ? (
            <p className="muted">Unable to load posts right now. Please try again later.</p>
          ) : !posts || posts.length === 0 ? (
            <p className="muted">No posts yet. Check back soon!</p>
          ) : (
            <div className="projects-grid" style={{ marginTop: '2rem' }}>
              {posts.map((post: any) => (
                <article key={post.id} className="card">
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 className="card-title">{post.title}</h3>
                    <p className="card-body">
                      {post.content.length > 150 
                        ? post.content.substring(0, 150) + '...' 
                        : post.content}
                    </p>
                    <div className="meta">
                      <span className="badge">
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {post.attachments && post.attachments.length > 0 && (
                        <span className="badge">{post.attachments.length} attachment{post.attachments.length !== 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

