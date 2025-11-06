import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createFingerprint, getClientIP } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const supabase = createClient()
  
  // Get post by slug
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('id')
    .eq('slug', params.slug)
    .single()

  if (postError || !post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  // Get like count
  const { count: likeCount } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', post.id)

  // Get unique view count
  const { count: viewCount } = await supabase
    .from('views')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', post.id)

  // Check if current user has liked
  const ip = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || ''
  const fingerprint = createFingerprint(ip, userAgent, process.env.VIEW_FINGERPRINT_SALT!)
  
  const { data: like } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', post.id)
    .eq('fingerprint', fingerprint)
    .single()

  return NextResponse.json({
    likes: likeCount || 0,
    views: viewCount || 0,
    hasLiked: !!like,
  })
}

