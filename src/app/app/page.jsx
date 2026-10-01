import { redirect } from 'next/navigation'
import { DEFAULT_PATH } from '@/routes.js'

export default function AppHome() {
  redirect(DEFAULT_PATH)
}
