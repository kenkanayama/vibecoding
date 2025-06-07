/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['i.scdn.co', 'p.scdn.co', 'seed-mix-image.spotifycdn.com'],
  },
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  },
}

module.exports = nextConfig 