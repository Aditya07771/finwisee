"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bot,
  Send,
  TrendingUp,
  PiggyBank,
  Target,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Calculator,
  Shield,
  User,
  Sparkles,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "text" | "insight" | "recommendation"
}

const financialInsights = [
  {
    id: 1,
    title: "Spending Alert",
    description: "You've spent 85% of your entertainment budget this month",
    type: "warning",
    icon: AlertTriangle,
    action: "Review expenses",
    priority: "high",
  },
  {
    id: 2,
    title: "Savings Opportunity",
    description: "You can save ₹2,500/month by switching to a better phone plan",
    type: "opportunity",
    icon: PiggyBank,
    action: "Compare plans",
    priority: "medium",
  },
  {
    id: 3,
    title: "Goal Progress",
    description: "You're ahead of schedule on your vacation fund by 15%",
    type: "success",
    icon: Target,
    action: "View details",
    priority: "low",
  },
  {
    id: 4,
    title: "Investment Suggestion",
    description: "Consider increasing your SIP by ₹1,000 based on your income growth",
    type: "recommendation",
    icon: TrendingUp,
    action: "Learn more",
    priority: "medium",
  },
]

const quickActions = [
  { label: "Check my budget status", icon: BarChart3 },
  { label: "How can I save more money?", icon: PiggyBank },
  { label: "Investment advice for beginners", icon: TrendingUp },
  { label: "Calculate loan EMI", icon: Calculator },
  { label: "Insurance recommendations", icon: Shield },
  { label: "Tax saving tips", icon: Lightbulb },
]

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! I'm your AI Financial Coach. I'm here to help you make smarter financial decisions. How can I assist you today?",
    sender: "ai",
    timestamp: new Date(),
    type: "text",
  },
]

