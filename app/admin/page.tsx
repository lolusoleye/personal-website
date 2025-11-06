import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AdminEditor from './AdminEditor'
import SignInButton from './SignInButton'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default async function AdminPage() {
  const session = await auth()

  if (!session || session.user?.name !== process.env.ADMIN_GITHUB_USERNAME) {
    return (
      <>
        <Header />
        <main>
          <SignInButton />
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <div className="admin-container">
          <h1>Admin - Create Post</h1>
          <p className="muted">Signed in as {session.user?.name}</p>
          <AdminEditor />
        </div>
      </main>
      <Footer />
    </>
  )
}

