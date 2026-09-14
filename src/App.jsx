import { useState } from 'react'
import Layout from './components/layout/index.jsx'
import Dashboard from './pages/dashboard.jsx'
import Markets from './pages/markets.jsx'
import Orders from './pages/orders.jsx'
import Positions from './pages/positions.jsx'
import Traders from './pages/traders.jsx'
import Settings from './pages/settings.jsx'
import './App.css'

const PAGES = {
  dashboard: Dashboard,
  markets: Markets,
  orders: Orders,
  positions: Positions,
  traders: Traders,
  settings: Settings,
}

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [search, setSearch] = useState('')

  const Page = PAGES[currentPage] ?? Dashboard

  function handleNavigate(pageId) {
    setCurrentPage(pageId)
    setSearch('')
  }

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      search={search}
      onSearchChange={setSearch}
    >
      <Page query={search} />
    </Layout>
  )
}

export default App
