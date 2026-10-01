import { redirect } from 'next/navigation'
import { DEFAULT_PATH } from '@/routes.js'

export default function Home() {
  redirect(DEFAULT_PATH)
}
