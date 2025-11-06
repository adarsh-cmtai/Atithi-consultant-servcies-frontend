"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-accent bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AC</span>
          </div>
          <div className="flex flex-col">
            <span className="hidden sm:block font-bold text-sm text-foreground">Atithi</span>
            <span className="hidden sm:block text-xs text-primary font-semibold">Consultant Services</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/job-form" className="text-foreground hover:text-primary transition-colors font-medium">
            Job Assistance
          </Link>
          <Link href="/loan-form" className="text-foreground hover:text-primary transition-colors font-medium">
            Loan Assistance
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
            About Us
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link href="/job-form" className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">Get Started</Button>
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-accent bg-background px-4 py-4 flex flex-col gap-4">
          <Link
            href="/job-form"
            className="text-foreground hover:text-primary transition-colors font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Job Assistance
          </Link>
          <Link
            href="/loan-form"
            className="text-foreground hover:text-primary transition-colors font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Loan Assistance
          </Link>
          <Link
            href="/about"
            className="text-foreground hover:text-primary transition-colors font-medium"
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-foreground hover:text-primary transition-colors font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
          <Link href="/job-form" onClick={() => setMobileOpen(false)}>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">Get Started</Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
