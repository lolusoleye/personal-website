'use client'

import { useEffect, useState } from 'react'

interface Repo {
  name: string
  html_url: string
  updated_at: string
  fork: boolean
  archived: boolean
}

export default function ProjectsGrid() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const username = 'lolusoleye'
        const EXCLUDED_REPOS = new Set(['personal-website'])
        const perPage = 100
        let page = 1
        let all: Repo[] = []

        while (page < 11) {
          const endpoint = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&page=${page}&sort=updated`
          const res = await fetch(endpoint, { headers: { 'Accept': 'application/vnd.github+json' } })
          if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
          const data = await res.json()
          if (!Array.isArray(data) || data.length === 0) break
          all = all.concat(data)
          if (data.length < perPage) break
          page++
        }

        const filtered = all
          .filter(r => !r.fork && !r.archived && !EXCLUDED_REPOS.has((r.name || '').toLowerCase()))
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

        setRepos(filtered)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  if (loading) {
    return <p className="text-[var(--muted)]">Loading...</p>
  }

  if (!repos || repos.length === 0) {
    return null
  }

  return (
    <ul className="space-y-2">
      {repos.map((repo) => (
        <li key={repo.html_url}>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--accent)] text-sm">
            {repo.name}
          </a>
        </li>
      ))}
    </ul>
  )
}
