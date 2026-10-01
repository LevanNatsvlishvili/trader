'use server'

import { headers } from 'next/headers'
import { AuthError } from 'next-auth'
import bcrypt from 'bcryptjs'
import { signIn } from '@/auth.js'
import { HOME_PATH } from '@/auth.config.js'
import { db } from '@/lib/db.js'
import { isEmailAllowed, normalizeEmail } from '@/lib/allowlist.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD = 8
// bcrypt ignores everything past 72 bytes
const MAX_PASSWORD = 72

function field(formData, name) {
  const value = formData.get(name)
  return typeof value === 'string' ? value : ''
}

// Keep only the path of a same-host callbackUrl, so it can't redirect off-site.
async function safeRedirect(value) {
  if (!value) return HOME_PATH
  const requestHeaders = await headers()
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host')
  try {
    const url = new URL(value, `http://${host}`)
    if (url.host !== host) return HOME_PATH
    return `${url.pathname}${url.search}`
  } catch {
    return HOME_PATH
  }
}

async function signInWithCredentials(email, password, redirectTo) {
  try {
    await signIn('credentials', { email, password, redirectTo })
  } catch (error) {
    if (error instanceof AuthError) return { error: 'Invalid email or password.', values: { email } }
    throw error
  }
}

export async function login(_prevState, formData) {
  const email = normalizeEmail(field(formData, 'email'))
  const password = field(formData, 'password')

  if (!email || !password) return { error: 'Enter your email and password.', values: { email } }

  return signInWithCredentials(email, password, await safeRedirect(field(formData, 'callbackUrl')))
}

export async function register(_prevState, formData) {
  const email = normalizeEmail(field(formData, 'email'))
  const name = field(formData, 'name').trim()
  const password = field(formData, 'password')
  const confirm = field(formData, 'confirm')
  const values = { email, name }

  if (!EMAIL_PATTERN.test(email)) return { error: 'Enter a valid email address.', values }
  if (!isEmailAllowed(email)) return { error: 'This email is not allowed to register.', values }
  if (password.length < MIN_PASSWORD) {
    return { error: `Password must be at least ${MIN_PASSWORD} characters.`, values }
  }
  if (new TextEncoder().encode(password).length > MAX_PASSWORD) {
    return { error: `Password must be at most ${MAX_PASSWORD} bytes.`, values }
  }
  if (password !== confirm) return { error: 'Passwords do not match.', values }

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) return { error: 'An account with this email already exists.', values }

  const passwordHash = await bcrypt.hash(password, 12)
  try {
    await db.user.create({ data: { email, name: name || null, passwordHash } })
  } catch (error) {
    if (error?.code === 'P2002') return { error: 'An account with this email already exists.', values }
    throw error
  }

  return signInWithCredentials(email, password, HOME_PATH)
}
