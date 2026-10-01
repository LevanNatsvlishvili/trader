import { redirect } from 'next/navigation'
import { auth } from '@/auth.js'
import AppShell from '@/components/layout/index.jsx'

export default async function AppLayout({ children }) {
  // Middleware already guards these routes; this is a second check at render time.
  const session = await auth()
  if (!session?.user) redirect('/login')

  const { name, email } = session.user
  return <AppShell user={{ name, email }}>{children}</AppShell>
}
