export function normalizeEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

export function isEmailAllowed(email) {
  const allowed = (process.env.ALLOWED_EMAILS ?? '').split(',').map(normalizeEmail).filter(Boolean)
  return allowed.includes(normalizeEmail(email))
}
