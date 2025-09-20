//components/Dashboard/budget-tracker.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Users,
  MessageCircle,
  Share2,
  Plus,
  Award,
  Calendar,
  MapPin,
  Clock,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Crown,
  Star,
  Lightbulb,
} from "lucide-react"

const communityPosts = [
  {
    id: 1,
    author: {
      name: "Priya Sharma",
      avatar: "/diverse-woman-portrait.png",
      level: 5,
      badge: "Budget Master",
      verified: true,
    },
    content:
      "Just completed my 6-month emergency fund goal! 🎉 Started with ₹0 and now have ₹3 lakhs saved. The key was automating my savings and treating it like a non-negotiable expense. Happy to share my strategy if anyone's interested!",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3,
    tags: ["Emergency Fund", "Savings", "Success Story"],
    category: "Success Story",
  },
  {
    id: 2,
    author: {
      name: "Rahul Kumar",
      avatar: "/thoughtful-man.png",
      level: 3,
      badge: "Learning Champion",
      verified: false,
    },
    content:
      "Need advice on choosing between ELSS and PPF for tax saving. I'm 28, have a moderate risk appetite, and can invest ₹1.5L annually. What would you recommend and why?",
    timestamp: "4 hours ago",
    likes: 12,
    comments: 15,
    shares: 2,
    tags: ["Tax Saving", "ELSS", "PPF", "Investment"],
    category: "Question",
  },
  {
    id: 3,
    author: {
      name: "Sneha Gupta",
      avatar: "/professional-woman.png",
      level: 7,
      badge: "Investment Guru",
      verified: true,
    },
    content:
      "Market volatility got you worried? Remember: Time in the market > Timing the market. I've been investing through 3 major corrections and my SIPs have averaged 14% returns over 8 years. Stay disciplined, stay invested! 📈",
    timestamp: "6 hours ago",
    likes: 45,
    comments: 12,
    shares: 8,
    tags: ["Investment", "SIP", "Market Volatility", "Long Term"],
    category: "Tip",
  },
  {
    id: 4,
    author: {
      name: "Amit Verma",
      avatar: "/man-business.jpg",
      level: 4,
      badge: "Savings Guru",
      verified: false,
    },
    content:
      "Sharing my monthly budget breakdown for a family of 4 in Bangalore:\n\n• Housing: ₹25,000 (25%)\n• Food: ₹15,000 (15%)\n• Transportation: ₹8,000 (8%)\n• Utilities: ₹5,000 (5%)\n• Savings/Investment: ₹30,000 (30%)\n• Others: ₹17,000 (17%)\n\nTotal: ₹1,00,000\n\nWhat's your budget allocation?",
    timestamp: "1 day ago",
    likes: 38,
    comments: 22,
    shares: 12,
    tags: ["Budget", "Family Finance", "Bangalore", "Allocation"],
    category: "Discussion",
  },
]

const challenges = [
  {
    id: 1,
    title: "30-Day No Spend Challenge",
    description: "Avoid unnecessary purchases for 30 days",
    participants: 156,
    daysLeft: 12,
    reward: "500 points + Badge",
    difficulty: "Medium",
    category: "Spending",
  },
  {
    id: 2,
    title: "Emergency Fund Sprint",
    description: "Build ₹10,000 emergency fund in 60 days",
    participants: 89,
    daysLeft: 45,
    reward: "1000 points + Certificate",
    difficulty: "Hard",
    category: "Savings",
  },
  {
    id: 3,
    title: "Investment Learning Week",
    description: "Complete 5 investment courses this week",
    participants: 234,
    daysLeft: 3,
    reward: "300 points + Badge",
    difficulty: "Easy",
    category: "Learning",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Mumbai Meetup: Personal Finance 101",
    date: "Dec 30, 2024",
    time: "6:00 PM",
    location: "WeWork, BKC",
    attendees: 45,
    maxAttendees: 60,
    type: "In-person",
    organizer: "FT01 Community",
  },
  {
    id: 2,
    title: "Virtual Q&A with CA Rajesh Kumar",
    date: "Jan 5, 2025",
    time: "7:30 PM",
    location: "Online",
    attendees: 234,
    maxAttendees: 500,
    type: "Virtual",
    organizer: "Expert Series",
  },
  {
    id: 3,
    title: "Delhi Investment Club Meeting",
    date: "Jan 8, 2025",
    time: "5:00 PM",
    location: "Connaught Place",
    attendees: 28,
    maxAttendees: 40,
    type: "In-person",
    organizer: "Delhi Chapter",
  },
]

