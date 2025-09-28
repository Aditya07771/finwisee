import { AIFinancialCoach } from "@/components/Dashboard/ai-financial-coach"

export default function CoachPage() {
  return (
    <div className="min-h-screen bg-background mt-18">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <AIFinancialCoach />
        </div>
      </div>
    </div>
  )
}