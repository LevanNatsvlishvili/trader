import { useEffect, useState } from 'react'
import FundedCharts from '@/components/charts/FundedCharts.jsx'
import { fetchTradeJournal } from '../lib/tradeJournal.js'

export default function Charts() {
  const [rows, setRows] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchTradeJournal()
        if (!cancelled) {
          setRows(data)
          setStatus('ready')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setStatus('error')
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="page">
      {status === 'loading' ? (
        <p className="py-24 text-center text-muted-foreground">Loading charts…</p>
      ) : null}
      {status === 'error' ? <p className="py-24 text-center text-muted-foreground">{error}</p> : null}
      {status === 'ready' ? <FundedCharts trades={rows} /> : null}
    </section>
  )
}
