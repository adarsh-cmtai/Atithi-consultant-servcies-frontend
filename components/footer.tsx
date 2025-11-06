import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo */}
          <div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold">CF</span>
            </div>
            <p className="text-sm opacity-90">CareerFinance Hub</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/job-form" className="hover:underline opacity-90">
                  Find a Job
                </Link>
              </li>
              <li>
                <Link href="/loan-form" className="hover:underline opacity-90">
                  Apply for Loan
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline opacity-90">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline opacity-90">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline opacity-90">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline opacity-90">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:underline opacity-90">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline opacity-90">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center text-sm opacity-90">
          <p>&copy; {currentYear} CareerFinance Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
