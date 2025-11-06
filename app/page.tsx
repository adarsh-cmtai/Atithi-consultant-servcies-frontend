"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import {
  Briefcase,
  DollarSign,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  Shield,
  Award,
  ArrowRight,
  Zap,
  Star,
  Users,
  Lightbulb,
  Clock,
  HelpCircle,
  Plus,
  X,
} from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We provide comprehensive job placement assistance and loan application guidance. Our services include profile optimization, interview coaching, document verification, and personalized support throughout your application journey.",
    },
    {
      question: "How long does the job placement process take?",
      answer:
        "The timeline varies based on individual circumstances and job market conditions. On average, our clients secure positions within 2-8 weeks with our active support and guidance.",
    },
    {
      question: "Is there a guarantee on loan approval?",
      answer:
        "While we cannot guarantee loan approval, we maximize your chances by ensuring all documentation is perfect and your application is competitive. Our approval rate is significantly higher than industry average.",
    },
    {
      question: "What qualifications do your consultants have?",
      answer:
        "Our team comprises certified professionals with 10+ years of experience in recruitment and financial services. We stay updated with latest industry trends and best practices.",
    },
    {
      question: "Do you offer after-placement support?",
      answer:
        "Yes, we provide ongoing support even after placement or loan approval. Our commitment extends to ensuring your long-term success and satisfaction.",
    },
  ]

  const testimonials = [
    {
      name: "Raj Patel",
      role: "Software Engineer",
      company: "Tech Corp India",
      content:
        "Atithi's guidance was invaluable in landing my dream job. The interview coaching and resume review transformed my application.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Business Analyst",
      company: "Finance Solutions Ltd",
      content:
        "The loan application process was seamless with their support. They explained everything clearly and made the entire experience stress-free.",
      rating: 5,
    },
    {
      name: "Arjun Kumar",
      role: "Project Manager",
      company: "Global Solutions",
      content:
        "Within 3 weeks of starting with Atithi, I had multiple job offers. Their personalized approach truly makes a difference.",
      rating: 5,
    },
    {
      name: "Neha Singh",
      role: "Data Scientist",
      company: "Analytics Pro",
      content:
        "Professional, courteous, and highly effective. They genuinely care about their clients' success and it shows.",
      rating: 5,
    },
  ]

  const team = [
    {
      name: "Vikram Desai",
      title: "Founder & Career Specialist",
      bio: "15+ years in recruitment and career development",
      initials: "VD",
    },
    {
      name: "Anjali Verma",
      title: "Head of Loan Services",
      bio: "12+ years in financial advisory and loan processing",
      initials: "AV",
    },
    {
      name: "Rohan Gupta",
      title: "Client Success Manager",
      bio: "8+ years in client relationship management",
      initials: "RG",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section - Enhanced */}
      <section className="w-full pt-12 md:pt-24 pb-20 md:pb-32 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full animate-in fade-in slide-in-from-left duration-500">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Welcome to Atithi Consultant Services</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                  Your Gateway to Career Success & Financial Freedom
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Expert guidance for ambitious professionals. We partner with you to navigate career opportunities and
                  financial solutions with confidence, expertise, and transparency.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/job-form">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-base w-full sm:w-auto">
                    Find Your Dream Job <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/loan-form">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-base bg-transparent w-full sm:w-auto"
                  >
                    Apply for Loan <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">100% Transparent Process</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">Expert Consultants</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">Certified & Trusted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">24/7 Support Available</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Hero */}
            <div className="hidden lg:flex flex-col gap-6">
              <div className="bg-gradient-to-br from-primary/15 to-accent/10 border border-accent rounded-2xl p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Accelerated Career Growth</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Connect with vetted opportunities tailored to your skills and career aspirations
                </p>
                <div className="text-2xl font-bold text-primary">5000+</div>
                <p className="text-xs text-muted-foreground">Successful placements</p>
              </div>

              <div className="bg-gradient-to-br from-accent/15 to-primary/10 border border-accent rounded-2xl p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Smart Financial Solutions</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Streamlined loan process with expert guidance and transparent terms
                </p>
                <div className="text-2xl font-bold text-primary">₹50+ Cr</div>
                <p className="text-xs text-muted-foreground">Loans facilitated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 px-4 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "5000+", label: "Successful Placements" },
              { stat: "3500+", label: "Loans Approved" },
              { stat: "98%", label: "Client Satisfaction" },
              { stat: "10+", label: "Years of Excellence" },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold">{item.stat}</div>
                <p className="text-white/80 text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section className="w-full py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Comprehensive Solutions for Your Goals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're seeking your dream job or financial support, we have the expertise and dedication to help
              you succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Job Services Card */}
            <div className="group relative bg-gradient-to-br from-white to-primary/5 border-2 border-accent rounded-2xl p-8 hover:border-primary transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary/15 rounded-xl flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Job Seeker Services</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Comprehensive job search assistance including profile optimization, application strategy, interview
                    preparation, and expert review of your qualifications.
                  </p>
                </div>

                <ul className="space-y-3">
                  {[
                    "Professional Resume Enhancement",
                    "Strategic Application Guidance",
                    "Interview Coaching & Preparation",
                    "Salary Negotiation Support",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/job-form"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group/link pt-4"
                >
                  Get Started <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Loan Services Card */}
            <div className="group relative bg-gradient-to-br from-white to-primary/5 border-2 border-accent rounded-2xl p-8 hover:border-primary transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary/15 rounded-xl flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Loan Application Guidance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Expert guidance through the loan application process, documentation support, eligibility
                    verification, and transparent explanation of all terms and conditions.
                  </p>
                </div>

                <ul className="space-y-3">
                  {[
                    "Complete Document Verification",
                    "Eligibility Assessment & Planning",
                    "Application Process Guidance",
                    "Post-Approval Support",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/loan-form"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group/link pt-4"
                >
                  Apply Now <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 px-4 bg-gradient-to-b from-blue-50/40 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Why Choose Atithi?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine expertise, integrity, and personalized service to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Expertise",
                description:
                  "Team of seasoned professionals with 10+ years in recruitment, finance, and career development",
                color: "from-primary/10 to-primary/5",
              },
              {
                icon: Award,
                title: "Proven Success",
                description: "5000+ successful placements and 3500+ loans facilitated with 98% satisfaction rate",
                color: "from-accent/10 to-accent/5",
              },
              {
                icon: Clock,
                title: "Personalized Support",
                description: "Tailored guidance for each client with ongoing support throughout your entire journey",
                color: "from-primary/10 to-primary/5",
              },
              {
                icon: Zap,
                title: "Fast & Efficient",
                description: "Streamlined processes designed to save your time without compromising quality",
                color: "from-accent/10 to-accent/5",
              },
              {
                icon: Users,
                title: "Dedicated Team",
                description: "Genuinely invested in your success with 24/7 support and regular follow-ups",
                color: "from-primary/10 to-primary/5",
              },
              {
                icon: CheckCircle2,
                title: "100% Transparent",
                description: "Clear communication, no hidden fees, and honest guidance at every step",
                color: "from-accent/10 to-accent/5",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`group bg-gradient-to-br ${item.color} border border-accent rounded-xl p-8 hover:shadow-lg transition-all hover:border-primary`}
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-primary/15 rounded-lg flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent, and efficient process designed for your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connection Lines - Hidden on Mobile */}
            <div className="hidden md:block absolute top-24 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {[
              {
                step: 1,
                title: "Register",
                description: "Fill out our secure online form with your information and requirements",
                icon: Briefcase,
              },
              {
                step: 2,
                title: "Assess",
                description: "Our experts thoroughly analyze your profile and qualifications",
                icon: Award,
              },
              {
                step: 3,
                title: "Guide",
                description: "Receive customized strategies and personalized recommendations",
                icon: Lightbulb,
              },
              {
                step: 4,
                title: "Succeed",
                description: "Achieve your goals with our continuous support and mentorship",
                icon: TrendingUp,
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative z-10 w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    {item.step}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from professionals who achieved their goals with our guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white border border-accent rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                <div className="border-t border-accent pt-4">
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-primary text-xs font-medium">{testimonial.role}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Find answers to common questions about our services</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-accent rounded-lg overflow-hidden hover:border-primary transition-colors"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-primary/5 transition-colors text-left"
                >
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                  {openFAQ === idx ? (
                    <X className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFAQ === idx && (
                  <div className="px-6 py-4 bg-primary/5 border-t border-accent">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 px-4 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Our Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Meet Our Experts</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white border border-accent rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-primary"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {member.initials}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{member.name}</h3>
                    <p className="text-primary font-semibold text-sm">{member.title}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Ready to Transform Your Future?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of successful professionals who have achieved their career and financial goals with Atithi
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/job-form">
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-base w-full sm:w-auto">
                Find Your Dream Job <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/loan-form">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-base bg-transparent w-full sm:w-auto"
              >
                Get Loan Support <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Disclaimer Section */}
      <section className="w-full py-16 px-4 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-3xl mx-auto text-center bg-white border-2 border-accent rounded-2xl p-8 md:p-12 space-y-4 hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold text-foreground">Our Commitment to You</h3>
          <p className="text-muted-foreground leading-relaxed text-base">
            We provide professional guidance and expert assistance throughout your job search and loan application
            journey. While we leverage our extensive expertise and proven strategies to support you, we cannot guarantee
            employment or loan approval. Your success depends on various factors including market conditions,
            qualifications, and lender policies. Our role is to help you present your best self and navigate the process
            with confidence, transparency, and professional support.
          </p>
          <div className="flex items-center justify-center gap-2 pt-4 text-sm text-primary font-semibold">
            <Shield className="w-5 h-5" />
            Certified & Trusted Consultant Services
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
