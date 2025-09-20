import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BadgeCardProps {
  name: string
  icon: React.ReactNode
  tier: "bronze" | "silver" | "gold"
  isUnlocked: boolean
  criteria: string
}

export function BadgeCard({ name, icon, tier, isUnlocked, criteria }: BadgeCardProps) {
  const getTierColor = () => {
    switch (tier) {
      case "bronze":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "silver":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "gold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={`min-w-[120px] cursor-pointer transition-all duration-200 hover:scale-105 ${
              isUnlocked ? "shadow-md" : "opacity-50 grayscale"
            }`}
          >
            <CardContent className="p-4 text-center space-y-2">
              <div className="flex justify-center">
                {isUnlocked ? (
                  <div className="text-2xl">{icon}</div>
                ) : (
                  <Lock className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">{name}</h4>
                <Badge variant="outline" className={getTierColor()}>
                  {tier}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{criteria}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
