"use client"

import { Shield } from "lucide-react"
import { SectionWrapper, MotionDiv, childVariants } from "./SectionWrapper"

export function DisclaimerSection() {
  return (
    <SectionWrapper className="pt-16 pb-20 bg-muted/40">
      <div className="max-w-5xl mx-auto">
        <MotionDiv
          variants={childVariants}
          className="bg-card border rounded-2xl grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-12 p-8 md:p-12"
        >
          <div className="lg:col-span-1 flex justify-center">
            <div className="w-40 h-40 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
              <Shield className="w-20 h-20 text-primary" />
            </div>
          </div>

          <div className="lg:col-span-2 text-center lg:text-left space-y-4">
            <h3 className="text-3xl font-bold text-foreground">Our Pledge of Guidance & Transparency</h3>
            <div className="space-y-3 text-muted-foreground leading-relaxed text-base">
              <p>
                Our primary mission is to be your dedicated partner throughout your career and financial journey. We equip you with professional tools, expert guidance, and strategic support to navigate the complexities of the job search and loan application processes.
              </p>
              <p>
                It's important to understand that the final decision for employment or loan approval rests solely with the hiring companies and financial institutions. While we are committed to maximizing your potential, we cannot guarantee specific outcomes. This transparency is a cornerstone of our professional integrity.
              </p>
              <p>
                Our promise is to empower you with the confidence, clarity, and a compelling presentation needed to put your best foot forward at every stage.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 pt-4 text-base text-foreground font-semibold">
              <Shield className="w-5 h-5 text-primary" />
              <span>Certified & Trusted Consultant Services</span>
            </div>
          </div>
        </MotionDiv>
      </div>
    </SectionWrapper>
  )
} 