"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Target,
  BookOpen,
  Plus,
  ArrowRight,
  IndianRupee,
  Calendar,
  Award,
} from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-balance">Welcome back, Priya!</h1>
        <p className="text-muted-foreground text-pretty">
          Here's your financial overview for this month. You're doing great!
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,000</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span>₹15,000 remaining</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,25,000</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>68% complete</span>
            </div>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Award className="h-3 w-3 text-amber-500" />
              <span>Personal best!</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹30,000</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>Expenses</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest financial activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div>
                  <p className="text-sm font-medium">Grocery Shopping</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <span className="text-sm font-medium">-₹2,450</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-chart-2 rounded-full" />
                <div>
                  <p className="text-sm font-medium">Salary Credited</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <span className="text-sm font-medium text-primary">+₹65,000</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-chart-3 rounded-full" />
                <div>
                  <p className="text-sm font-medium">SIP Investment</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <span className="text-sm font-medium">-₹5,000</span>
            </div>

            <Button variant="ghost" className="w-full justify-between">
              View all transactions
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your finances efficiently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>

            <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
              <Target className="mr-2 h-4 w-4" />
              Set New Goal
            </Button>

            <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
              <BookOpen className="mr-2 h-4 w-4" />
              Take Quiz
            </Button>

            <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Workshop
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Banner */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" />
                <Badge variant="secondary">New Achievement!</Badge>
              </div>
              <h3 className="text-lg font-semibold">Budget Master</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Congratulations! You've stayed within budget for 3 consecutive months.
              </p>
            </div>
            <Button>Claim Reward</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
