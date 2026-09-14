import { useEffect, useState } from 'react'
import { fetchTradeJournal, formatDate, formatPl } from '../lib/tradeJournal.js'
import './journal.css'

function dash(value) {
  return value || '—'
}

function PillList({ items, empty = '—' }) {
  if (!items?.length) return empty
  return (
    <div className="pill-row">
      {items.map((item) => (
        <span key={item} className="pill">
          {item}
        </span>
      ))}
    </div>
  )
}

function outcomeClass(outcome) {
  if (outcome === 'Win') return 'pill win'
  if (outcome === 'Lose') return 'pill lose'
  return 'pill na'
}

export default function Journal() {
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
      {status === 'loading' ? <p className="journal-status">Loading trades…</p> : null}
      {status === 'error' ? <p className="journal-status">{error}</p> : null}

      {status === 'ready' ? (
        <article className="card">
          <div className="card-header">
            <h2>Trade journal</h2>
            <span>{rows.length} trades</span>
          </div>
          <div className="journal-table-wrap">
            <table className="data-table journal-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Weekday</th>
                  <th>NY</th>
                  <th>Session</th>
                  <th>Stock</th>
                  <th>Strategy</th>
                  <th>Contracts</th>
                  <th>Outcome</th>
                  <th>P/L</th>
                  <th>News</th>
                  <th>Platform</th>
                  <th>Account</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="empty">
                      No trades yet
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <strong>{formatDate(row)}</strong>
                      </td>
                      <td>{dash(row.weekday)}</td>
                      <td>{dash(row.dateNewYork)}</td>
                      <td>
                        <PillList items={row.session} />
                      </td>
                      <td>{dash(row.stock)}</td>
                      <td>{dash(row.strategy)}</td>
                      <td>{dash(row.contracts)}</td>
                      <td>
                        {row.outcome ? (
                          <span className={outcomeClass(row.outcome)}>{row.outcome}</span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td
                        className={`pl-cell ${row.pl > 0 ? 'positive' : row.pl < 0 ? 'negative' : ''}`}
                      >
                        {formatPl(row.pl)}
                      </td>
                      <td>
                        <PillList items={row.news} />
                      </td>
                      <td>{dash(row.platform)}</td>
                      <td>{dash(row.account)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>
      ) : null}
    </section>
  )
}
