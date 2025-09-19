"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Plus, IndianRupee, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"

const budgetCategories = [
  { name: "Food & Dining", budgeted: 8000, spent: 6500, color: "hsl(var(--chart-1))" },
  { name: "Transportation", budgeted: 5000, spent: 4200, color: "hsl(var(--chart-2))" },
  { name: "Entertainment", budgeted: 3000, spent: 3500, color: "hsl(var(--chart-3))" },
  { name: "Shopping", budgeted: 7000, spent: 5800, color: "hsl(var(--chart-4))" },
  { name: "Bills & Utilities", budgeted: 12000, spent: 11500, color: "hsl(var(--chart-5))" },
  { name: "Healthcare", budgeted: 4000, spent: 2100, color: "hsl(var(--primary))" },
]

const monthlyData = [
  { month: "Jan", budgeted: 40000, spent: 38500 },
  { month: "Feb", budgeted: 40000, spent: 42000 },
  { month: "Mar", budgeted: 45000, spent: 41200 },
  { month: "Apr", budgeted: 45000, spent: 43800 },
  { month: "May", budgeted: 45000, spent: 33600 },
]

export function BudgetTracker() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [expenseAmount, setExpenseAmount] = useState("")
  const [expenseDescription, setExpenseDescription] = useState("")

  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0)
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0)
  const remaining = totalBudgeted - totalSpent

  const pieData = budgetCategories.map((cat) => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color,
  }))

  const handleAddExpense = () => {
    // In a real app, this would update the state/database
    console.log("Adding expense:", { selectedCategory, expenseAmount, expenseDescription })
    setIsAddExpenseOpen(false)
    setSelectedCategory("")
    setExpenseAmount("")
    setExpenseDescription("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-balance">Budget Tracker</h1>
        <p className="text-muted-foreground text-pretty">
          Monitor your spending and stay on track with your financial goals
        </p>
      </div>

      {/* Budget Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalBudgeted.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{((totalSpent / totalBudgeted) * 100).toFixed(1)}% of budget</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹{remaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available to spend</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="categories" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>Record a new expense to track your spending</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetCategories.map((cat) => (
                        <SelectItem key={cat.name} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="What did you spend on?"
                    value={expenseDescription}
                    onChange={(e) => setExpenseDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddExpense}>Add Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Your spending by category this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetCategories.map((category) => {
                    const percentage = (category.spent / category.budgeted) * 100
                    const isOverBudget = category.spent > category.budgeted

                    return (
                      <div key={category.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                            <span className="text-sm font-medium">{category.name}</span>
                            {isOverBudget && <AlertTriangle className="h-4 w-4 text-destructive" />}
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              ₹{category.spent.toLocaleString()} / ₹{category.budgeted.toLocaleString()}
                            </div>
                            <div className={`text-xs ${isOverBudget ? "text-destructive" : "text-muted-foreground"}`}>
                              {percentage.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        <Progress
                          value={Math.min(percentage, 100)}
                          className={isOverBudget ? "bg-destructive/20" : ""}
                        />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Spending Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Spending Distribution</CardTitle>
                <CardDescription>Visual breakdown of your expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>Compare your budgeted vs actual spending over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Bar dataKey="budgeted" fill="hsl(var(--primary))" name="Budgeted" />
                  <Bar dataKey="spent" fill="hsl(var(--chart-2))" name="Spent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest expenses and income</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    description: "Grocery Shopping - Big Bazaar",
                    category: "Food & Dining",
                    amount: -2450,
                    date: "2 hours ago",
                    status: "completed",
                  },
                  {
                    description: "Uber Ride",
                    category: "Transportation",
                    amount: -180,
                    date: "5 hours ago",
                    status: "completed",
                  },
                  {
                    description: "Netflix Subscription",
                    category: "Entertainment",
                    amount: -649,
                    date: "1 day ago",
                    status: "completed",
                  },
                  {
                    description: "Salary Credit",
                    category: "Income",
                    amount: 65000,
                    date: "2 days ago",
                    status: "completed",
                  },
                  {
                    description: "Electricity Bill",
                    category: "Bills & Utilities",
                    amount: -1850,
                    date: "3 days ago",
                    status: "completed",
                  },
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${transaction.amount > 0 ? "bg-primary" : "bg-chart-2"}`} />
                      <div>
                        <p className="text-sm font-medium">{transaction.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{transaction.category}</span>
                          <span>•</span>
                          <span>{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-sm font-medium ${transaction.amount > 0 ? "text-primary" : "text-foreground"}`}
                      >
                        {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString()}
                      </span>
                      <CheckCircle className="h-4 w-4 text-primary" />
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
