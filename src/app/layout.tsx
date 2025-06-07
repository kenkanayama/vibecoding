import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VibeFM - 気分で選ぶ音楽レコメンド',
  description: 'あなたの気分や感情に基づいて、最適な音楽をSpotifyからレコメンドするWebサービス',
  keywords: ['音楽', 'レコメンド', 'Spotify', '気分', '感情'],
  authors: [{ name: 'VibeFM Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1DB954',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="h-full">
      <body className={`${inter.className} h-full bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900`}>
        {children}
      </body>
    </html>
  )
} 