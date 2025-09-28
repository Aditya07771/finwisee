import { DashboardLayout } from "@/components/Dashboard/dashboard-layout"
import { GamificationSystem } from "@/components/Dashboard/gamification-system"

export default function ProgressPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-24">
      <div className="w-full max-w-7xl">
        <GamificationSystem />
      </div>
    </div>
  )
}