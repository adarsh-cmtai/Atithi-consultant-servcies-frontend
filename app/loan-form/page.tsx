"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LoanForm() {
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    pan: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    contact: "",
    email: "",
    aadhaar: "",
    otp: "",
    // Home Address
    address: "",
    city: "",
    postalCode: "",
    country: "India",
    // Employment Details
    position: "",
    employmentDate: "",
    employmentType: "",
    monthlyIncome: "",
    otherIncome: "",
    // Loan Details
    loanAmount: "",
    loanPurpose: "",
    // Bank & Nominee
    nomineeName: "",
    nomineeContact: "",
    nomineeAadhaar: "",
    declaration: false,
  })

  const [otpSent, setOtpSent] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleOtpChange = (value: string) => {
    setFormData((prev) => ({ ...prev, otp: value }))
  }

  const handleSendOtp = () => {
    if (formData.aadhaar) {
      setOtpSent(true)
      alert("OTP sent to your registered email and phone number")
    } else {
      alert("Please enter your Aadhaar number first")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Loan form submitted:", formData)
    alert("Your loan application has been submitted successfully! We will review it shortly.")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 w-full py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-foreground mb-2">Loan Application Form</h1>
            <p className="text-muted-foreground">Please fill out all required fields to apply for a loan.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-foreground font-semibold mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pan" className="text-foreground font-semibold mb-2 block">
                      PAN No
                    </Label>
                    <Input
                      id="pan"
                      name="pan"
                      placeholder="AAAAA0000A"
                      value={formData.pan}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dob" className="text-foreground font-semibold mb-2 block">
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender" className="text-foreground font-semibold mb-2 block">
                      Gender
                    </Label>
                    <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                      <SelectTrigger className="border-border">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maritalStatus" className="text-foreground font-semibold mb-2 block">
                      Marital Status
                    </Label>
                    <Select
                      value={formData.maritalStatus}
                      onValueChange={(value) => handleSelectChange("maritalStatus", value)}
                    >
                      <SelectTrigger className="border-border">
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="contact" className="text-foreground font-semibold mb-2 block">
                      Contact Number
                    </Label>
                    <Input
                      id="contact"
                      name="contact"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground font-semibold mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-border"
                    required
                  />
                </div>

                {/* Aadhaar Verification */}
                <div className="pt-4 border-t border-border">
                  <Label className="text-foreground font-semibold mb-4 block">Aadhaar Card Verification</Label>
                  <div className="flex gap-4 mb-4">
                    <Input
                      placeholder="XXXX XXXX XXXX"
                      value={formData.aadhaar}
                      onChange={(e) => setFormData((prev) => ({ ...prev, aadhaar: e.target.value }))}
                      className="border-border flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Send OTP
                    </Button>
                  </div>

                  {otpSent && (
                    <div>
                      <Label className="text-foreground font-semibold mb-2 block">Enter 6-Digit OTP</Label>
                      <InputOTP maxLength={6} value={formData.otp} onChange={handleOtpChange}>
                        <InputOTPGroup className="flex gap-2">
                          <InputOTPSlot index={0} className="w-12 h-12 border border-border" />
                          <InputOTPSlot index={1} className="w-12 h-12 border border-border" />
                          <InputOTPSlot index={2} className="w-12 h-12 border border-border" />
                          <InputOTPSlot index={3} className="w-12 h-12 border border-border" />
                          <InputOTPSlot index={4} className="w-12 h-12 border border-border" />
                          <InputOTPSlot index={5} className="w-12 h-12 border border-border" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-secondary/10 border border-secondary rounded-lg">
                  <p className="text-foreground font-semibold">Application Fee: Rs. 450/-</p>
                </div>
              </CardContent>
            </Card>

            {/* Home Address */}
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Home Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="address" className="text-foreground font-semibold mb-2 block">
                    Full Address Line
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border-border"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-foreground font-semibold mb-2 block">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="New Delhi"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-foreground font-semibold mb-2 block">
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      placeholder="110001"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-foreground font-semibold mb-2 block">
                      Country
                    </Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="border-border"
                      disabled
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Employment Details */}
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Employment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="position" className="text-foreground font-semibold mb-2 block">
                    Position/Job Title
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    placeholder="Software Engineer"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="border-border"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employmentDate" className="text-foreground font-semibold mb-2 block">
                      Date of Employment
                    </Label>
                    <Input
                      id="employmentDate"
                      name="employmentDate"
                      type="date"
                      value={formData.employmentDate}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="employmentType" className="text-foreground font-semibold mb-2 block">
                      Employment Type
                    </Label>
                    <Select
                      value={formData.employmentType}
                      onValueChange={(value) => handleSelectChange("employmentType", value)}
                    >
                      <SelectTrigger className="border-border">
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="permanent">Permanent</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monthlyIncome" className="text-foreground font-semibold mb-2 block">
                      Monthly Income
                    </Label>
                    <Input
                      id="monthlyIncome"
                      name="monthlyIncome"
                      placeholder="₹ 50,000"
                      value={formData.monthlyIncome}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="otherIncome" className="text-foreground font-semibold mb-2 block">
                      Other Sources of Income
                    </Label>
                    <Input
                      id="otherIncome"
                      name="otherIncome"
                      placeholder="₹ 0"
                      value={formData.otherIncome}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Details */}
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Loan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="loanAmount" className="text-foreground font-semibold mb-2 block">
                    Requested Loan Amount
                  </Label>
                  <Input
                    id="loanAmount"
                    name="loanAmount"
                    placeholder="₹ 5,00,000"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    className="border-border"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="loanPurpose" className="text-foreground font-semibold mb-2 block">
                    Purpose of Loan
                  </Label>
                  <Select
                    value={formData.loanPurpose}
                    onValueChange={(value) => handleSelectChange("loanPurpose", value)}
                  >
                    <SelectTrigger className="border-border">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home Loan</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="vehicle">Vehicle</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Bank & Nominee Information */}
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Bank & Nominee Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="nomineeName" className="text-foreground font-semibold mb-2 block">
                    Nominee Name
                  </Label>
                  <Input
                    id="nomineeName"
                    name="nomineeName"
                    placeholder="Jane Doe"
                    value={formData.nomineeName}
                    onChange={handleInputChange}
                    className="border-border"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nomineeContact" className="text-foreground font-semibold mb-2 block">
                      Nominee Contact No
                    </Label>
                    <Input
                      id="nomineeContact"
                      name="nomineeContact"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.nomineeContact}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nomineeAadhaar" className="text-foreground font-semibold mb-2 block">
                      Nominee Aadhaar No
                    </Label>
                    <Input
                      id="nomineeAadhaar"
                      name="nomineeAadhaar"
                      placeholder="XXXX XXXX XXXX"
                      value={formData.nomineeAadhaar}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Declaration & Submission */}
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Declaration & Submission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                  <Checkbox
                    id="declaration"
                    checked={formData.declaration}
                    onCheckedChange={(checked) => handleCheckboxChange("declaration", checked as boolean)}
                  />
                  <Label
                    htmlFor="declaration"
                    className="font-normal cursor-pointer text-muted-foreground leading-relaxed"
                  >
                    I hereby declare that all the information provided in this application is true, accurate, and
                    complete. I understand the terms and conditions of the loan and agree to abide by them. I authorize
                    CareerFinance Hub to verify all the information provided.
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={!formData.declaration}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6"
                >
                  Submit Loan Application
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
