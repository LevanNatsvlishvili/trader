import { IconMarkets, IconOrders } from './components/icons/index.js'
import Charts from './pages/charts.jsx'
import Journal from './pages/journal.jsx'

export const APP_ROUTES = [
  { path: '/charts', label: 'Charts', icon: IconMarkets, Component: Charts },
  { path: '/journal', label: 'Journal', icon: IconOrders, Component: Journal },
]

export const DEFAULT_PATH = APP_ROUTES[0].path

export function getRoute(pathname) {
  return APP_ROUTES.find((route) => route.path === pathname) ?? APP_ROUTES[0]
}
