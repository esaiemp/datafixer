import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us & Contact - DataFixer",
  description:
    "Learn about DataFixer's mission to provide fast, secure data tools. Contact us for questions or support at support@getdatafixer.com.",
  openGraph: {
    title: "About Us & Contact - DataFixer",
    description:
      "Learn about DataFixer's mission to provide fast, secure data tools. Contact us for questions or support.",
    url: "https://getdatafixer.com/about",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
