export const FUNDED_ACCOUNTS = [
  'Eval 001',
  'Eval 002',
  'Eval 003',
  'Eval 004',
  'Eval 005',
  'Funded 001',
]

export const OUTCOME_COLORS = {
  Win: '#4ade80',
  Lose: '#f87171',
  'N/A': '#9ca3af',
}

export function currentMonthKey(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function februaryToNowRange(now = new Date()) {
  const year = now.getFullYear()
  const end = currentMonthKey(now)
  const start = `${year}-02`
  if (end < start) return { start: `${year - 1}-02`, end }
  return { start, end }
}

export function selectTrades(trades, { account, allPlatforms = false, monthRange } = {}) {
  return (trades ?? []).filter((trade) => {
    if (!allPlatforms && trade.platform !== 'Funded') return false
    if (account && trade.account !== account) return false
    if (monthRange) {
      const month = trade.dateStart ? String(trade.dateStart).slice(0, 7) : ''
      if (!/^\d{4}-\d{2}$/.test(month)) return false
      if (month < monthRange.start || month > monthRange.end) return false
    }
    return true
  })
}

export function fundedTrades(trades, account) {
  return selectTrades(trades, { account })
}

export function outcomeBreakdown(trades, account, options = {}) {
  const counts = { Win: 0, Lose: 0, 'N/A': 0 }

  for (const trade of selectTrades(trades, { account, ...options })) {
    if (trade.outcome === 'Win') counts.Win += 1
    else if (trade.outcome === 'Lose') counts.Lose += 1
    else counts['N/A'] += 1
  }

  return ['Win', 'Lose', 'N/A'].map((name) => ({
    name,
    value: counts[name],
    color: OUTCOME_COLORS[name],
  }))
}

function nextMonth(month) {
  const [year, monthIndex] = month.split('-').map(Number)
  if (monthIndex === 12) return `${year + 1}-01`
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}`
}

function monthsFromTo(start, end) {
  const months = []
  for (let cursor = start; cursor <= end; cursor = nextMonth(cursor)) {
    months.push(cursor)
  }
  return months
}

export function plByMonth(trades, account, options = {}) {
  const buckets = new Map()
  const fundedMonths = new Set()
  const rows = selectTrades(trades, { account, ...options })

  for (const trade of rows) {
    if (!trade.dateStart) continue
    const month = String(trade.dateStart).slice(0, 7)
    if (!/^\d{4}-\d{2}$/.test(month)) continue
    buckets.set(month, (buckets.get(month) ?? 0) + Number(trade.pl || 0))
    if (trade.platform === 'Funded') fundedMonths.add(month)
  }

  const dataMonths = [...buckets.keys()].sort((a, b) => a.localeCompare(b))
  const months = options.monthRange
    ? monthsFromTo(options.monthRange.start, options.monthRange.end)
    : dataMonths
  const years = new Set(months.map((month) => month.slice(0, 4)))
  const includeYear = years.size > 1

  return months.map((month) => {
    const pl = buckets.get(month) ?? 0
    return {
      month,
      label: formatMonthLabel(month, includeYear),
      pl,
      fill: pl > 0 ? '#4ade80' : pl < 0 ? '#f87171' : '#3f3f46',
      funded: fundedMonths.has(month),
    }
  })
}

function formatMonthLabel(month, includeYear) {
  const [year, monthIndex] = month.split('-').map(Number)
  const date = new Date(year, monthIndex - 1, 1)
  const label = date.toLocaleString('en-US', { month: 'short' })
  return includeYear ? `${label} ${String(year).slice(2)}` : label
}
