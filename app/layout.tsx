import './globals.css'
import { Inter } from 'next/font/google'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'

import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HomeStay',
  description: 'Explore accommodations around the world',
}

const font = Nunito({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
          <div className='pb-20 pt-28'>
            {children}
          </div>
          <Analytics />
      </body>
    </html>
  )
}
