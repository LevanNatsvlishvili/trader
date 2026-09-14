const STATS = [
  { label: 'Equity', value: '$248,920', change: '+2.4%', up: true },
  { label: 'Open P&L', value: '$4,180', change: '+0.8%', up: true },
  { label: 'Active orders', value: '18', change: '6 fills today', up: true },
  { label: 'Buying power', value: '$91,450', change: 'Margin 2.1x', up: false },
]

const POSITIONS = [
  { symbol: 'AAPL', side: 'Long', qty: 120, price: '$228.14', pnl: '+$1,240', up: true },
  { symbol: 'NVDA', side: 'Long', qty: 40, price: '$119.62', pnl: '+$860', up: true },
  { symbol: 'TSLA', side: 'Short', qty: 25, price: '$239.80', pnl: '-$310', up: false },
  { symbol: 'MSFT', side: 'Long', qty: 55, price: '$417.22', pnl: '+$490', up: true },
]

export default function Dashboard() {
  return (
    <section className="page">
      <div className="stats-grid">
        {STATS.map((stat) => (
          <article key={stat.label} className="card stat-card">
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
            <span className={stat.up ? 'positive' : 'muted'}>{stat.change}</span>
          </article>
        ))}
      </div>

      <div className="split">
        <article className="card">
          <div className="card-header">
            <h2>Open positions</h2>
            <span>4 of 12</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Side</th>
                <th>Qty</th>
                <th>Mark</th>
                <th>P&L</th>
              </tr>
            </thead>
            <tbody>
              {POSITIONS.map((row) => (
                <tr key={row.symbol}>
                  <td>
                    <strong>{row.symbol}</strong>
                  </td>
                  <td>{row.side}</td>
                  <td>{row.qty}</td>
                  <td>{row.price}</td>
                  <td className={row.up ? 'positive' : 'negative'}>{row.pnl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="card">
          <div className="card-header">
            <h2>Session activity</h2>
            <span>Live</span>
          </div>
          <ul className="activity-list">
            <li>
              <span className="dot buy" />
              Bought 40 NVDA at 119.40
              <time>09:14</time>
            </li>
            <li>
              <span className="dot sell" />
              Sold 10 TSLA at 241.05
              <time>09:21</time>
            </li>
            <li>
              <span className="dot buy" />
              Limit filled: 25 MSFT
              <time>09:27</time>
            </li>
            <li>
              <span className="dot alert" />
              Risk check passed for AAPL add
              <time>09:31</time>
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}
