import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "DataFixer – Free Online Data Tools",
  description:
    "Fix, clean, and convert data files directly in your browser. Fast, free, and secure – no signup or uploads required. Privacy-focused data processing.",
  keywords: ["CSV", "data tools", "data cleaning", "online tool", "free", "browser-based", "data fixer"],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.jpg",
  },
  openGraph: {
    title: "DataFixer – Free Online Data Tools",
    description: "Fix, clean, and convert data files directly in your browser. Fast, free, and secure.",
    type: "website",
    url: "https://getdatafixer.com",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
