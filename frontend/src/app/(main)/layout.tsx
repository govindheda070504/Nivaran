// src/app/(main)/layout.tsx
import '@/styles/globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Nivaran',
  description: 'Your app description',
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Navbar />
        <main className="min-h-screen px-4 md:px-8 lg:px-16">
          {children} {/* All pages render here */}
        </main>
        <Footer />
      </body>
    </html>
  )
}
