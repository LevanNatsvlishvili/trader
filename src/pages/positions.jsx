import { useOutletContext } from 'react-router-dom'

const POSITIONS = [
  { symbol: 'AAPL', qty: 120, avg: '217.80', mark: '228.14', pnl: '+1,240' },
  { symbol: 'NVDA', qty: 40, avg: '98.10', mark: '119.62', pnl: '+860' },
  { symbol: 'MSFT', qty: 55, avg: '408.30', mark: '417.22', pnl: '+490' },
  { symbol: 'TSLA', qty: -25, avg: '227.40', mark: '239.80', pnl: '-310' },
]

export default function Positions() {
  const { query = '' } = useOutletContext()
  const term = query.trim().toLowerCase()
  const rows = POSITIONS.filter((row) => !term || row.symbol.toLowerCase().includes(term))

  return (
    <section className="page">
      <article className="card">
        <div className="card-header">
          <h2>Positions</h2>
          <span>Net exposure $142,610</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Qty</th>
              <th>Avg</th>
              <th>Mark</th>
              <th>Unrealized</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty">
                  No positions match “{query}”
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.symbol}>
                  <td>
                    <strong>{row.symbol}</strong>
                  </td>
                  <td>{row.qty}</td>
                  <td>${row.avg}</td>
                  <td>${row.mark}</td>
                  <td className={row.pnl.startsWith('+') ? 'positive' : 'negative'}>
                    ${row.pnl}
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
