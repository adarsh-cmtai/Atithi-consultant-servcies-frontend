"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/datepicker"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { User, Home, Briefcase, FileCheck, Check, ArrowRight, Loader2, IndianRupee, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import apiClient from "@/lib/api"
import Script from "next/script"

const APPLICATION_FEE = 450;
const CACHE_KEY = "loanApplicationFormData";

const steps = [
  { id: 1, name: "Personal Details", icon: User },
  { id: 2, name: "Contact & Address", icon: Home },
  { id: 3, name: "Financial Profile", icon: Briefcase },
  { id: 4, name: "Loan, Payment & Submission", icon: FileCheck },
]

const initialFormData = {
  fullName: "", pan: "", dob: undefined, gender: "", maritalStatus: "", contact: "", email: "", aadhaar: "",
  address: "", city: "", postalCode: "", country: "India", position: "", employmentDate: undefined,
  employmentType: "", monthlyIncome: "", otherIncome: "", loanAmount: "", loanPurpose: "", nomineeName: "",
  nomineeContact: "", nomineeAadhaar: "", declaration: false,
};

export default function LoanFormPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [paymentDetails, setPaymentDetails] = useState<{orderId: string; paymentId: string; signature: string} | null>(null);
  const { user } = useAppSelector((state) => state.auth)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      // Convert date strings back to Date objects
      if (parsed.dob) parsed.dob = new Date(parsed.dob);
      if (parsed.employmentDate) parsed.employmentDate = new Date(parsed.employmentDate);
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
            name: "Athith Consultant Services",
            description: "Loan Application Fee",
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
      await apiClient.post("/applications/loan", {
        applicationData: formData,
        paymentDetails: {
            orderId: paymentDetails.orderId,
            paymentId: paymentDetails.paymentId,
            amount: APPLICATION_FEE,
        }
      });
      toast({ title: "Application Submitted!", description: "We have received your loan application."});
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
                  <p className="text-muted-foreground">Please provide the required information for this section.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label htmlFor="fullName">Full Name</Label><Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required /></div>
                                <div><Label htmlFor="pan">PAN No</Label><Input id="pan" name="pan" value={formData.pan} onChange={handleInputChange} required /></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label htmlFor="dob">Date of Birth (DD/MM/YYYY)</Label><DatePicker value={formData.dob} onChange={(date) => handleDateChange("dob", date)} /></div>
                                <div><Label htmlFor="gender">Gender</Label><Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select></div>
                            </div>
                             <div><Label htmlFor="maritalStatus">Marital Status</Label><Select value={formData.maritalStatus} onValueChange={(value) => handleSelectChange("maritalStatus", value)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="single">Single</SelectItem><SelectItem value="married">Married</SelectItem><SelectItem value="divorced">Divorced</SelectItem><SelectItem value="widowed">Widowed</SelectItem></SelectContent></Select></div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label htmlFor="contact">Contact Number</Label><Input id="contact" name="contact" type="tel" value={formData.contact} onChange={handleInputChange} required /></div>
                                <div><Label htmlFor="email">Email Address</Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required /></div>
                            </div>
                             <div><Label htmlFor="aadhaar">Aadhaar Card</Label><Input id="aadhaar" name="aadhaar" value={formData.aadhaar} onChange={handleInputChange} /></div>
                            <div><Label htmlFor="address">Home Address</Label><Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required /></div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div><Label htmlFor="city">City</Label><Input id="city" name="city" value={formData.city} onChange={handleInputChange} required /></div>
                                <div><Label htmlFor="postalCode">Postal Code</Label><Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required /></div>
                                <div><Label htmlFor="country">Country</Label><Input id="country" name="country" value={formData.country} onChange={handleInputChange} required /></div>
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div><Label htmlFor="position">Position/Job Title</Label><Input id="position" name="position" value={formData.position} onChange={handleInputChange} required /></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label htmlFor="employmentDate">Date of Employment (DD/MM/YYYY)</Label><DatePicker value={formData.employmentDate} onChange={(date) => handleDateChange("employmentDate", date)} /></div>
                                <div><Label htmlFor="employmentType">Employment Type</Label><Select value={formData.employmentType} onValueChange={(value) => handleSelectChange("employmentType", value)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="permanent">Permanent</SelectItem><SelectItem value="contract">Contract</SelectItem></SelectContent></Select></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label htmlFor="monthlyIncome">Monthly Income</Label><Input id="monthlyIncome" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleInputChange} required /></div>
                                <div><Label htmlFor="otherIncome">Other Sources of Income (if any)</Label><Input id="otherIncome" name="otherIncome" value={formData.otherIncome} onChange={handleInputChange} /></div>
                            </div>
                        </div>
                    )}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <Card><CardHeader><CardTitle>Loan Details</CardTitle></CardHeader><CardContent className="space-y-6">
                                <div><Label htmlFor="loanAmount">Requested Loan Amount</Label><Input id="loanAmount" name="loanAmount" value={formData.loanAmount} onChange={handleInputChange} required /></div>
                                <div><Label htmlFor="loanPurpose">Purpose of Loan</Label><Select value={formData.loanPurpose} onValueChange={(value) => handleSelectChange("loanPurpose", value)}><SelectTrigger><SelectValue placeholder="Select purpose" /></SelectTrigger><SelectContent><SelectItem value="medical">Medical</SelectItem><SelectItem value="education">Education</SelectItem><SelectItem value="personal">Personal</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select></div>
                            </CardContent></Card>
                            <Card><CardHeader><CardTitle>Bank Information (Nominee)</CardTitle></CardHeader><CardContent className="space-y-6">
                                <div><Label htmlFor="nomineeName">Nominee Name</Label><Input id="nomineeName" name="nomineeName" value={formData.nomineeName} onChange={handleInputChange} required /></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><Label htmlFor="nomineeContact">Nominee Contact No</Label><Input id="nomineeContact" name="nomineeContact" type="tel" value={formData.nomineeContact} onChange={handleInputChange} required /></div>
                                    <div><Label htmlFor="nomineeAadhaar">Nominee Aadhaar No</Label><Input id="nomineeAadhaar" name="nomineeAadhaar" value={formData.nomineeAadhaar} onChange={handleInputChange} required /></div>
                                </div>
                            </CardContent></Card>
                            <Card>
                                <CardHeader><CardTitle>Payment & Declaration</CardTitle></CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg border">
                                        <div>
                                            <p className="font-semibold">Application Fee</p>
                                            <p className="text-sm text-muted-foreground">A one-time non-refundable fee.</p>
                                        </div>
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
                                        <Checkbox id="declaration" checked={formData.declaration} onCheckedChange={(checked) => handleCheckboxChange("declaration", checked as boolean)} />
                                        <Label htmlFor="declaration" className="text-sm font-normal text-muted-foreground">I hereby declare that all the information provided above is true and correct to the best of my knowledge. I further acknowledge that this application is submitted solely for the purpose of registration and screening, and does not guarantee employment or constitute a job offer.</Label>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                  <div className="flex justify-between items-center pt-8 border-t">
                    {currentStep > 1 ? (<Button type="button" variant="outline" onClick={prevStep}>Back</Button>) : (<div />)}
                    {currentStep < steps.length ? (<Button type="button" onClick={nextStep} className="group">Next Step <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" /></Button>) : (<Button type="submit" disabled={!formData.declaration || !paymentDetails || isSubmitting} className="group">{isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application"}</Button>)}
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