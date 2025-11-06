"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Plus } from "lucide-react"

export default function JobForm() {
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    dob: "",
    age: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    // Job Details
    position: "",
    currentSalary: "",
    expectedSalary: "",
    experience: "",
    currentLocation: "",
    noticePeriod: "",
    preferLocation: "",
    authorized: false,
    // Employment History
    employerName: "",
    department: "",
    startDate: "",
    endDate: "",
    reasonForLeaving: "",
    currentDesignation: "",
    // Education
    degree: "",
    percentage: "",
    aadhaar: "",
    uan: "",
    languages: "",
    // References
    references: [
      { name: "", relationship: "", phone: "", email: "" },
      { name: "", relationship: "", phone: "", email: "" },
    ],
    declaration: false,
  })

  const [references, setReferences] = useState([
    { name: "", relationship: "", phone: "", email: "" },
    { name: "", relationship: "", phone: "", email: "" },
  ])

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

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleReferenceChange = (index: number, field: string, value: string) => {
    const newReferences = [...references]
    newReferences[index] = { ...newReferences[index], [field]: value }
    setReferences(newReferences)
  }

  const addReference = () => {
    setReferences([...references, { name: "", relationship: "", phone: "", email: "" }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { ...formData, references })
    alert("Thank you for your application! We will review it shortly.")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 w-full py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-foreground mb-2">Job Registration Form</h1>
            <p className="text-muted-foreground">
              Please fill out all required fields to complete your job application.
            </p>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-foreground font-semibold mb-2 block">
                      Age
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground font-semibold mb-4 block">Gender</Label>
                    <RadioGroup value={formData.gender} onValueChange={(value) => handleRadioChange("gender", value)}>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male" className="font-normal cursor-pointer">
                            Male
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female" className="font-normal cursor-pointer">
                            Female
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other" className="font-normal cursor-pointer">
                            Other
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-foreground font-semibold mb-2 block">
                    Home Town Address
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter your home address"
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
                    <Label htmlFor="state" className="text-foreground font-semibold mb-2 block">
                      State
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="Delhi"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-foreground font-semibold mb-2 block">
                      ZIP Code
                    </Label>
                    <Input
                      id="zip"
                      name="zip"
                      placeholder="110001"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-foreground font-semibold mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
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
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="position" className="text-foreground font-semibold mb-2 block">
                    Position Applied For
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
                    <Label htmlFor="currentSalary" className="text-foreground font-semibold mb-2 block">
                      Current Salary (PA)
                    </Label>
                    <Input
                      id="currentSalary"
                      name="currentSalary"
                      placeholder="₹ 10,00,000"
                      value={formData.currentSalary}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expectedSalary" className="text-foreground font-semibold mb-2 block">
                      Expected Salary (PA)
                    </Label>
                    <Input
                      id="expectedSalary"
                      name="expectedSalary"
                      placeholder="₹ 15,00,000"
                      value={formData.expectedSalary}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience" className="text-foreground font-semibold mb-2 block">
                      Total Years' Experience
                    </Label>
                    <Input
                      id="experience"
                      name="experience"
                      type="number"
                      placeholder="5"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentLocation" className="text-foreground font-semibold mb-2 block">
                      Current Location
                    </Label>
                    <Input
                      id="currentLocation"
                      name="currentLocation"
                      placeholder="New Delhi"
                      value={formData.currentLocation}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="noticePeriod" className="text-foreground font-semibold mb-2 block">
                      Notice Period
                    </Label>
                    <Select
                      value={formData.noticePeriod}
                      onValueChange={(value) => handleSelectChange("noticePeriod", value)}
                    >
                      <SelectTrigger className="border-border">
                        <SelectValue placeholder="Select notice period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="15days">15 Days</SelectItem>
                        <SelectItem value="1month">1 Month</SelectItem>
                        <SelectItem value="2months">2 Months</SelectItem>
                        <SelectItem value="3months">3 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="preferLocation" className="text-foreground font-semibold mb-2 block">
                      Preferred Location
                    </Label>
                    <Input
                      id="preferLocation"
                      name="preferLocation"
                      placeholder="Bangalore"
                      value={formData.preferLocation}
                      onChange={handleInputChange}
                      className="border-border"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-border">
                  <Checkbox
                    id="authorized"
                    checked={formData.authorized}
                    onCheckedChange={(checked) => handleCheckboxChange("authorized", checked as boolean)}
                  />
                  <Label htmlFor="authorized" className="font-normal cursor-pointer text-muted-foreground">
                    Are you legally authorized to work in this country?
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Employment History */}
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Employment History</CardTitle>
                <CardDescription className="text-muted-foreground">Most Recent Employer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employerName" className="text-foreground font-semibold mb-2 block">
                      Employer Name
                    </Label>
                    <Input
                      id="employerName"
                      name="employerName"
                      placeholder="Company Name"
                      value={formData.employerName}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department" className="text-foreground font-semibold mb-2 block">
                      Department
                    </Label>
                    <Input
                      id="department"
                      name="department"
                      placeholder="Engineering"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate" className="text-foreground font-semibold mb-2 block">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate" className="text-foreground font-semibold mb-2 block">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reasonForLeaving" className="text-foreground font-semibold mb-2 block">
                    Reason for Leaving
                  </Label>
                  <Textarea
                    id="reasonForLeaving"
                    name="reasonForLeaving"
                    placeholder="Explain your reason for leaving"
                    value={formData.reasonForLeaving}
                    onChange={handleInputChange}
                    className="border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="currentDesignation" className="text-foreground font-semibold mb-2 block">
                    Current Designation
                  </Label>
                  <Input
                    id="currentDesignation"
                    name="currentDesignation"
                    placeholder="Senior Engineer"
                    value={formData.currentDesignation}
                    onChange={handleInputChange}
                    className="border-border"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Educational Qualifications */}
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Educational Qualifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="degree" className="text-foreground font-semibold mb-2 block">
                      Highest Degree
                    </Label>
                    <Input
                      id="degree"
                      name="degree"
                      placeholder="B.Tech Computer Science"
                      value={formData.degree}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="percentage" className="text-foreground font-semibold mb-2 block">
                      Percentage
                    </Label>
                    <Input
                      id="percentage"
                      name="percentage"
                      type="number"
                      placeholder="85.5"
                      value={formData.percentage}
                      onChange={handleInputChange}
                      className="border-border"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="aadhaar" className="text-foreground font-semibold mb-2 block">
                      Aadhaar Card Number
                    </Label>
                    <Input
                      id="aadhaar"
                      name="aadhaar"
                      placeholder="XXXX XXXX XXXX"
                      value={formData.aadhaar}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="uan" className="text-foreground font-semibold mb-2 block">
                      UAN No
                    </Label>
                    <Input
                      id="uan"
                      name="uan"
                      placeholder="UAN Number"
                      value={formData.uan}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="languages" className="text-foreground font-semibold mb-2 block">
                    Languages Known
                  </Label>
                  <Input
                    id="languages"
                    name="languages"
                    placeholder="English, Hindi, Spanish"
                    value={formData.languages}
                    onChange={handleInputChange}
                    className="border-border"
                  />
                </div>
              </CardContent>
            </Card>

            {/* References */}
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">References</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-foreground">Name</TableHead>
                        <TableHead className="text-foreground">Relationship</TableHead>
                        <TableHead className="text-foreground">Phone No</TableHead>
                        <TableHead className="text-foreground">Email Id</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {references.map((ref, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              placeholder="Name"
                              value={ref.name}
                              onChange={(e) => handleReferenceChange(index, "name", e.target.value)}
                              className="border-border"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="Relationship"
                              value={ref.relationship}
                              onChange={(e) => handleReferenceChange(index, "relationship", e.target.value)}
                              className="border-border"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="Phone"
                              value={ref.phone}
                              onChange={(e) => handleReferenceChange(index, "phone", e.target.value)}
                              className="border-border"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="Email"
                              type="email"
                              value={ref.email}
                              onChange={(e) => handleReferenceChange(index, "email", e.target.value)}
                              className="border-border"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={addReference}
                  className="mt-4 border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Reference
                </Button>
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
                    I hereby declare that all the information provided in this form is true, accurate, and complete to
                    the best of my knowledge. I understand that any false or misleading information may result in
                    rejection of my application or termination of services. I also authorize CareerFinance Hub to verify
                    the information provided.
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={!formData.declaration}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6"
                >
                  Submit Application
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
