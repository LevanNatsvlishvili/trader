'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { register } from '@/lib/authActions.js'
import AuthCard from './AuthCard.jsx'

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, null)

  return (
    <AuthCard
      title="Create account"
      subtitle="Registration is limited to approved emails."
      footer={
        <>
          Already have an account? <Link href="/login">Sign in</Link>
        </>
      }
    >
      <form action={formAction} className="auth-form">
        <label className="auth-field">
          <span>Name</span>
          <input type="text" name="name" autoComplete="name" defaultValue={state?.values?.name} />
        </label>
        <label className="auth-field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            defaultValue={state?.values?.email}
            required
          />
        </label>
        <label className="auth-field">
          <span>Password</span>
          <input type="password" name="password" autoComplete="new-password" minLength={8} required />
        </label>
        <label className="auth-field">
          <span>Confirm password</span>
          <input type="password" name="confirm" autoComplete="new-password" minLength={8} required />
        </label>
        {state?.error ? (
          <p className="auth-error" role="alert">
            {state.error}
          </p>
        ) : null}
        <button type="submit" className="auth-submit" disabled={pending}>
          {pending ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthCard>
  )
}
