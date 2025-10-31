import type { Metadata } from 'next'
import './globals.css'
import { WeatherProvider } from '@/contexts/WeatherContext'
import DynamicBody from '@/app/DynamicBody'

export const metadata: Metadata = {
  title: 'Software Engineer Portfolio | 6+ Years Experience',
  description: 'Portfolio of a seasoned software engineer with 6+ years of experience in full-stack development, cloud technologies, and modern software architecture.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased text-white overflow-x-hidden">
        <WeatherProvider>
          <DynamicBody />
          {children}
        </WeatherProvider>
      </body>
    </html>
  )
}

