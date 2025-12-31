import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CSV Remove Duplicates – Clean Duplicate Rows Instantly | DataFixer",
  description:
    "Remove duplicate rows from CSV files instantly in your browser. Fast, 100% private, free, works offline. No uploads, no signup. Perfect for cleaning spreadsheets and large datasets.",
  keywords: [
    "CSV remove duplicates",
    "remove duplicate rows CSV",
    "dedupe CSV browser",
    "clean CSV online",
    "delete repeated rows CSV",
    "CSV duplicate remover offline",
  ],
  openGraph: {
    title: "CSV Remove Duplicates – Clean Duplicate Rows Instantly",
    description:
      "Instantly delete duplicate rows from CSV files using your browser. Free, secure, offline, and fast. No uploads or accounts required.",
    url: "https://getdatafixer.com/csv/remove-duplicates",
    siteName: "DataFixer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSV Remove Duplicates – Clean Duplicate Rows Instantly",
    description:
      "Remove repeated rows from CSV files securely in your browser. Free, offline, no uploads needed.",
  },
}

export default function RemoveDuplicatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}
