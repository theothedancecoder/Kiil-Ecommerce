import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { LanguageProvider } from '@/lib/languageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kiil Interior Designs',
  description: 'Luxury Scandinavian furniture and interior design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
        className={inter.className}
        suppressHydrationWarning={true}
      >
        <ClerkProvider dynamic>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
