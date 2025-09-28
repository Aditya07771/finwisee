// app/page.js
import React from "react"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import CallToAction from "@/components/CallToAction"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
    </div>
  )
}

export default LandingPage
