import Link from "next/link"
import { DFLogo } from "@/components/df-logo"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Header */}
      <header className="bg-[#2563eb] text-white py-10 px-5 text-center">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity">
            <DFLogo size="md" />
            <span className="text-2xl font-bold">DataFixer</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-5 py-12">
        <article className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-8 md:p-12">
          {/* About Section */}
          <section className="mb-16">
            <h1 className="text-3xl font-bold text-[#1f2937] mb-6">About DataFixer</h1>
            <div className="space-y-4">
              <p className="text-[#1f2937] leading-relaxed">
                DataFixer is a simple online platform that helps users fix, clean, and convert data files quickly and
                securely. Our tools are designed to solve common data problems without requiring software installation,
                accounts, or uploads.
              </p>
              <p className="text-[#1f2937] leading-relaxed">
                Whether you're working with CSV files, spreadsheets, or other data formats, DataFixer allows you to get
                the job done directly in your browser. All processing happens locally on your device, ensuring speed and
                privacy.
              </p>
              <p className="text-[#1f2937] leading-relaxed">
                Our goal is to provide fast, reliable, and easy-to-use tools for everyday data tasks — free and
                accessible to everyone.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="pt-8 border-t border-[#e5e7eb]">
            <h2 className="text-3xl font-bold text-[#1f2937] mb-6">Contact Us</h2>
            <div className="space-y-4">
              <p className="text-[#1f2937] leading-relaxed">
                If you have questions, feedback, or suggestions, feel free to reach out to us.
              </p>
              <div className="bg-[#f7f7f7] p-6 rounded-lg">
                <p className="text-[#1f2937] leading-relaxed">
                  <span className="font-semibold">Email:</span>{" "}
                  <a href="mailto:support@getdatafixer.com" className="text-[#2563eb] hover:underline">
                    support@getdatafixer.com
                  </a>
                </p>
              </div>
              <p className="text-[#6b7280] text-sm mt-4">We aim to respond to all inquiries as quickly as possible.</p>
            </div>
          </section>
        </article>
      </main>

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
