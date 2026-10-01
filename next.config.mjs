/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bundling ws breaks its frame masking ("b.mask is not a function"), which the Neon driver relies on.
  serverExternalPackages: ['ws'],
}

export default nextConfig
