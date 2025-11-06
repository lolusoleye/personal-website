'use client'

import { useEffect, useState } from 'react'

interface Stats {
  likes: number
  views: number
  hasLiked: boolean
}

export default function BlogPostClient({ slug }: { slug: string }) {
  const [stats, setStats] = useState<Stats>({ likes: 0, views: 0, hasLiked: false })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load stats
    const loadStats = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}/stats`)
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    // Record view
    const recordView = async () => {
      try {
        await fetch(`/api/posts/${slug}/view`, { method: 'POST' })
        // Reload stats after recording view
        loadStats()
      } catch (err) {
        console.error(err)
      }
    }

    loadStats()
    recordView()
  }, [slug])

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/posts/${slug}/like`, { method: 'POST' })
      if (res.ok) {
        // Reload stats
        const statsRes = await fetch(`/api/posts/${slug}/stats`)
        if (statsRes.ok) {
          const data = await statsRes.json()
          setStats(data)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="blog-stats">
      <div className="blog-stats-item">
        <button
          onClick={handleLike}
          className={`like-button ${stats.hasLiked ? 'liked' : ''}`}
          aria-label={stats.hasLiked ? 'Unlike this post' : 'Like this post'}
        >
          {stats.hasLiked ? '❤️' : '🤍'} {stats.likes}
        </button>
      </div>
      <div className="blog-stats-item">
        👁️ {stats.views} {stats.views === 1 ? 'view' : 'views'}
      </div>
    </div>
  )
}

