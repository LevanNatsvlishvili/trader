import { useOutletContext } from 'react-router-dom'

const ORDERS = [
  { id: 'ORD-1042', symbol: 'AAPL', side: 'Buy', type: 'Limit', qty: 50, status: 'Working' },
  { id: 'ORD-1041', symbol: 'NVDA', side: 'Buy', type: 'Market', qty: 40, status: 'Filled' },
  { id: 'ORD-1040', symbol: 'TSLA', side: 'Sell', type: 'Stop', qty: 10, status: 'Filled' },
  { id: 'ORD-1039', symbol: 'MSFT', side: 'Buy', type: 'Limit', qty: 25, status: 'Partial' },
  { id: 'ORD-1038', symbol: 'AMZN', side: 'Sell', type: 'Limit', qty: 15, status: 'Cancelled' },
]

export default function Orders() {
  const { query = '' } = useOutletContext()
  const term = query.trim().toLowerCase()
  const rows = ORDERS.filter(
    (row) =>
      !term ||
      row.id.toLowerCase().includes(term) ||
      row.symbol.toLowerCase().includes(term) ||
      row.status.toLowerCase().includes(term),
  )

  return (
    <section className="page">
      <article className="card">
        <div className="card-header">
          <h2>Order blotter</h2>
          <span>{rows.length} records</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Symbol</th>
              <th>Side</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty">
                  No orders match “{query}”
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>
                    <strong>{row.symbol}</strong>
                  </td>
                  <td className={row.side === 'Buy' ? 'positive' : 'negative'}>{row.side}</td>
                  <td>{row.type}</td>
                  <td>{row.qty}</td>
                  <td>
                    <span className={`pill ${row.status.toLowerCase()}`}>{row.status}</span>
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
