import './globals.css'
import type { Metadata } from 'next'
import {opun_black, opun_light, opun_medium} from "./assets/fonts/FontMaster"
import logo from "./assets/logos/flic-transperent.png"
import SwitchTheme from './components/clientUtils/SwitchTheme'
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'FLIC | Form Link Chat',
  description: 'This Website Is For Form, Link And Chat',
  icons: logo.src,
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/icon.png" sizes="any" />
      <link
      rel="apple-touch-icon"
      href="/icon.png"
      type="image/png"
      sizes="32x32"
    />
      </head>
      <body className={`${opun_medium.variable} font-opun-medium`}>
      <Toaster />
      <SwitchTheme />
        {children}
      </body>
    </html>
  )
}
