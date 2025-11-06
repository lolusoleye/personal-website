import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
  const session = await auth()
  
  if (!session?.user?.name || session.user.name !== process.env.ADMIN_GITHUB_USERNAME) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Validate file size (10MB max)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 })
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'video/mp4', 'video/webm']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'File type not allowed' }, { status: 400 })
  }

  const supabase = createClient()
  const bucket = process.env.ATTACHMENTS_BUCKET || 'attachments'
  
  // Generate unique filename
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(2, 15)
  const extension = file.name.split('.').pop()
  const fileName = `${timestamp}-${randomStr}.${extension}`

  // Convert file to buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)

  // Get file metadata (for images)
  let width: number | undefined
  let height: number | undefined
  
  if (file.type.startsWith('image/')) {
    // For images, we'll get dimensions from the client side
    // For now, we'll return the URL and let client handle it
  }

  return NextResponse.json({
    url: publicUrl,
    type: file.type,
    size: file.size,
    name: file.name,
    width,
    height,
  })
}