export function AIFinancialCoach() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        sender: "ai",
        timestamp: new Date(),
        type: aiResponse.type,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): { content: string; type: "text" | "insight" | "recommendation" } => {
    const input = userInput.toLowerCase()

    if (input.includes("budget") || input.includes("spending")) {
      return {
        content:
          "Based on your current spending patterns, you're doing well! You've spent ₹30,000 out of your ₹45,000 monthly budget. Here are some insights:\n\n• Food & Dining: ₹6,500 (81% of budget) ✅\n• Transportation: ₹4,200 (84% of budget) ✅\n• Entertainment: ₹3,500 (117% of budget) ⚠️\n\nConsider reducing entertainment expenses by ₹500 to stay within budget.",
        type: "insight",
      }
    }

    if (input.includes("save") || input.includes("saving")) {
      return {
        content:
          "Great question! Here are personalized saving strategies for you:\n\n💡 **Quick Wins:**\n• Switch to a cheaper phone plan: Save ₹500/month\n• Use public transport 2 days/week: Save ₹800/month\n• Cook at home 3 more times/week: Save ₹1,200/month\n\n📈 **Long-term:**\n• Increase your SIP by ₹2,000/month\n• Consider a high-yield savings account\n\nTotal potential savings: ₹2,500/month!",
        type: "recommendation",
      }
    }

    if (input.includes("investment") || input.includes("invest")) {
      return {
        content:
          "Based on your profile (Age: 28, Risk: Moderate), here's my investment advice:\n\n🎯 **Recommended Portfolio:**\n• 60% Equity Mutual Funds (₹18,000/month)\n• 30% Debt Funds (₹9,000/month)\n• 10% Gold/REITs (₹3,000/month)\n\n📊 **Current Status:**\n• You're investing ₹15,000/month\n• Suggested increase: ₹15,000 more\n• Expected returns: 12-15% annually\n\nStart with increasing your existing SIPs by ₹5,000/month.",
        type: "recommendation",
      }
    }

    if (input.includes("loan") || input.includes("emi")) {
      return {
        content:
          "I can help you with loan calculations! Here's what I found:\n\n🏠 **Home Loan (if ₹50L for 20 years):**\n• EMI: ₹38,388/month @ 8.5%\n• Total Interest: ₹42.13L\n\n🚗 **Car Loan (if ₹8L for 5 years):**\n• EMI: ₹16,298/month @ 9.5%\n• Total Interest: ₹1.78L\n\n💡 **Tips:**\n• Your EMIs shouldn't exceed 40% of income\n• Consider prepayment to reduce interest\n• Compare rates from multiple lenders",
        type: "insight",
      }
    }

    return {
      content:
        "I understand you're looking for financial guidance. I can help you with:\n\n• Budget analysis and optimization\n• Personalized saving strategies\n• Investment recommendations\n• Loan and EMI calculations\n• Tax planning advice\n• Insurance suggestions\n\nWhat specific area would you like to explore?",
      type: "text",
    }
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const getInsightTypeColor = (type: string) => {
    switch (type) {
      case "warning":
        return "border-orange-200 bg-orange-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "opportunity":
        return "border-blue-200 bg-blue-50"
      case "recommendation":
        return "border-purple-200 bg-purple-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getInsightIconColor = (type: string) => {
    switch (type) {
      case "warning":
        return "text-orange-600"
      case "success":
        return "text-green-600"
      case "opportunity":
        return "text-blue-600"
      case "recommendation":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-balance">AI Financial Coach</h1>
        <p className="text-muted-foreground text-pretty">
          Get personalized financial advice and insights powered by AI
        </p>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="health-score">Financial Health</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">AI Financial Coach</CardTitle>
                      <CardDescription>Always here to help with your finances</CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Online
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex items-start space-x-2 max-w-[80%] ${
                              message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                            }`}
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarFallback
                                className={
                                  message.sender === "user" ? "bg-secondary" : "bg-primary text-primary-foreground"
                                }
                              >
                                {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`rounded-lg p-3 ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : message.type === "insight" || message.type === "recommendation"
                                    ? "bg-muted border"
                                    : "bg-muted"
                              }`}
                            >
                              <div className="text-sm whitespace-pre-line">{message.content}</div>
                              <div className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-start space-x-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-lg p-3">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                />
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>

                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me anything about your finances..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                      disabled={isTyping}
                    />
                    <Button onClick={() => handleSendMessage(inputValue)} disabled={isTyping || !inputValue.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                  <CardDescription>Common questions to get started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => handleQuickAction(action.label)}
                    >
                      <action.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{action.label}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {financialInsights.map((insight) => (
              <Card key={insight.id} className={`border-l-4 ${getInsightTypeColor(insight.type)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <insight.icon className={`h-5 w-5 ${getInsightIconColor(insight.type)}`} />
                      <CardTitle className="text-base">{insight.title}</CardTitle>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        insight.priority === "high"
                          ? "border-red-200 text-red-700"
                          : insight.priority === "medium"
                            ? "border-yellow-200 text-yellow-700"
                            : "border-green-200 text-green-700"
                      }`}
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  <Button size="sm" variant="outline">
                    {insight.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="health-score" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Financial Health Score</CardTitle>
                <CardDescription>Your overall financial wellness rating</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">78/100</div>
                  <Badge variant="secondary" className="text-sm">
                    Good
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Fund</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-16 h-2 bg-green-500 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">80%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Debt-to-Income</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-12 h-2 bg-yellow-500 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Savings Rate</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-18 h-2 bg-green-500 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Investment Diversity</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-14 h-2 bg-orange-500 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">70%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Actions to improve your financial health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Diversify Investments</p>
                      <p className="text-xs text-muted-foreground">Add international funds to your portfolio</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <PiggyBank className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Increase Emergency Fund</p>
                      <p className="text-xs text-muted-foreground">Aim for 6 months of expenses</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <Target className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Reduce Debt Burden</p>
                      <p className="text-xs text-muted-foreground">Consider debt consolidation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
