import './globals.css'
import type { Metadata } from 'next'
import {opun_black, opun_light, opun_medium} from "./assets/fonts/FontMaster"


export const metadata: Metadata = {
  title: 'FLIC | Forms Links Chats',
  description: 'This Website Is For Forms, Links And Chats',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={`${opun_medium.variable} font-opun-medium`}>{children}</body>
    </html>
  )
}
