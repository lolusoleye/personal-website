import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import slugify from 'slugify'

export async function GET() {
  const supabase = createClient()
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  const session = await auth()
  
  if (!session?.user?.name || session.user.name !== process.env.ADMIN_GITHUB_USERNAME) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const body = await request.json()
  const { title, content, attachments } = body

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
  }

  const slug = slugify(title, { lower: true, strict: true })
  const supabase = createClient()

  const { data: post, error } = await supabase
    .from('posts')
    .insert({
      title,
      content,
      slug,
      attachments: attachments || [],
      author_github: session.user.name!,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  revalidatePath('/blog')
  
  return NextResponse.json(post)
}

