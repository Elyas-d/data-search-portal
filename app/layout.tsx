import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Open Data Search Portal | Find and Access Open Research Data",
  description:
    "Discover, access, and utilize open data resources with our intelligent search platform designed for academic and research purposes.",
  keywords: "open data, research data, data search, academic data, data portal",
  authors: [{ name: "Smart Open Data Team" }],
  openGraph: {
    title: "Smart Open Data Search Portal",
    description: "Discover and access open research data resources",
    type: "website",
    locale: "en_US",
    url: "https://opendatasearch.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Open Data Search Portal",
    description: "Discover and access open research data resources",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
