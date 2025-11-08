"use client"

import { Shield, Lightbulb, Gem, Handshake } from "lucide-react"
import { SectionWrapper, MotionH2, MotionP, MotionDiv, childVariants } from "@/components/landing/SectionWrapper"

const coreValues = [
  {
    icon: Shield,
    title: "Client-First Integrity",
    description: "Your success is our primary measure of success. We operate with complete transparency and provide honest, straightforward advice, even when it's difficult. We build lasting relationships based on trust and mutual respect.",
  },
  {
    icon: Lightbulb,
    title: "Empowerment Through Guidance",
    description: "We don't just provide answers; we equip you with the knowledge, skills, and confidence to navigate your challenges independently. Our goal is to empower you to make informed decisions for your future.",
  },
  {
    icon: Gem,
    title: "Commitment to Excellence",
    description: "From the initial consultation to the final outcome, we are dedicated to delivering the highest quality of service. We continuously refine our strategies and stay updated on industry trends to ensure you receive the best possible support.",
  },
  {
    icon: Handshake,
    title: "Collaborative Partnership",
    description: "We view our clients as partners. We listen to your unique needs, collaborate on strategies, and work alongside you throughout your journey. Your goals become our shared objectives.",
  },
]

export function ValuesSection() {
  return (
    <SectionWrapper>
      <div className="text-center space-y-4 mb-20">
        <MotionH2 variants={childVariants} className="text-4xl md:text-5xl font-bold text-foreground text-balance">
          Our Core Values
        </MotionH2>
        <MotionP variants={childVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The principles that define our character and guide every decision we make.
        </MotionP>
      </div>

      <div className="space-y-24">
        {coreValues.map((value, idx) => (
          <MotionDiv
            key={idx}
            variants={childVariants}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            <div className={`space-y-6 ${idx % 2 === 1 ? "lg:order-last" : ""}`}>
              <div className="inline-flex items-center gap-3 bg-muted px-3 py-1.5 rounded-full">
                <value.icon className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">{value.description}</p>
            </div>
            
            <div className="relative h-80 rounded-2xl bg-muted overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
              <div className="w-full h-full flex items-center justify-center">
                <value.icon className="w-32 h-32 text-primary/20 group-hover:scale-110 transition-transform duration-500 ease-in-out" />
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </SectionWrapper>
  )
}