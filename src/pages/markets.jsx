import { useOutletContext } from 'react-router-dom'

const MARKETS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '228.14', change: '+1.12%' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '119.62', change: '+2.04%' },
  { symbol: 'MSFT', name: 'Microsoft', price: '417.22', change: '+0.41%' },
  { symbol: 'AMZN', name: 'Amazon.com', price: '187.90', change: '-0.28%' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: '239.80', change: '-0.94%' },
  { symbol: 'META', name: 'Meta Platforms', price: '512.35', change: '+0.67%' },
]

export default function Markets() {
  const { query = '' } = useOutletContext()
  const term = query.trim().toLowerCase()
  const rows = MARKETS.filter(
    (row) =>
      !term ||
      row.symbol.toLowerCase().includes(term) ||
      row.name.toLowerCase().includes(term),
  )

  return (
    <section className="page">
      <article className="card">
        <div className="card-header">
          <h2>Watchlist</h2>
          <span>{rows.length} instruments</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Last</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="empty">
                  No markets match “{query}”
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.symbol}>
                  <td>
                    <strong>{row.symbol}</strong>
                  </td>
                  <td>{row.name}</td>
                  <td>${row.price}</td>
                  <td className={row.change.startsWith('+') ? 'positive' : 'negative'}>
                    {row.change}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </article>
    </section>
  )
}
