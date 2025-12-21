import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | DataFixer",
  description: "Privacy Policy for DataFixer - Learn how we protect your data and what information we collect.",
  openGraph: {
    title: "Privacy Policy | DataFixer",
    description: "Privacy Policy for DataFixer - Learn how we protect your data and what information we collect.",
    url: "https://getdatafixer.com/privacy",
    siteName: "DataFixer",
    type: "website",
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
