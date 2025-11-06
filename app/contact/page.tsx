"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    alert("Thank you for your message! We will get back to you soon.")
    setFormData({ fullName: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 w-full">
        {/* Page Header */}
        <section className="w-full py-16 px-4 bg-gradient-to-b from-muted to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-foreground mb-4">Get In Touch</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions? We are here to help. Reach out to us, and we'll respond as soon as we can.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column: Contact Form */}
              <Card className="border border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="fullName" className="text-foreground font-semibold mb-2 block">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Your name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="border-border"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-foreground font-semibold mb-2 block">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-border"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-foreground font-semibold mb-2 block">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="border-border"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-foreground font-semibold mb-2 block">
                        Your Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="border-border h-32"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6"
                    >
                      Submit Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Right Column: Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-foreground font-bold text-lg mb-6">Contact Details</h3>

                  <div className="space-y-4">
                    {/* Email */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold">Email</p>
                        <a href="mailto:support@careerfinancehub.com" className="text-primary hover:underline">
                          support@careerfinancehub.com
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold">Phone</p>
                        <a href="tel:+911234567890" className="text-primary hover:underline">
                          +91 12345 67890
                        </a>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold">Address</p>
                        <p className="text-muted-foreground">
                          123 Business Avenue
                          <br />
                          New Delhi, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div>
                  <h3 className="text-foreground font-bold text-lg mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Business Hours
                  </h3>

                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-semibold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-semibold">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-semibold">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
