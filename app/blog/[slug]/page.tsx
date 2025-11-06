import { createPublicClient } from '@/lib/supabase/server'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BlogPostClient from './BlogPostClient'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 60

async function getPost(slug: string) {
  const supabase = createPublicClient()
  
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !post) {
    return null
  }

  return post
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Ire Soleye`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="blog-post">
        <article>
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            Posted on {new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
            {post.created_at !== post.updated_at && (
              <> • Updated {new Date(post.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</>
            )}
          </div>
          
          <div 
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />

          {post.attachments && post.attachments.length > 0 && (
            <div className="blog-post-attachments">
              <h3>Attachments</h3>
              {post.attachments.map((attachment: any, index: number) => (
                <div key={index} className="attachment-image">
                  {attachment.type?.startsWith('image/') ? (
                    <img 
                      src={attachment.url} 
                      alt={attachment.name || `Attachment ${index + 1}`}
                      className="attachment-image"
                      loading="lazy"
                    />
                  ) : attachment.type?.startsWith('video/') ? (
                    <video 
                      src={attachment.url} 
                      controls
                      className="attachment-image"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <a 
                      href={attachment.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="attachment-file"
                    >
                      📎 {attachment.name || `Attachment ${index + 1}`}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          <BlogPostClient slug={params.slug} />
        </article>
      </main>
      <Footer />
    </>
  )
}

