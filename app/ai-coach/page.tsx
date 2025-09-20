"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Lightbulb, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export default function AICoach() {
  const [message, setMessage] = useState("");
  
  const insights = [
    {
      type: "optimization",
      icon: TrendingUp,
      title: "Savings Opportunity",
      message: "You could save $200/month by switching to a high-yield savings account.",
      priority: "high"
    },
    {
      type: "warning",
      icon: AlertCircle,
      title: "Budget Alert",
      message: "You're trending 15% over budget in the Entertainment category this month.",
      priority: "medium"
    },
    {
      type: "tip",
      icon: Lightbulb,
      title: "Investment Tip",
      message: "Consider dollar-cost averaging into index funds with your extra $300 monthly.",
      priority: "low"
    }
  ];

  const chatHistory = [
    {
      type: "ai",
      message: "Hi! I'm your AI Financial Coach. I've analyzed your spending patterns and have some personalized recommendations for you. How can I help you today?"
    },
    {
      type: "user",
      message: "How can I improve my savings rate?"
    },
    {
      type: "ai",
      message: "Based on your current spending of $2,195 and income of $3,200, here are 3 strategies to boost your savings rate from 31% to 40%:\n\n1. **Automate savings first** - Set up automatic transfers of $500 right after payday\n2. **Optimize subscriptions** - I found $67/month in unused subscriptions you can cancel\n3. **Meal planning** - You spend $650/month on food. A $400 grocery budget + $150 dining could save $100/month"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="gradient-title text-4xl font-bold">AI Financial Coach</h1>
        <p className="text-muted-foreground mt-2">Get personalized financial advice powered by AI.</p>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const priorityColors = {
            high: "border-red-200 bg-red-50 dark:bg-red-950/50",
            medium: "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/50", 
            low: "border-blue-200 bg-blue-50 dark:bg-blue-950/50"
          };
          
          return (
            <Card key={index} className={`${priorityColors[insight.priority as keyof typeof priorityColors]} card-financial`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <CardTitle className="text-sm">{insight.title}</CardTitle>
                  <Badge variant="outline" className="ml-auto">
                    {insight.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{insight.message}</p>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Chat with FinWise AI
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      chat.type === 'user' 
                        ? 'bg-primary text-primary-foreground ml-4' 
                        : 'bg-muted mr-4'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{chat.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me about budgeting, saving, investing..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button className="btn-hero">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "How to build an emergency fund?",
                "Best investment strategy for me?",
                "How to pay off debt faster?",
                "Tax optimization tips?",
                "Retirement planning advice?"
              ].map((question, index) => (
                <Button key={index} variant="ghost" className="w-full text-left justify-start text-sm" size="sm">
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Financial Health</span>
                  <Badge className="bg-green-500 text-white">82/100</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Spending Efficiency</span>
                  <Badge variant="secondary">Good</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Savings Potential</span>
                  <Badge className="bg-yellow-500 text-white">High</Badge>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}