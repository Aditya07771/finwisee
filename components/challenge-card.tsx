import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Calendar, Clock } from "lucide-react"

interface ChallengeCardProps {
  title: string
  description: string
  progress: number
  maxProgress: number
  xpReward: number
  type: "daily" | "weekly" | "workshop"
  timeLeft?: string
}

export function ChallengeCard({
  title,
  description,
  progress,
  maxProgress,
  xpReward,
  type,
  timeLeft,
}: ChallengeCardProps) {
  const progressPercentage = (progress / maxProgress) * 100
  const isCompleted = progress >= maxProgress

  const getTypeIcon = () => {
    switch (type) {
      case "daily":
        return <Calendar className="h-4 w-4" />
      case "weekly":
        return <Clock className="h-4 w-4" />
      case "workshop":
        return <Trophy className="h-4 w-4" />
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case "daily":
        return "text-blue-600"
      case "weekly":
        return "text-purple-600"
      case "workshop":
        return "text-orange-600"
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 ${getTypeColor()}`}>
            {getTypeIcon()}
            <span className="text-xs font-medium uppercase tracking-wide">{type}</span>
          </div>
          {timeLeft && <span className="text-xs text-muted-foreground">{timeLeft}</span>}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">
              {progress}/{maxProgress}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Trophy className="h-4 w-4" />
            <span>{xpReward} XP</span>
          </div>
          <Button size="sm" disabled={isCompleted} className="bg-primary hover:bg-primary/90">
            {isCompleted ? "Completed" : "Complete Now"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
