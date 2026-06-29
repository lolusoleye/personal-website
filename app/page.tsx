import ContributionGraph from './components/ContributionGraph'

const GITHUB = 'https://github.com/lolusoleye'
const LINKEDIN = 'https://www.linkedin.com/in/iresoleye'
const EMAIL = 'mailto:ire@iresoleye.me'
const LEARNING_REPO = 'https://github.com/lolusoleye/learning-repository'

function InlineLinks() {
  return (
    <>
      <a href={GITHUB}>GitHub</a>
      <span className="sep" aria-hidden="true">
        {' '}
        ·{' '}
      </span>
      <a href={LINKEDIN}>LinkedIn</a>
      <span className="sep" aria-hidden="true">
        {' '}
        ·{' '}
      </span>
      <a href={EMAIL}>Email</a>
    </>
  )
}

export default function Home() {
  return (
    <main className="page">
      <header className="hero">
        <h1>Ire Soleye</h1>
        <p className="lead">CS @ Warwick. Building software.</p>
        <p className="links">
          <InlineLinks />
        </p>
      </header>

      <section className="section" aria-labelledby="work-heading">
        <h2 id="work-heading">Work</h2>
        <article className="work-item">
          <h3>Learning Repository</h3>
          <p>
            A collection of small systems built while learning computer science
            fundamentals.
          </p>
          <p>
            <a href={LEARNING_REPO}>GitHub repository</a>
          </p>
          <p className="muted small">continuously updated</p>
        </article>
      </section>

      <section className="section" aria-labelledby="activity-heading">
        <h2 id="activity-heading">Activity</h2>
        <ContributionGraph username="lolusoleye" />
      </section>

      <section className="section philosophy" aria-label="Philosophy">
        <p>I care about building simple systems that work.</p>
        <p>Currently focused on fundamentals.</p>
      </section>

      <footer className="site-footer-minimal">
        <InlineLinks />
      </footer>
    </main>
  )
}
