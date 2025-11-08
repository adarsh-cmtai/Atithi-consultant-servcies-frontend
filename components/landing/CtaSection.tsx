"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SectionWrapper, MotionH2, MotionP, MotionDiv, childVariants } from "./SectionWrapper"

export function CtaSection() {
  return (
    <SectionWrapper className="bg-background pb-20">
      <div className="relative max-w-5xl mx-auto">
        <div
          aria-hidden="true"
          className="absolute -inset-x-8 -top-20 -bottom-20 bg-primary/10 blur-3xl opacity-50"
        />
        <MotionDiv
          variants={childVariants}
          className="relative text-center rounded-2xl bg-gradient-to-br from-background via-primary/5 to-muted/40 p-12 md:p-16 border overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(#0047ab0a_1px,transparent_1px)] [background-size:16px_16px]"
          />
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <MotionH2 variants={childVariants} className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Ready to Transform Your Future?
              </MotionH2>
              <MotionP variants={childVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of successful professionals who have achieved their career and financial goals with Athith.
              </MotionP>
            </div>
            <MotionDiv variants={childVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/job-form">
                <Button size="lg" className="w-full sm:w-auto transition-transform hover:scale-105 cursor-pointer">
                  Find Your Dream Job <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/loan-form">
                <Button size="lg" variant="outline" className="w-full sm:w-auto transition-transform hover:scale-105 cursor-pointer">
                  Get Loan Support <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </MotionDiv>
          </div>
        </MotionDiv>
      </div>
    </SectionWrapper>
  )
}