const topContributors = [
  { name: "Arjun Sharma", points: 15420, posts: 89, helpful: 156, avatar: "/man-expert.jpg" },
  { name: "Priya Patel", points: 14890, posts: 76, helpful: 142, avatar: "/woman-expert.jpg" },
  { name: "Vikram Singh", points: 12340, posts: 65, helpful: 128, avatar: "/man-professional.jpg" },
  { name: "Sneha Gupta", points: 11890, posts: 58, helpful: 115, avatar: "/woman-business.jpg" },
]

export function CommunityFeatures() {
  const [newPostContent, setNewPostContent] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Discussion")
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  const handleCreatePost = () => {
    // In a real app, this would create a new post
    console.log("Creating post:", { content: newPostContent, category: selectedCategory })
    setNewPostContent("")
    setIsCreatePostOpen(false)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Success Story":
        return <Award className="h-4 w-4 text-green-600" />
      case "Question":
        return <MessageCircle className="h-4 w-4 text-blue-600" />
      case "Tip":
        return <Lightbulb className="h-4 w-4 text-amber-600" />
      case "Discussion":
        return <MessageSquare className="h-4 w-4 text-purple-600" />
      default:
        return <MessageCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-50 border-green-200"
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "Hard":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-balance">Community</h1>
        <p className="text-muted-foreground text-pretty">
          Connect with fellow learners, share experiences, and grow together
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-muted-foreground">+234 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,856</div>
            <p className="text-xs text-muted-foreground">+45 today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Stories</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Contributions</CardTitle>
            <Star className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Posts & comments</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="feed" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="leaderboard">Top Contributors</TabsTrigger>
          </TabsList>

          <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Share with the Community</DialogTitle>
                <DialogDescription>Share your experience, ask questions, or start a discussion</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <div className="flex space-x-2 mt-2">
                    {["Discussion", "Question", "Tip", "Success Story"].map((cat) => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Share your thoughts, experiences, or questions..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-32"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatePostOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                  Post
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="feed" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Posts Feed */}
            <div className="lg:col-span-2 space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {post.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{post.author.name}</h4>
                            {post.author.verified && <Crown className="h-4 w-4 text-primary" />}
                            <Badge variant="outline" className="text-xs">
                              Level {post.author.level}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{post.author.badge}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getCategoryIcon(post.category)}
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm whitespace-pre-line">{post.content}</p>

                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <Share2 className="h-4 w-4 mr-1" />
                          {post.shares}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Trending Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["#EmergencyFund", "#TaxSaving2025", "#SIPStrategy", "#BudgetTips", "#InvestmentBasics"].map(
                    (topic) => (
                      <Button key={topic} variant="ghost" className="w-full justify-start text-sm">
                        {topic}
                      </Button>
                    ),
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Your Posts</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Helpful Votes</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Community Rank</span>
                    <span className="font-medium">#156</span>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{challenge.participants} joined</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{challenge.daysLeft} days left</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{challenge.reward}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {challenge.category}
                    </Badge>
                  </div>

                  <Button className="w-full">Join Challenge</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{event.title}</CardTitle>
                    <Badge variant={event.type === "Virtual" ? "secondary" : "default"}>{event.type}</Badge>
                  </div>
                  <CardDescription>by {event.organizer}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {event.date} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {event.attendees}/{event.maxAttendees} attending
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Seats filled</span>
                      <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      />
                    </div>
                  </div>

                  <Button className="w-full">Register</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors This Month</CardTitle>
              <CardDescription>Community members making the biggest impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={contributor.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background border">
                        {index < 3 ? (
                          <Crown
                            className={`h-4 w-4 ${
                              index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : "text-orange-500"
                            }`}
                          />
                        ) : (
                          <span className="text-sm font-medium">#{index + 1}</span>
                        )}
                      </div>
                      <Avatar>
                        <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {contributor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contributor.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {contributor.posts} posts • {contributor.helpful} helpful votes
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{contributor.points.toLocaleString()} pts</p>
                      <Badge variant="outline" className="text-xs">
                        Top Contributor
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
