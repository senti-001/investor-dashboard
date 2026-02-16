import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: '$NEURAL Sovereign Investor Dashboard',
  description: 'Industrial-grade command center for the Neural-Chromium project. Monitor the Zero-Copy Chromium build (28.7%), track $NEURAL liquidity, and engage with Senti, the primary head intelligence.',
  icons: {
    icon: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#00FF41',
}

import { ChatConcierge } from '@/components/chat-concierge'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-[#0A0A0A] min-h-screen">
        {children}
        <ChatConcierge />
      </body>
    </html>
  )
}
