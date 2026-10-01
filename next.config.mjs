/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bundling ws breaks its frame masking ("b.mask is not a function"), which the Neon driver relies on.
  serverExternalPackages: ['ws'],
  // Pages moved under /app; keep old bookmarks working.
  async redirects() {
    return [
      { source: '/charts', destination: '/app/charts', permanent: false },
      { source: '/journal', destination: '/app/journal', permanent: false },
    ]
  },
}

export default nextConfig
