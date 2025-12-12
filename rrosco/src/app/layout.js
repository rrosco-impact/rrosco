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
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=arrow_downward" />
      </head>
      <body className="h-screen w-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
