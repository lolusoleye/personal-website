import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AdminEditor from './AdminEditor'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export default async function AdminPage() {
  const session = await auth()

  // If not logged in, redirect to sign in
  if (!session) {
    redirect('/api/auth/signin')
  }

  // If not admin, redirect to home
  if (session.user?.name !== process.env.ADMIN_GITHUB_USERNAME) {
    redirect('/')
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

