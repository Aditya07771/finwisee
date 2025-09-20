//components/Dashboard/learning-modules.tsx

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  BookOpen,
  Clock,
  Users,
  Award,
  CheckCircle,
  Star,
  Calendar,
  Video,
  Target,
  TrendingUp,
  PiggyBank,
  Shield,
  Calculator,
  Lightbulb,
} from "lucide-react"

const learningPaths = [
  {
    id: 1,
    title: "Financial Basics",
    description: "Master the fundamentals of personal finance",
    level: "Beginner",
    modules: 8,
    duration: "2-3 weeks",
    enrolled: 1250,
    rating: 4.8,
    progress: 75,
    color: "bg-blue-500",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Smart Budgeting",
    description: "Learn effective budgeting strategies and tools",
    level: "Beginner",
    modules: 6,
    duration: "1-2 weeks",
    enrolled: 980,
    rating: 4.9,
    progress: 100,
    color: "bg-green-500",
    icon: PiggyBank,
  },
  {
    id: 3,
    title: "Investment Fundamentals",
    description: "Start your investment journey with confidence",
    level: "Intermediate",
    modules: 12,
    duration: "4-5 weeks",
    enrolled: 750,
    rating: 4.7,
    progress: 25,
    color: "bg-purple-500",
    icon: TrendingUp,
  },
  {
    id: 4,
    title: "Tax Planning",
    description: "Optimize your taxes and maximize savings",
    level: "Intermediate",
    modules: 10,
    duration: "3-4 weeks",
    enrolled: 620,
    rating: 4.6,
    progress: 0,
    color: "bg-orange-500",
    icon: Calculator,
  },
  {
    id: 5,
    title: "Insurance & Protection",
    description: "Protect your financial future with smart insurance",
    level: "Intermediate",
    modules: 8,
    duration: "2-3 weeks",
    enrolled: 540,
    rating: 4.5,
    progress: 0,
    color: "bg-red-500",
    icon: Shield,
  },
  {
    id: 6,
    title: "Retirement Planning",
    description: "Secure your golden years with proper planning",
    level: "Advanced",
    modules: 15,
    duration: "6-8 weeks",
    enrolled: 420,
    rating: 4.8,
    progress: 0,
    color: "bg-indigo-500",
    icon: Target,
  },
]

const upcomingWorkshops = [
  {
    id: 1,
    title: "Mutual Funds Masterclass",
    instructor: "CA Rajesh Kumar",
    date: "Dec 28, 2024",
    time: "7:00 PM IST",
    duration: "90 minutes",
    attendees: 156,
    maxAttendees: 200,
    type: "Live",
    level: "Intermediate",
    price: "Free",
  },
  {
    id: 2,
    title: "Tax Saving Strategies for 2025",
    instructor: "Priya Sharma, CFP",
    date: "Jan 5, 2025",
    time: "6:30 PM IST",
    duration: "120 minutes",
    attendees: 89,
    maxAttendees: 150,
    type: "Live",
    level: "Beginner",
    price: "₹299",
  },
  {
    id: 3,
    title: "Building Your Emergency Fund",
    instructor: "Amit Verma",
    date: "Jan 12, 2025",
    time: "8:00 PM IST",
    duration: "60 minutes",
    attendees: 234,
    maxAttendees: 300,
    type: "Live",
    level: "Beginner",
    price: "Free",
  },
]

const quizQuestions = [
  {
    question: "What percentage of your income should ideally go towards savings?",
    options: ["5-10%", "10-15%", "20-30%", "40-50%"],
    correct: 2,
  },
  {
    question: "Which of the following is considered a good debt?",
    options: ["Credit card debt", "Personal loan", "Home loan", "Car loan"],
    correct: 2,
  },
  {
    question: "What is the recommended emergency fund size?",
    options: ["1-2 months expenses", "3-6 months expenses", "1 year expenses", "2 years expenses"],
    correct: 1,
  },
]

export function LearningModules() {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const handleQuizSubmit = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correct.toString()) {
      setScore(score + 1)
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setShowResult(false)
    setScore(0)
    setSelectedQuiz(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-balance">Learning Center</h1>
        <p className="text-muted-foreground text-pretty">
          Enhance your financial knowledge with our comprehensive courses and workshops
        </p>
      </div>

      {/* Learning Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Out of 6 enrolled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <Award className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">Personal best!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
            <Star className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Verified achievements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="quiz">Quick Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {learningPaths.map((path) => (
              <Card key={path.id} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${path.color}`} />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${path.color} text-white`}>
                        <path.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{path.title}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {path.level}
                        </Badge>
                      </div>
                    </div>
                    {path.progress > 0 && (
                      <div className="text-right">
                        <div className="text-sm font-medium">{path.progress}%</div>
                        <Progress value={path.progress} className="w-16 h-1" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{path.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{path.modules} modules</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{path.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{path.enrolled} enrolled</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-amber-500" />
                      <span>{path.rating}</span>
                    </div>
                  </div>

                  <Button className="w-full" variant={path.progress > 0 ? "default" : "outline"}>
                    {path.progress === 0 ? "Start Course" : path.progress === 100 ? "Review" : "Continue"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workshops" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingWorkshops.map((workshop) => (
              <Card key={workshop.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{workshop.title}</CardTitle>
                    <Badge variant={workshop.type === "Live" ? "default" : "secondary"}>{workshop.type}</Badge>
                  </div>
                  <CardDescription>by {workshop.instructor}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{workshop.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <span>{workshop.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {workshop.attendees}/{workshop.maxAttendees}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Seats filled</span>
                      <span>{Math.round((workshop.attendees / workshop.maxAttendees) * 100)}%</span>
                    </div>
                    <Progress value={(workshop.attendees / workshop.maxAttendees) * 100} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{workshop.level}</Badge>
                      <span className="text-sm font-medium text-primary">{workshop.price}</span>
                    </div>
                    <Button size="sm">Register</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span>Financial Literacy Quiz</span>
                </CardTitle>
                <CardDescription>Test your knowledge and earn points for correct answers</CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedQuiz ? (
                  <div className="space-y-4">
                    <div className="text-center space-y-2">
                      <div className="text-4xl">🧠</div>
                      <h3 className="text-lg font-semibold">Ready to test your knowledge?</h3>
                      <p className="text-muted-foreground">Answer 3 questions and earn up to 30 points!</p>
                    </div>
                    <Button className="w-full" onClick={() => setSelectedQuiz(1)}>
                      Start Quiz
                    </Button>
                  </div>
                ) : !showResult ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </span>
                      <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="w-32" />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{quizQuestions[currentQuestion].question}</h3>

                      <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`} className="cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <Button className="w-full" onClick={handleQuizSubmit} disabled={!selectedAnswer}>
                      {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 text-center">
                    <div className="text-4xl">
                      {score === quizQuestions.length ? "🎉" : score >= quizQuestions.length / 2 ? "👍" : "📚"}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Quiz Complete!</h3>
                      <p className="text-muted-foreground">
                        You scored {score} out of {quizQuestions.length}
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="font-medium">+{score * 10} points earned!</span>
                    </div>
                    <Button className="w-full" onClick={resetQuiz}>
                      Take Another Quiz
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
