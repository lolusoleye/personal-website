import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import slugify from 'slugify'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json(post)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  
  if (!session?.user?.name || session.user.name !== process.env.ADMIN_GITHUB_USERNAME) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const body = await request.json()
  const { title, content, attachments } = body

  const supabase = createClient()
  const updates: any = { updated_at: new Date().toISOString() }

  if (title) {
    updates.title = title
    updates.slug = slugify(title, { lower: true, strict: true })
  }
  if (content !== undefined) updates.content = content
  if (attachments !== undefined) updates.attachments = attachments

  const { data: post, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', params.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  
  return NextResponse.json(post)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  
  if (!session?.user?.name || session.user.name !== process.env.ADMIN_GITHUB_USERNAME) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const supabase = createClient()

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  revalidatePath('/blog')
  
  return NextResponse.json({ success: true })
}

