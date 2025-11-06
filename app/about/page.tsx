"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Heart, Shield, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 w-full">
        {/* Page Header */}
        <section className="w-full py-16 px-4 bg-gradient-to-b from-muted to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-foreground mb-4">About CareerFinance Hub</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Empowering individuals to achieve their professional and financial aspirations.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="w-full py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Column: Text */}
              <div>
                <h2 className="text-foreground mb-6">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At CareerFinance Hub, we believe that everyone deserves access to expert guidance and support in their
                  professional and financial journey. Our mission is to bridge the gap between job seekers and their
                  career aspirations, while providing comprehensive assistance for loan applications.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We understand the challenges that come with navigating the job market and financial institutions.
                  That's why we've built a comprehensive platform that offers personalized guidance, expert review, and
                  transparent communication every step of the way.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our team of experienced professionals is committed to helping you make informed decisions and achieve
                  your goals with confidence.
                </p>
              </div>

              {/* Right Column: Image */}
              <div className="relative w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden">
                <Image src="/professional-office-team-meeting.jpg" alt="Professional team meeting" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-16 px-4 bg-muted">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-foreground text-center mb-12">Meet Our Experts</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <Card className="border border-border shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                    <Image
                      src="/professional-man-headshot.png"
                      alt="Team member"
                      width={96}
                      height={96}
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-foreground font-bold text-lg mb-1">Rajesh Kumar</h3>
                  <p className="text-primary font-semibold mb-3">Lead Career Consultant</p>
                  <p className="text-muted-foreground text-sm">
                    With 10+ years of experience in career development, Rajesh specializes in job placement and career
                    transformation.
                  </p>
                </CardContent>
              </Card>

              {/* Team Member 2 */}
              <Card className="border border-border shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                    <Image
                      src="/professional-woman-headshot.png"
                      alt="Team member"
                      width={96}
                      height={96}
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-foreground font-bold text-lg mb-1">Priya Sharma</h3>
                  <p className="text-primary font-semibold mb-3">Financial Advisor</p>
                  <p className="text-muted-foreground text-sm">
                    Priya brings 8+ years of financial advisory experience, helping clients navigate loan applications
                    with ease.
                  </p>
                </CardContent>
              </Card>

              {/* Team Member 3 */}
              <Card className="border border-border shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                    <Image
                      src="/diverse-professional-headshots.png"
                      alt="Team member"
                      width={96}
                      height={96}
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-foreground font-bold text-lg mb-1">Amit Patel</h3>
                  <p className="text-primary font-semibold mb-3">Application Specialist</p>
                  <p className="text-muted-foreground text-sm">
                    Amit has 6+ years of experience in processing and reviewing applications for both jobs and loans.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="w-full py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-foreground text-center mb-12">Our Core Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value 1: Transparency */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-foreground font-bold text-lg mb-3">Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in honest communication and clear information. You'll always know where you stand in the
                  process.
                </p>
              </div>

              {/* Value 2: Integrity */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-foreground font-bold text-lg mb-3">Integrity</h3>
                <p className="text-muted-foreground">
                  We maintain the highest ethical standards and treat every client with respect and professionalism.
                </p>
              </div>

              {/* Value 3: Dedication */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-foreground font-bold text-lg mb-3">Dedication</h3>
                <p className="text-muted-foreground">
                  Your success is our priority. We're dedicated to helping you achieve your goals.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
