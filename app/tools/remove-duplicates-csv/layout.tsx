import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Remove Duplicates from CSV | DataFixer",
  description:
    "Remove duplicate rows from CSV files quickly and securely. Process data locally in your browser with no uploads required.",
  openGraph: {
    title: "Remove Duplicates from CSV | DataFixer",
    description:
      "Remove duplicate rows from CSV files quickly and securely. Process data locally in your browser with no uploads required.",
    url: "https://getdatafixer.com/tools/remove-duplicates-csv",
    siteName: "DataFixer",
    type: "website",
  },
}

export default function RemoveDuplicatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
