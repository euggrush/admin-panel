import '../src/app/globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Admin Panel',
  description: 'Админка на Next.js',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
