import Header from './components/Header'
import Footer from './components/Footer'
import ProjectsGrid from './components/ProjectsGrid'

export default function Home() {
  return (
    <>
      <Header />
      <main id="home">
        <section className="hero">
          <div className="container">
            <h1 className="hero-title">Hi, I&apos;m Ire Soleye</h1>
            <p className="hero-subtitle">Computer Science student — building, learning, and sharing my projects.</p>
            <div className="hero-cta">
              <a className="btn" href="#about">About me</a>
              <a className="btn primary" href="#projects">View Projects</a>
              <a className="btn" href="/blog">Blog</a>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <h2>About</h2>
            <p>
              I&apos;m a computer science student with interests in algorithms, web development, and
              practical software engineering. I enjoy turning ideas into usable products and learning
              by building in public.
            </p>
            <p>
              Lately, I&apos;ve been focusing on creating clean, accessible user experiences and exploring
              systems fundamentals that make software reliable at scale.
            </p>
          </div>
        </section>

        <section id="projects" className="section alt">
          <div className="container">
            <h2>Projects</h2>
            <ProjectsGrid />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

