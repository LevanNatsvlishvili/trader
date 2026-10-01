import { redirect } from 'next/navigation'
import { HOME_PATH } from '@/auth.config.js'

export default function Home() {
  redirect(HOME_PATH)
}
