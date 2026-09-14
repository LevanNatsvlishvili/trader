import {
  IconDashboard,
  IconMarkets,
  IconOrders,
  IconPositions,
  IconSettings,
  IconTraders,
} from './icons.jsx'

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: IconDashboard },
  { id: 'markets', label: 'Markets', icon: IconMarkets },
  { id: 'orders', label: 'Orders', icon: IconOrders },
  { id: 'positions', label: 'Positions', icon: IconPositions },
  { id: 'traders', label: 'Traders', icon: IconTraders },
  { id: 'settings', label: 'Settings', icon: IconSettings },
]

export function getNavItem(id) {
  return NAV_ITEMS.find((item) => item.id === id)
}
