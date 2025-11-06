'use client'

import { useEffect, useState } from 'react'

interface Repo {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
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
    return <p className="muted">Loading projects...</p>
  }

  if (!repos || repos.length === 0) {
    return <p className="muted">No repositories to show yet.</p>
  }

  return (
    <div className="projects-grid">
      {repos.map((repo) => (
        <article key={repo.html_url} className="card">
          <h3 className="card-title">{repo.name}</h3>
          <p className="card-body">{repo.description || 'No description provided.'}</p>
          <div className="meta">
            {repo.language && <span className="badge">{repo.language}</span>}
            <span className="badge">★ {repo.stargazers_count || 0}</span>
            <span className="badge">Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
          <div className="card-actions">
            <a className="link" href={repo.html_url} target="_blank" rel="noopener noreferrer">
              Repository
            </a>
            {repo.homepage && (
              <a className="link" href={repo.homepage} target="_blank" rel="noopener noreferrer">
                Demo
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

