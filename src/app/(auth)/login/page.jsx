import LoginForm from '@/components/auth/LoginForm.jsx'

export const metadata = { title: 'Sign in · Trader Admin' }

export default async function LoginPage({ searchParams }) {
  const { callbackUrl } = await searchParams
  return <LoginForm callbackUrl={typeof callbackUrl === 'string' ? callbackUrl : ''} />
}
