//components/Dashboard/gamification-system.tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Award,
  Star,
  Target,
  TrendingUp,
  Calendar,
  Users,
  BookOpen,
  PiggyBank,
  Zap,
  Crown,
  Medal,
  Gift,
} from "lucide-react"

const userStats = {
  level: 3,
  currentXP: 1250,
  nextLevelXP: 2000,
  totalPoints: 8750,
  streak: 12,
  rank: 47,
  totalUsers: 1250,
}

const badges = [
  {
    id: 1,
    name: "Budget Master",
    description: "Stay within budget for 3 consecutive months",
    icon: PiggyBank,
    earned: true,
    rarity: "gold",
    points: 500,
    earnedDate: "2 days ago",
  },
  {
    id: 2,
    name: "Learning Champion",
    description: "Complete 10 financial courses",
    icon: BookOpen,
    earned: true,
    rarity: "silver",
    points: 300,
    earnedDate: "1 week ago",
  },
  {
    id: 3,
    name: "Savings Guru",
    description: "Save 20% of income consistently for 6 months",
    icon: Target,
    earned: false,
    rarity: "gold",
    points: 750,
    progress: 67,
  },
  {
    id: 4,
    name: "Community Helper",
    description: "Help 5 other users with financial advice",
    icon: Users,
    earned: false,
    rarity: "bronze",
    points: 200,
    progress: 40,
  },
  {
    id: 5,
    name: "Investment Rookie",
    description: "Make your first investment through the platform",
    icon: TrendingUp,
    earned: true,
    rarity: "bronze",
    points: 150,
    earnedDate: "3 weeks ago",
  },
  {
    id: 6,
    name: "Streak Master",
    description: "Maintain a 30-day learning streak",
    icon: Zap,
    earned: false,
    rarity: "silver",
    points: 400,
    progress: 40,
  },
]

const challenges = [
  {
    id: 1,
    title: "Save ₹500 in 7 Days",
    description: "Challenge yourself to save ₹500 by cutting unnecessary expenses",
    reward: 100,
    timeLeft: "3 days",
    participants: 234,
    difficulty: "Easy",
    progress: 60,
  },
  {
    id: 2,
    title: "Track All Expenses for a Week",
    description: "Log every single expense for 7 consecutive days",
    reward: 150,
    timeLeft: "5 days",
    participants: 189,
    difficulty: "Medium",
    progress: 85,
  },
  {
    id: 3,
    title: "Complete 3 Investment Lessons",
    description: "Learn the basics of investing with our guided lessons",
    reward: 200,
    timeLeft: "10 days",
    participants: 156,
    difficulty: "Medium",
    progress: 33,
  },
]

const leaderboard = [
  { rank: 1, name: "Arjun Sharma", points: 15420, level: 7, badge: "Crown" },
  { rank: 2, name: "Priya Patel", points: 14890, level: 6, badge: "Gold" },
  { rank: 3, name: "Rahul Kumar", points: 13650, level: 6, badge: "Gold" },
  { rank: 4, name: "Sneha Gupta", points: 12340, level: 5, badge: "Silver" },
  { rank: 5, name: "Vikram Singh", points: 11890, level: 5, badge: "Silver" },
  { rank: 47, name: "You", points: 8750, level: 3, badge: "Bronze" },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "gold":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "silver":
      return "text-gray-600 bg-gray-50 border-gray-200"
    case "bronze":
      return "text-orange-600 bg-orange-50 border-orange-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-600 bg-green-50"
    case "Medium":
      return "text-yellow-600 bg-yellow-50"
    case "Hard":
      return "text-red-600 bg-red-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

export function GamificationSystem() {
  const progressToNextLevel = (userStats.currentXP / userStats.nextLevelXP) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-balance">Your Progress</h1>
        <p className="text-muted-foreground text-pretty">
          Track your achievements, compete with others, and earn rewards for good financial habits
        </p>
      </div>

      {/* Level & Progress Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
            <Crown className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Level {userStats.level}</div>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{userStats.currentXP} XP</span>
                <span>{userStats.nextLevelXP} XP</span>
              </div>
              <Progress value={progressToNextLevel} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Lifetime earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.streak} days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{userStats.rank}</div>
            <p className="text-xs text-muted-foreground">of {userStats.totalUsers.toLocaleString()} users</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="badges" className="space-y-4">
        <TabsList>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge) => (
              <Card key={badge.id} className={badge.earned ? "border-primary/50 bg-primary/5" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${getRarityColor(badge.rarity)}`}>
                        <badge.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{badge.name}</CardTitle>
                        <Badge variant="outline" className={`text-xs ${getRarityColor(badge.rarity)}`}>
                          {badge.rarity}
                        </Badge>
                      </div>
                    </div>
                    {badge.earned && <Award className="h-5 w-5 text-primary" />}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{badge.points} points</span>
                    {badge.earned ? (
                      <span className="text-xs text-muted-foreground">Earned {badge.earnedDate}</span>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">{badge.progress}% complete</div>
                        <Progress value={badge.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{challenge.title}</CardTitle>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center space-x-1">
                      <Gift className="h-4 w-4 text-primary" />
                      <span>{challenge.reward} points</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{challenge.timeLeft} left</span>
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{challenge.participants} participants</span>
                    <Button size="sm">Join Challenge</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>Top performers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.name === "You" ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background border">
                        {user.rank <= 3 ? (
                          <Medal
                            className={`h-4 w-4 ${
                              user.rank === 1
                                ? "text-yellow-500"
                                : user.rank === 2
                                  ? "text-gray-400"
                                  : "text-orange-500"
                            }`}
                          />
                        ) : (
                          <span className="text-sm font-medium">#{user.rank}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">Level {user.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{user.points.toLocaleString()} pts</p>
                      <Badge variant="outline" className="text-xs">
                        {user.badge}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
