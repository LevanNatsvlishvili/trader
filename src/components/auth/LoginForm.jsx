'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login } from '@/lib/authActions.js'
import AuthCard from './AuthCard.jsx'

export default function LoginForm({ callbackUrl }) {
  const [state, formAction, pending] = useActionState(login, null)

  return (
    <AuthCard
      title="Sign in"
      subtitle="Welcome back. Sign in to view your journal."
      footer={
        <>
          No account yet? <Link href="/register">Create one</Link>
        </>
      }
    >
      <form action={formAction} className="auth-form">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <label className="auth-field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            defaultValue={state?.values?.email}
            required
            autoFocus
          />
        </label>
        <label className="auth-field">
          <span>Password</span>
          <input type="password" name="password" autoComplete="current-password" required />
        </label>
        {state?.error ? (
          <p className="auth-error" role="alert">
            {state.error}
          </p>
        ) : null}
        <button type="submit" className="auth-submit" disabled={pending}>
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthCard>
  )
}
