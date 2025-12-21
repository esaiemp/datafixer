import Link from "next/link"
import { DFLogo } from "@/components/df-logo"

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-[#1f2937] mb-2">Privacy Policy</h1>
          <p className="text-sm text-[#6b7280] mb-8">Last updated: 2025</p>

          <div className="space-y-6">
            <p className="text-[#1f2937] leading-relaxed">
              At DataFixer (accessible from getdatafixer.com), your privacy is important to us. This Privacy Policy
              document outlines the types of information that are collected and recorded by DataFixer and how we use it.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-[#1f2937] mt-8 mb-4">Information We Do Not Collect</h2>
              <p className="text-[#1f2937] leading-relaxed">
                DataFixer does not upload, store, or process your files on our servers. All data processing happens
                locally in your browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1f2937] mt-8 mb-4">Log Files</h2>
              <p className="text-[#1f2937] leading-relaxed">
                DataFixer follows a standard procedure of using log files. These files log visitors when they visit our
                website. The information collected by log files include internet protocol (IP) addresses, browser type,
                Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of
                clicks. These are not linked to any information that is personally identifiable. The information is used
                to optimize the users' experience by customizing our web page content based on their browser type and
                other information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1f2937] mt-8 mb-4">Cookies and Web Beacons</h2>
              <p className="text-[#1f2937] leading-relaxed">
                Like many other websites, DataFixer uses "cookies". These cookies are used to store information
                including visitors' preferences, and the pages on the website that the visitor accessed or visited. The
                information is used to optimize the users' experience by customizing our web page content based upon
                their visit to getdatafixer.com and other sites on the internet.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1f2937] mt-8 mb-4">Google DoubleClick DART Cookie</h2>
              <p className="text-[#1f2937] leading-relaxed">
                Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to
                serve ads to our site visitors based on their visit to our site and other sites on the Internet.
              </p>
              <p className="text-[#1f2937] leading-relaxed mt-4">
                Google's use of the DART cookie enables it to serve ads to users based on their visit to our site and
                other sites on the Internet. Users may decline the use of DART cookies by visiting the Google ad and
                content network Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1f2937] mt-8 mb-4">Our Advertising Partners</h2>
              <p className="text-[#1f2937] leading-relaxed">
                Some of the advertisers on our site may use cookies and web beacons. Our advertising partners include:
              </p>
              <ul className="list-disc list-inside text-[#1f2937] ml-4 mt-2">
                <li>Google AdSense</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1f2937] mt-8 mb-4">Third Party Privacy Policies</h2>
              <p className="text-[#1f2937] leading-relaxed">
                DataFixer's Privacy Policy does not apply to other advertisers or websites. We advise you to consult the
                respective Privacy Policies of these third-party ad servers for more detailed information about their
                practices and instructions about how to opt-out of certain options.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1f2937] mt-8 mb-4">Children's Information</h2>
              <p className="text-[#1f2937] leading-relaxed">
                DataFixer does not knowingly collect any Personal Identifiable Information from children under the age
                of 13. If you think that your child provided this kind of information on our website, we strongly
                encourage you to contact us immediately and we will do our best efforts to promptly remove such
                information from our records.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1f2937] mt-8 mb-4">Consent</h2>
              <p className="text-[#1f2937] leading-relaxed">
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              </p>
            </section>

            <section className="mt-12 pt-8 border-t border-[#e5e7eb]">
              <h2 className="text-2xl font-semibold text-[#1f2937] mb-4">Contact Us</h2>
              <p className="text-[#1f2937] leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our website.
              </p>
            </section>
          </div>
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
