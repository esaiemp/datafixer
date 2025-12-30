import Link from "next/link"
import { DFLogo } from "@/components/df-logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Header */}
      <header className="bg-[#2563eb] text-white py-10 px-5 text-center">
        <div className="flex justify-center mb-4">
          <DFLogo size="lg" />
        </div>
        <h1 className="text-[32px] font-bold mb-2.5">Fix Your Data Files in Seconds</h1>
        <p className="text-lg mb-5">
          Clean, repair, and convert CSV and other data files directly in your browser. No signup. No uploads.
        </p>
        <Link
          href="/tools/remove-duplicates-csv"
          className="inline-block bg-white text-[#2563eb] px-5 py-3 rounded font-bold no-underline hover:bg-gray-50 transition-colors"
        >
          Remove Duplicates From CSV
        </Link>
      </header>

      <div className="max-w-[1000px] mx-auto py-10 px-5">
        {/* Features Section */}
        <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mb-12">
          <div className="bg-white p-[30px] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <svg
              className="w-10 h-10 text-[#f59e0b] mb-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="mt-0 mb-2.5">Fast</h3>
            <p className="text-sm">All tools run directly in your browser for instant results.</p>
          </div>
          <div className="bg-white p-[30px] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <svg
              className="w-10 h-10 text-[#10b981] mb-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <h3 className="mt-0 mb-2.5">Secure</h3>
            <p className="text-sm">Your data never leaves your device. No server uploads.</p>
          </div>
          <div className="bg-white p-[30px] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <svg
              className="w-10 h-10 text-[#2563eb] mb-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-0 mb-2.5">Simple</h3>
            <p className="text-sm">One tool, one job. No clutter, no complexity.</p>
          </div>
          <div className="bg-white p-[30px] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <svg
              className="w-10 h-10 text-[#8b5cf6] mb-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
            <h3 className="mt-0 mb-2.5">Free</h3>
            <p className="text-sm">All tools are free to use. No account required.</p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="bg-white p-[30px] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-12">
          <h2 className="mt-0 mb-5">Popular Tools</h2>
          <ul className="list-none p-0 m-0">
            <li className="py-2.5 border-b border-[#e5e7eb]">
              <Link
                href="/tools/remove-duplicates-csv"
                className="text-[#2563eb] font-bold no-underline hover:underline"
              >
                Remove Duplicates from CSV
              </Link>
            </li>
            <li className="py-2.5 border-b border-[#e5e7eb]">
              <span className="text-gray-400">Convert CSV to Excel (Coming Soon)</span>
            </li>
            <li className="py-2.5 border-b border-[#e5e7eb]">
              <span className="text-gray-400">Split CSV Columns (Coming Soon)</span>
            </li>
            <li className="py-2.5 border-b border-[#e5e7eb]">
              <span className="text-gray-400">Merge CSV Files (Coming Soon)</span>
            </li>
            <li className="py-2.5 border-b border-[#e5e7eb]">
              <span className="text-gray-400">Clean CSV Files (Coming Soon)</span>
            </li>
          </ul>
        </section>

        {/* About Section */}
        <section className="text-[15px] leading-relaxed mb-12">
          <h2 className="mb-4">What is DataFixer?</h2>
          <p>
            DataFixer is a collection of simple online tools designed to solve common data problems. Whether you're
            working with CSV files, spreadsheets, or other data formats, DataFixer helps you fix issues quickly without
            installing software.
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#111827] text-[#9ca3af] py-[30px] px-5 text-center text-sm">
        <div className="flex justify-center mb-4">
          <DFLogo size="sm" className="opacity-60" />
        </div>
        <p className="mb-2">
          <Link href="/" className="text-[#9ca3af] no-underline mx-2.5 hover:text-white">
            Home
          </Link>{" "}
          |
          <Link href="/about" className="text-[#9ca3af] no-underline mx-2.5 hover:text-white">
            About Us
          </Link>{" "}
          |
          <Link href="/privacy" className="text-[#9ca3af] no-underline mx-2.5 hover:text-white">
            Privacy Policy
          </Link>{" "}
          |
          <Link href="/about" className="text-[#9ca3af] no-underline mx-2.5 hover:text-white">
            Contact Us
          </Link>
        </p>
        <p className="m-0">© DataFixer</p>
      </footer>
    </div>
  )
}
