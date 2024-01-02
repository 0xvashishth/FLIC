import "./globals.css";
import type { Metadata } from "next";
import { opun_black, opun_light, opun_medium } from "./assets/fonts/FontMaster";
import logo from "./assets/logos/flic-transperent.png";
import SwitchTheme from "./components/clientUtils/SwitchTheme";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "FLIC | Form Link Chat",
  description: "This Website Is For Form, Link And Chat",
  icons: logo.src,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>FLIC | Form Link Chat</title>
        <meta name="title" content="FLIC | Form Link Chat" />
        <meta
          name="description"
          content="This Website Is For Form, Link And Chat"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flic.vercel.app/" />
        <meta property="og:title" content="FLIC | Form Link Chat" />
        <meta
          property="og:description"
          content="This Website Is For Form, Link And Chat"
        />
        <meta property="og:image" content="/icon.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://flic.vercel.app/" />
        <meta property="twitter:title" content="FLIC | Form Link Chat" />
        <meta
          property="twitter:description"
          content="This Website Is For Form, Link And Chat"
        />
        <meta property="twitter:image" content="/icon.png" />
      </head>
      <body className={`${opun_medium.variable} font-opun-medium`}>
        <Toaster />
        <SwitchTheme />
        {children}
      </body>
    </html>
  );
}
