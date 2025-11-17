"use client";

import "./globals.css";
import { Poppins } from 'next/font/google';
import { Providers } from "./provider";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'], // specify weights you need
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
