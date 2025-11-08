"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/datepicker"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { User, Briefcase, Check, ArrowRight, Loader2, History, BookOpen, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import apiClient from "@/lib/api"
import Script from "next/script"

const APPLICATION_FEE = 450;
const CACHE_KEY = "jobApplicationFormData";

const steps = [
  { id: 1, name: "Personal Information", icon: User },
  { id: 2, name: "Job Details", icon: Briefcase },
  { id: 3, name: "Employment & Education", icon: History },
  { id: 4, name: "Payment & Submission", icon: Check },
]

const initialFormData = {
    fullName: "", dob: undefined, age: "", gender: "", address: "", city: "", state: "", zip: "", phone: "", email: "",
    position: "", currentSalary: "", expectedSalary: "", experience: "", currentLocation: "", noticePeriod: "",
    preferLocation: "", authorized: false, employerName: "", department: "", startDate: undefined, endDate: undefined,
    reasonForLeaving: "", currentDesignation: "", degree: "", percentage: "", aadhaar: "", uan: "",
    languages: "", declaration: false,
};

export default function JobFormPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState(initialFormData);
  const [paymentDetails, setPaymentDetails] = useState<{orderId: string; paymentId: string; signature: string} | null>(null);
  const { user } = useAppSelector((state) => state.auth)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
        const parsed = JSON.parse(cachedData);
        if (parsed.dob) parsed.dob = new Date(parsed.dob);
        if (parsed.startDate) parsed.startDate = new Date(parsed.startDate);
        if (parsed.endDate) parsed.endDate = new Date(parsed.endDate);
        setFormData(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(formData));
  }, [formData]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSelectChange = (name: string, value: string) => setFormData((prev) => ({ ...prev, [name]: value }))
  const handleDateChange = (name: string, date?: Date) => setFormData((prev) => ({ ...prev, [name]: date }))
  const handleCheckboxChange = (name: string, checked: boolean) => setFormData((prev) => ({ ...prev, [name]: checked }))
  const handleRadioChange = (name: string, value: string) => setFormData((prev) => ({ ...prev, [name]: value }))

  const nextStep = () => currentStep < steps.length && setCurrentStep(currentStep + 1)
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1)
  
  const handlePayment = async () => {
    if (!user) {
        toast({ title: "Authentication Error", description: "You must be logged in to make a payment.", variant: "destructive"});
        router.push("/login");
        return;
    }
    
    setIsSubmitting(true);
    try {
        const { data: order } = await apiClient.post("/payment/create-order", { amount: APPLICATION_FEE });

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: "INR",
            name: "Athithi Consultant Services",
            description: "Job Application Fee",
            order_id: order.id,
            handler: async function (response: any) {
                const { data } = await apiClient.post("/payment/verify-payment", {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });

                if (data.success) {
                    toast({ title: "Payment Successful!", description: "You can now submit your application."});
                    setPaymentDetails({ orderId: response.razorpay_order_id, paymentId: response.razorpay_payment_id, signature: response.razorpay_signature });
                } else {
                    toast({ title: "Payment Verification Failed", variant: "destructive"});
                }
            },
            prefill: {
                name: user.fullName,
                email: user.email,
            },
            theme: {
                color: "#0047ab",
            },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();

    } catch (error) {
        toast({ title: "Payment Error", description: "Could not initiate payment. Please try again.", variant: "destructive"});
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentDetails) {
        toast({ title: "Payment Required", description: "Please complete the payment before submitting.", variant: "destructive"});
        return;
    }
    setIsSubmitting(true)
    try {
      await apiClient.post("/applications/job", {
        applicationData: formData,
        paymentDetails: {
            orderId: paymentDetails.orderId,
            paymentId: paymentDetails.paymentId,
            amount: APPLICATION_FEE,
        }
      });
      toast({ title: "Application Submitted!", description: "We have received your job application."});
      localStorage.removeItem(CACHE_KEY);
      router.push("/customer/applications");
    } catch (error: any) {
      toast({ title: "Submission Failed", description: error.response?.data?.message || "An error occurred.", variant: "destructive"})
    } finally {
      setIsSubmitting(false)
    }
  }

  const StepIcon = steps[currentStep - 1].icon

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="min-h-screen flex flex-col bg-muted/40">
        <Navbar />
        <main className="flex-1 w-full py-12 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="font-bold text-lg mb-4">Application Steps</h2>
                <nav className="space-y-2">
                  {steps.map((step) => (
                    <button key={step.id} onClick={() => step.id < currentStep && setCurrentStep(step.id)} className={cn("w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors", currentStep === step.id ? "bg-primary text-primary-foreground" : step.id < currentStep ? "bg-muted hover:bg-muted/80" : "bg-transparent text-muted-foreground", step.id < currentStep && "cursor-pointer")} disabled={step.id >= currentStep}>
                      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0", currentStep === step.id ? "bg-primary-foreground text-primary" : step.id < currentStep ? "bg-primary text-primary-foreground" : "bg-border")}>
                        {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
                      </div>
                      <span>{step.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="lg:col-span-3">
              <div className="bg-background p-8 rounded-2xl shadow-sm border">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><StepIcon className="w-6 h-6 text-primary" /></div><h1 className="text-2xl font-bold text-foreground">{steps[currentStep - 1].name}</h1></div>
                  <p className="text-muted-foreground">Please fill out the details for the current section.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label htmlFor="fullName">Full Name</Label><Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required /></div>
                        <div><Label htmlFor="dob">Date of Birth</Label><DatePicker value={formData.dob} onChange={(date) => handleDateChange("dob", date)} /></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div><Label>Gender</Label><RadioGroup value={formData.gender} onValueChange={(value) => handleRadioChange("gender", value)} className="flex items-center space-x-4 pt-2"><div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Male</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Female</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="other" id="other" /><Label htmlFor="other">Other</Label></div></RadioGroup></div>
                         <div><Label htmlFor="age">Age</Label><Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} /></div>
                      </div>
                      <div><Label htmlFor="address">Home Town Address</Label><Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required /></div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div><Label htmlFor="city">City</Label><Input id="city" name="city" value={formData.city} onChange={handleInputChange} required /></div>
                        <div><Label htmlFor="state">State</Label><Input id="state" name="state" value={formData.state} onChange={handleInputChange} required /></div>
                        <div><Label htmlFor="zip">ZIP Code</Label><Input id="zip" name="zip" value={formData.zip} onChange={handleInputChange} required /></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required /></div>
                        <div><Label htmlFor="email">Email Address</Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required /></div>
                      </div>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                        <div><Label htmlFor="position">Position Applied For</Label><Input id="position" name="position" value={formData.position} onChange={handleInputChange} required /></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><Label htmlFor="currentSalary">Current Salary (PA)</Label><Input id="currentSalary" name="currentSalary" value={formData.currentSalary} onChange={handleInputChange} /></div>
                            <div><Label htmlFor="expectedSalary">Expected Salary (PA)</Label><Input id="expectedSalary" name="expectedSalary" value={formData.expectedSalary} onChange={handleInputChange} required /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><Label htmlFor="experience">Total years' Experience</Label><Input id="experience" name="experience" type="number" value={formData.experience} onChange={handleInputChange} required /></div>
                            <div><Label htmlFor="currentLocation">Current Location</Label><Input id="currentLocation" name="currentLocation" value={formData.currentLocation} onChange={handleInputChange} required /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><Label htmlFor="noticePeriod">Notice Period</Label><Select value={formData.noticePeriod} onValueChange={(value) => handleSelectChange("noticePeriod", value)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="immediate">Immediate</SelectItem><SelectItem value="15days">15 Days</SelectItem><SelectItem value="1month">1 Month</SelectItem><SelectItem value="2months">2 Months</SelectItem><SelectItem value="3months+">3+ Months</SelectItem></SelectContent></Select></div>
                            <div><Label htmlFor="preferLocation">Prefer Location</Label><Input id="preferLocation" name="preferLocation" value={formData.preferLocation} onChange={handleInputChange} required /></div>
                        </div>
                    </div>
                  )}
                  {currentStep === 3 && (
                     <div className="space-y-6">
                        <Card><CardHeader><CardTitle>Most Recent Employer</CardTitle></CardHeader><CardContent className="space-y-6">
                            <div><Label htmlFor="employerName">Employer Name</Label><Input id="employerName" name="employerName" value={formData.employerName} onChange={handleInputChange} /></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label htmlFor="department">Department</Label><Input id="department" name="department" value={formData.department} onChange={handleInputChange} /></div>
                                <div><Label htmlFor="currentDesignation">Designation</Label><Input id="currentDesignation" name="currentDesignation" value={formData.currentDesignation} onChange={handleInputChange} /></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label htmlFor="startDate">Start Date</Label><DatePicker value={formData.startDate} onChange={(date) => handleDateChange("startDate", date)} /></div>
                                <div><Label htmlFor="endDate">End Date</Label><DatePicker value={formData.endDate} onChange={(date) => handleDateChange("endDate", date)} /></div>
                            </div>
                            <div><Label htmlFor="reasonForLeaving">Reason for Leaving</Label><Textarea id="reasonForLeaving" name="reasonForLeaving" value={formData.reasonForLeaving} onChange={handleInputChange} /></div>
                        </CardContent></Card>
                        <Card><CardHeader><CardTitle>Educational Qualifications</CardTitle></CardHeader><CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label htmlFor="degree">Highest Degree</Label><Input id="degree" name="degree" value={formData.degree} onChange={handleInputChange} /></div>
                                <div><Label htmlFor="percentage">Percentage</Label><Input id="percentage" name="percentage" type="number" value={formData.percentage} onChange={handleInputChange} /></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label htmlFor="aadhaar">Aadhaar Card Number</Label><Input id="aadhaar" name="aadhaar" value={formData.aadhaar} onChange={handleInputChange} /></div>
                                <div><Label htmlFor="uan">UAN No</Label><Input id="uan" name="uan" value={formData.uan} onChange={handleInputChange} /></div>
                            </div>
                            <div><Label htmlFor="languages">Languages Known</Label><Input id="languages" name="languages" value={formData.languages} onChange={handleInputChange} /></div>
                        </CardContent></Card>
                     </div>
                  )}
                  {currentStep === 4 && (
                      <Card>
                        <CardHeader><CardTitle>Payment & Declaration</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-muted rounded-lg border">
                                <div><p className="font-semibold">Application Fee</p><p className="text-sm text-muted-foreground">One-time non-refundable registration fee.</p></div>
                                <p className="text-2xl font-bold">₹{APPLICATION_FEE}</p>
                            </div>
                            
                            {paymentDetails ? (
                                <div className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                                    <ShieldCheck className="w-5 h-5 mr-3" />
                                    <p className="font-semibold">Payment Successful!</p>
                                </div>
                            ) : (
                                <Button type="button" onClick={handlePayment} disabled={isSubmitting} className="w-full">
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : `Proceed to Pay ₹${APPLICATION_FEE}`}
                                </Button>
                            )}

                            <div className="flex items-start space-x-3 pt-4">
                                <Checkbox id="authorized" checked={formData.authorized} onCheckedChange={(checked) => handleCheckboxChange("authorized", checked as boolean)} />
                                <Label htmlFor="authorized" className="text-sm font-normal">Are you legally authorized to work in this country?</Label>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Checkbox id="declaration" checked={formData.declaration} onCheckedChange={(checked) => handleCheckboxChange("declaration", checked as boolean)} />
                                <Label htmlFor="declaration" className="text-sm font-normal text-muted-foreground">I hereby declare that all information provided above is true and correct to the best of my knowledge and I hereby declare that I have submitted this application for purpose of registration and screening only, not guarantee employment or any job offer.</Label>
                            </div>
                        </CardContent>
                    </Card>
                  )}
                  <div className="flex justify-between items-center pt-8 border-t">
                    {currentStep > 1 ? (<Button type="button" variant="outline" onClick={prevStep}>Back</Button>) : (<div />)}
                    {currentStep < steps.length ? (<Button type="button" onClick={nextStep} className="group">Next Step <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" /></Button>) : (<Button type="submit" disabled={!formData.declaration || !formData.authorized || !paymentDetails || isSubmitting} className="group">{isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application"}</Button>)}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}