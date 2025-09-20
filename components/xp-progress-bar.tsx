import { Progress } from "@/components/ui/progress"

interface XPProgressBarProps {
  currentXP: number
  xpForNext: number
  level: number
}

export function XPProgressBar({ currentXP, xpForNext, level }: XPProgressBarProps) {
  const progress = (currentXP / xpForNext) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Level {level}</span>
        <span className="text-sm font-medium text-muted-foreground">
          {currentXP}/{xpForNext} XP
        </span>
      </div>
      <Progress
        value={progress}
        className="h-3"
        aria-valuenow={currentXP}
        aria-valuemax={xpForNext}
        aria-label={`XP Progress: ${currentXP} out of ${xpForNext} XP needed for next level`}
      />
    </div>
  )
}
