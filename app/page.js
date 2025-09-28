// app/page.js
import React from "react"
import Features from "@/components/Features"
import Hero from "@/components/hero"
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
