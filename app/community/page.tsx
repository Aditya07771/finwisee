import { DashboardLayout } from "@/components/Dashboard/dashboard-layout"
import { CommunityFeatures } from "@/components/Dashboard/community-features"

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-24">
      <div className="w-full max-w-7xl"></div>
      <CommunityFeatures />
    </div>
  )
}
