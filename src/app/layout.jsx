import './globals.css'
import './app.css'

export const metadata = {
  title: 'Trader Admin',
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport = {
  themeColor: '#0b1220',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ backgroundColor: '#0b1220' }}>
      <body>{children}</body>
    </html>
  )
}
