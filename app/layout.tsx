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
  title: 'Glazyr Viz Sovereign Investor Dashboard',
  description: 'Industrial-grade command center for the Glazyr Viz project. Monitor the system build, track $USDC liquidity, and engage with Senti.',
  icons: {
    icon: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#00FF41',
}

import { ElevenLabsWidget } from '@/components/elevenlabs-widget'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-[#0A0A0A] min-h-screen">
        {children}
        <ElevenLabsWidget />
      </body>
    </html>
  )
}
