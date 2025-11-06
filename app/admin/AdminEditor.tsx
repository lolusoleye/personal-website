'use client'

import { useState, useRef, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface Attachment {
  url: string
  type: string
  name: string
  size?: number
  width?: number
  height?: number
}

export default function AdminEditor() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleFileUpload = async (file: File) => {
    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await res.json()
      
      // For images, get dimensions from the image
      let width: number | undefined
      let height: number | undefined
      
      if (data.type?.startsWith('image/')) {
        const img = new Image()
        img.src = data.url
        await new Promise((resolve, reject) => {
          img.onload = () => {
            width = img.width
            height = img.height
            resolve(null)
          }
          img.onerror = reject
        })
      }

      setAttachments(prev => [...prev, {
        url: data.url,
        type: data.type,
        name: data.name || file.name,
        size: data.size,
        width,
        height,
      }])
    } catch (err: any) {
      setError(err.message || 'Failed to upload file')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      Array.from(files).forEach(file => handleFileUpload(file))
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      Array.from(files).forEach(file => handleFileUpload(file))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          attachments,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create post')
      }

      const post = await res.json()
      router.push(`/blog/${post.slug}`)
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to create post')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {error && (
        <div style={{ 
          padding: '1rem', 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          color: '#ef4444'
        }}>
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
          placeholder="Enter post title..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="content" className="form-label">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-textarea"
          required
          placeholder="Write your post content..."
          rows={10}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Attachments</label>
        <div
          className={`file-upload-area ${dragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <p>📎 Click or drag files here to upload</p>
          <p className="muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Images, videos, PDFs (max 10MB each)
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,application/pdf"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {uploading && (
          <p className="muted" style={{ marginTop: '1rem' }}>Uploading...</p>
        )}

        {attachments.length > 0 && (
          <div className="attachments-preview">
            {attachments.map((attachment, index) => (
              <div key={index} className="attachment-preview-item">
                {attachment.type.startsWith('image/') ? (
                  <img src={attachment.url} alt={attachment.name} />
                ) : attachment.type.startsWith('video/') ? (
                  <video src={attachment.url} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ 
                    width: '100%', 
                    height: '150px', 
                    background: 'var(--surface)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid color-mix(in srgb, var(--muted) 20%, transparent)'
                  }}>
                    📄 {attachment.name}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  aria-label="Remove attachment"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button
          type="submit"
          className="btn primary"
          disabled={saving || uploading}
        >
          {saving ? 'Publishing...' : 'Publish Post'}
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => router.push('/blog')}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

