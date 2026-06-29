interface Contribution {
  date: string
  count: number
  level: number
}

function buildWeeks(contributions: Contribution[]) {
  if (contributions.length === 0) return []

  const first = new Date(`${contributions[0].date}T00:00:00`)
  const weeks: (Contribution | null)[][] = []
  let currentWeek: (Contribution | null)[] = Array(first.getDay()).fill(null)

  for (const day of contributions) {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null)
    weeks.push(currentWeek)
  }

  return weeks
}

async function getContributions(username: string): Promise<Contribution[] | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return Array.isArray(data.contributions) ? data.contributions : null
  } catch {
    return null
  }
}

export default async function ContributionGraph({ username }: { username: string }) {
  const contributions = await getContributions(username)
  if (!contributions) return null

  const weeks = buildWeeks(contributions)
  if (weeks.length === 0) return null

  return (
    <div
      className="contrib-graph"
      role="img"
      aria-label="GitHub contribution activity for the past year"
    >
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="contrib-week">
          {week.map((day, dayIndex) =>
            day ? (
              <span
                key={day.date}
                className="contrib-day"
                data-level={Math.min(day.level, 4)}
                title={`${day.count} contributions on ${day.date}`}
              />
            ) : (
              <span key={`empty-${weekIndex}-${dayIndex}`} className="contrib-day contrib-empty" />
            )
          )}
        </div>
      ))}
    </div>
  )
}
