import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Crown, Medal, Trophy } from "lucide-react"

interface LeaderboardRowProps {
  rank: number
  avatar: string
  username: string
  xp: number
  balance: number
  isCurrentUser?: boolean
}

export function LeaderboardRow({ rank, avatar, username, xp, balance, isCurrentUser = false }: LeaderboardRowProps) {
  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Trophy className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
        isCurrentUser ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-8">{getRankIcon()}</div>
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={username} />
          <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{username}</span>
            {isCurrentUser && (
              <Badge variant="secondary" className="text-xs">
                You
              </Badge>
            )}
          </div>
          <span className="text-sm text-muted-foreground">{xp.toLocaleString()} XP</span>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-green-600">₹{balance.toLocaleString()}</div>
      </div>
    </div>
  )
}
