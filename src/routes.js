import { IconMarkets, IconOrders } from '@/components/icons/index.js'

export const APP_ROUTES = [
  { path: '/charts', label: 'Charts', icon: IconMarkets },
  { path: '/journal', label: 'Journal', icon: IconOrders },
]

export const DEFAULT_PATH = APP_ROUTES[0].path

export function getRoute(pathname) {
  return APP_ROUTES.find((route) => route.path === pathname) ?? APP_ROUTES[0]
}
