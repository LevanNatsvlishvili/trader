import { useOutletContext } from 'react-router-dom'

const TRADERS = [
  { name: 'Maya Chen', desk: 'Equities', status: 'Active', pnl: '+$18,420' },
  { name: 'Omar Haddad', desk: 'Options', status: 'Active', pnl: '+$9,110' },
  { name: 'Sofia Alvarez', desk: 'Futures', status: 'Away', pnl: '-$1,240' },
  { name: 'Jonah Park', desk: 'Equities', status: 'Active', pnl: '+$4,880' },
]

export default function Traders() {
  const { query = '' } = useOutletContext()
  const term = query.trim().toLowerCase()
  const rows = TRADERS.filter(
    (row) =>
      !term ||
      row.name.toLowerCase().includes(term) ||
      row.desk.toLowerCase().includes(term),
  )

  return (
    <section className="page">
      <article className="card">
        <div className="card-header">
          <h2>Desk roster</h2>
          <span>{rows.length} traders</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Desk</th>
              <th>Status</th>
              <th>Day P&L</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="empty">
                  No traders match “{query}”
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.name}>
                  <td>
                    <strong>{row.name}</strong>
                  </td>
                  <td>{row.desk}</td>
                  <td>
                    <span className={`pill ${row.status.toLowerCase()}`}>{row.status}</span>
                  </td>
                  <td className={row.pnl.startsWith('+') ? 'positive' : 'negative'}>
                    {row.pnl}
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
