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
import Script from "next/script";

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
            <Script
              id='script-1'
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />

            <Script 
            id='script-2'
            strategy="lazyOnload">
              {`
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                          page_path: window.location.pathname,
                          });
                      `}
            </Script>
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
