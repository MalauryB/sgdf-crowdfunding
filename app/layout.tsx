import type React from "react"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import { Caveat_Brush } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
})

const caveatBrush = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caveat-brush",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Plateforme de Financement Participatif - Scouts et Guides de France",
  description: "Soutenez les projets des Scouts et Guides de France",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${raleway.variable} ${caveatBrush.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
