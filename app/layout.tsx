import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Showcase Generator',
  description: 'A no code solution to quickly turn any public GitHub repository into an interactive frame, allowing creators to showcase the key features of their project with ease.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: "#fafafa" }}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
