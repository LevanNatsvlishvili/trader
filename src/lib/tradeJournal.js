import 'server-only'
import { unstable_cache } from 'next/cache'

const DATA_SOURCE_ID = 'f1463a17-b685-828a-985d-073bccd43827'
const REVALIDATE_SECONDS = 60

function plainText(parts) {
  if (!Array.isArray(parts) || parts.length === 0) return null
  const text = parts.map((part) => part.plain_text).join('').trim()
  return text || null
}

function selectName(property) {
  return property?.select?.name ?? null
}

function multiSelectNames(property) {
  return (property?.multi_select ?? []).map((item) => item.name)
}

export function parseTradeJournalPage(page) {
  const properties = page.properties ?? {}
  const date = properties.Date?.date

  return {
    id: page.id,
    createdTime: page.created_time,
    contracts: plainText(properties.Contracts?.title) ?? '',
    dateStart: date?.start ?? null,
    dateEnd: date?.end ?? null,
    isDatetime: Boolean(date?.start?.includes('T')),
    dateNewYork: plainText(properties['Date New York']?.rich_text),
    dateTbilisi: plainText(properties['Date Tbilisi']?.rich_text),
    session: multiSelectNames(properties.Session),
    news: multiSelectNames(properties.News),
    strategy: selectName(properties.Strategy),
    weekday: selectName(properties['Week day']),
    outcome: selectName(properties.Outcome),
    pl: properties['P/L']?.number ?? 0,
    platform: selectName(properties.Platform),
    account: selectName(properties.Account),
    stock: selectName(properties.Stock),
  }
}

async function queryTradeJournal() {
  const key = process.env.NOTION_API_KEY
  if (!key) {
    throw new Error('Missing NOTION_API_KEY')
  }

  const rows = []
  let cursor

  do {
    const response = await fetch(`https://api.notion.com/v1/data_sources/${DATA_SOURCE_ID}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cursor ? { start_cursor: cursor } : {}),
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Notion query failed (${response.status})`)
    }

    const data = await response.json()
    rows.push(...(data.results ?? []).map(parseTradeJournalPage))
    cursor = data.has_more ? data.next_cursor : null
  } while (cursor)

  return rows.sort((a, b) => String(b.dateStart).localeCompare(String(a.dateStart)))
}

export const fetchTradeJournal = unstable_cache(queryTradeJournal, ['trade-journal'], {
  revalidate: REVALIDATE_SECONDS,
})

export function formatPl(value) {
  const amount = Math.abs(value).toFixed(2)
  if (value > 0) return `+$${amount}`
  if (value < 0) return `-$${amount}`
  return `$${amount}`
}

export function formatDate(entry) {
  if (!entry.dateStart) return '—'
  const start = entry.dateStart.slice(0, 10)
  if (!entry.dateEnd) return start
  return `${start} → ${entry.dateEnd.slice(0, 10)}`
}
