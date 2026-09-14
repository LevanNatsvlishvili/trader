import { IconDashboard, IconMarkets, IconOrders, IconPositions, IconSettings, IconTraders } from '../icons/index.js'

export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: IconDashboard },
  { path: '/charts', label: 'Charts', icon: IconMarkets },
  { path: '/journal', label: 'Journal', icon: IconOrders },
  { path: '/orders', label: 'Orders', icon: IconOrders },
  { path: '/positions', label: 'Positions', icon: IconPositions },
  { path: '/traders', label: 'Traders', icon: IconTraders },
  { path: '/settings', label: 'Settings', icon: IconSettings },
]

export function getNavItem(pathname) {
  return NAV_ITEMS.find((item) => item.path === pathname) ?? NAV_ITEMS[0];
}
