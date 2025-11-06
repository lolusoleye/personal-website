import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createFingerprint, getClientIP } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function POST(
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

  const ip = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || ''
  const fingerprint = createFingerprint(ip, userAgent, process.env.VIEW_FINGERPRINT_SALT!)

  // Check if already viewed (unique view)
  const { data: existingView } = await supabase
    .from('views')
    .select('id')
    .eq('post_id', post.id)
    .eq('fingerprint', fingerprint)
    .single()

  if (!existingView) {
    // Record unique view
    await supabase
      .from('views')
      .insert({
        post_id: post.id,
        fingerprint,
      })
    
    revalidatePath(`/blog/${params.slug}`)
  }
  
  return NextResponse.json({ success: true })
}

