import FundedCharts from '@/components/charts/FundedCharts.jsx'
import { fetchTradeJournal } from '@/lib/tradeJournal.js'

export const dynamic = 'force-dynamic'

export default async function ChartsPage() {
  let rows = []
  let error = ''

  try {
    rows = await fetchTradeJournal()
  } catch (err) {
    error = err.message
  }

  return (
    <section className="page">
      {error ? <p className="py-24 text-center text-muted-foreground">{error}</p> : null}
      {!error ? <FundedCharts trades={rows} /> : null}
    </section>
  )
}
