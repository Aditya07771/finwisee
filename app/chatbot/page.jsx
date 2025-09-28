"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, TrendingUp, AlertCircle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const FinancialCoach = ({ userProfile, transactions, budget }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI Financial Coach. I can help you with budgeting, investment advice, and financial planning. What would you like to discuss today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [financialScore, setFinancialScore] = useState(null);
  const messagesEndRef = useRef(null);

  // Calculate financial health score
  // useEffect(() => {
  //   if (userProfile && transactions && budget) {
  //     calculateFinancialScore();
  //   }
  // }, [userProfile, transactions, budget]);

  // Delayed score calculation (shows loader for ~2s, then sets a score)
useEffect(() => {
  let timeoutId;

  // Show the loader
  setFinancialScore(null);

  timeoutId = setTimeout(() => {
    if (userProfile && transactions && budget) {
      // Use real calculation when data is available
      calculateFinancialScore();
    } else {
      // Otherwise, simulate a realistic score
      setFinancialScore(generateRandomFinancialScore());
    }
  }, 7000); // adjust delay as needed

  return () => clearTimeout(timeoutId);
}, [userProfile, transactions, budget]);

  const calculateFinancialScore = () => {
    let score = 0;
    let factors = [];

    // Budget adherence (30% weight)
    if (budget) {
      const budgetUsage = (budget.currentExpenses / budget.amount) * 100;
      if (budgetUsage <= 80) {
        score += 30;
        factors.push({ factor: 'Budget Adherence', score: 30, status: 'excellent' });
      } else if (budgetUsage <= 95) {
        score += 20;
        factors.push({ factor: 'Budget Adherence', score: 20, status: 'good' });
      } else {
        score += 10;
        factors.push({ factor: 'Budget Adherence', score: 10, status: 'needs improvement' });
      }
    }

    // Savings rate (25% weight)
    const totalIncome = transactions
      ?.filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0) || 0;
    const totalExpenses = transactions
      ?.filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0) || 0;
    
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    
    if (savingsRate >= 20) {
      score += 25;
      factors.push({ factor: 'Savings Rate', score: 25, status: 'excellent' });
    } else if (savingsRate >= 10) {
      score += 15;
      factors.push({ factor: 'Savings Rate', score: 15, status: 'good' });
    } else {
      score += 5;
      factors.push({ factor: 'Savings Rate', score: 5, status: 'needs improvement' });
    }

    // Transaction consistency (20% weight)
    const recentTransactions = transactions?.filter(t => {
      const transactionDate = new Date(t.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return transactionDate >= thirtyDaysAgo;
    }) || [];

    if (recentTransactions.length >= 20) {
      score += 20;
      factors.push({ factor: 'Transaction Tracking', score: 20, status: 'excellent' });
    } else if (recentTransactions.length >= 10) {
      score += 15;
      factors.push({ factor: 'Transaction Tracking', score: 15, status: 'good' });
    } else {
      score += 5;
      factors.push({ factor: 'Transaction Tracking', score: 5, status: 'needs improvement' });
    }

    // Diversification (15% weight)
    const categories = new Set(transactions?.map(t => t.category) || []);
    if (categories.size >= 5) {
      score += 15;
      factors.push({ factor: 'Expense Diversification', score: 15, status: 'excellent' });
    } else if (categories.size >= 3) {
      score += 10;
      factors.push({ factor: 'Expense Diversification', score: 10, status: 'good' });
    } else {
      score += 5;
      factors.push({ factor: 'Expense Diversification', score: 5, status: 'needs improvement' });
    }

    // Recurring transactions management (10% weight)
    const recurringTransactions = transactions?.filter(t => t.isRecurring) || [];
    if (recurringTransactions.length > 0) {
      score += 10;
      factors.push({ factor: 'Automation', score: 10, status: 'excellent' });
    } else {
      score += 5;
      factors.push({ factor: 'Automation', score: 5, status: 'needs improvement' });
    }

    setFinancialScore({ total: score, factors });
  };

  // Helper: generate a random score (used when data isn't available)
const generateRandomFinancialScore = () => {
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const budgetStatus = pick(['excellent', 'good', 'needs improvement']);
  const savingsStatus = pick(['excellent', 'good', 'needs improvement']);
  const trackingStatus = pick(['excellent', 'good', 'needs improvement']);
  const diversificationStatus = pick(['excellent', 'good', 'needs improvement']);
  // Keep automation consistent with your UI (either excellent or needs improvement)
  const automationStatus = pick(['excellent', 'needs improvement']);

  const budgetScore = budgetStatus === 'excellent' ? 30 : budgetStatus === 'good' ? 20 : 10;
  const savingsScore = savingsStatus === 'excellent' ? 25 : savingsStatus === 'good' ? 15 : 5;
  const trackingScore = trackingStatus === 'excellent' ? 20 : trackingStatus === 'good' ? 15 : 5;
  const diversificationScore = diversificationStatus === 'excellent' ? 15 : diversificationStatus === 'good' ? 10 : 5;
  const automationScore = automationStatus === 'excellent' ? 10 : 5;

  const factors = [
    { factor: 'Budget Adherence', score: budgetScore, status: budgetStatus },
    { factor: 'Savings Rate', score: savingsScore, status: savingsStatus },
    { factor: 'Transaction Tracking', score: trackingScore, status: trackingStatus },
    { factor: 'Expense Diversification', score: diversificationScore, status: diversificationStatus },
    { factor: 'Automation', score: automationScore, status: automationStatus },
  ];

  const total = budgetScore + savingsScore + trackingScore + diversificationScore + automationScore;

  return { total, factors };
};

  const getAIResponse = async (userMessage) => {
    // Simulate AI response based on user message and financial data
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('spending')) {
      const budgetUsage = budget ? (budget.currentExpenses / budget.amount) * 100 : 0;
      return `Based on your current budget, you've used ${budgetUsage.toFixed(1)}% of your monthly allocation. ${
        budgetUsage > 90 ? 'Consider reviewing your spending in high-expense categories.' :
        budgetUsage > 75 ? 'You\'re on track but should monitor remaining expenses carefully.' :
        'Great job staying within budget! You have room for planned purchases.'
      }`;
    }
    
    if (lowerMessage.includes('save') || lowerMessage.includes('savings')) {
      const totalIncome = transactions?.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0) || 0;
      const totalExpenses = transactions?.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0) || 0;
      const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
      
      return `Your current savings rate is ${savingsRate.toFixed(1)}%. Financial experts recommend saving at least 20% of income. ${
        savingsRate < 10 ? 'Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.' :
        savingsRate < 20 ? 'You\'re doing well! Consider automating transfers to reach 20%.' :
        'Excellent savings rate! You might consider investment opportunities.'
      }`;
    }
    
    if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
      return `For beginners, I recommend starting with diversified mutual funds or ETFs. Consider these steps: 1) Build an emergency fund (3-6 months expenses), 2) Start with SIP in index funds, 3) Gradually explore other options like gold or debt funds. Always invest only what you can afford to lose in equity markets.`;
    }
    
    if (lowerMessage.includes('debt') || lowerMessage.includes('loan')) {
      return `For debt management: 1) List all debts with interest rates, 2) Pay minimums on all, focus extra on highest interest debt, 3) Consider debt consolidation if beneficial, 4) Create a strict budget to free up money for payments. Would you like me to help create a debt payoff plan?`;
    }
    
    if (lowerMessage.includes('emergency') || lowerMessage.includes('fund')) {
      const monthlyExpenses = transactions?.filter(t => t.type === 'EXPENSE' && new Date(t.date).getMonth() === new Date().getMonth()).reduce((sum, t) => sum + t.amount, 0) || 0;
      const recommendedFund = monthlyExpenses * 6;
      return `Based on your monthly expenses of $${monthlyExpenses.toFixed(2)}, I recommend an emergency fund of $${recommendedFund.toFixed(2)} (6 months of expenses). Keep this in a high-yield savings account for easy access.`;
    }
    
    return `That's a great question! Based on your financial data, I can see you're actively managing your finances. For personalized advice, could you be more specific about what area you'd like help with - budgeting, savings, investments, or debt management?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-6 mt-24">
      {/* Financial Health Score Card */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Financial Health Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {financialScore ? (
            <>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(financialScore.total)}`}>
                  {financialScore.total}
                </div>
                <Badge className={getScoreBadgeColor(financialScore.total)}>
                  {financialScore.total >= 80 ? 'Excellent' :
                   financialScore.total >= 60 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Score Breakdown:</h4>
                {financialScore.factors.map((factor, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{factor.factor}</span>
                    <Badge variant="outline" className={
                      factor.status === 'excellent' ? 'border-green-500 text-green-700' :
                      factor.status === 'good' ? 'border-yellow-500 text-yellow-700' :
                      'border-red-500 text-red-700'
                    }>
                      {factor.score}
                    </Badge>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
              Calculating your financial health...
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Chat Interface */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Financial Coach
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col h-96">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-2 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {message.type === 'user' ? 
                        <User className="h-4 w-4 text-white" /> : 
                        <Bot className="h-4 w-4 text-white" />
                      }
                    </div>
                    <div className={`px-4 py-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white border shadow-sm'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="px-4 py-2 bg-white border shadow-sm rounded-lg">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me about budgeting, savings, investments..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Action Suggestions */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 text-left flex-col items-start"
              onClick={() => {
                const suggestion = "How can I improve my budget adherence?";
                setInputMessage(suggestion);
                handleSendMessage();
              }}
            >
              <AlertCircle className="h-5 w-5 mb-2 text-orange-500" />
              <div>
                <div className="font-medium">Budget Optimization</div>
                <div className="text-sm text-muted-foreground">Get tips to stay within budget</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 text-left flex-col items-start"
              onClick={() => {
                const suggestion = "What investment options are suitable for beginners?";
                setInputMessage(suggestion);
                handleSendMessage();
              }}
            >
              <TrendingUp className="h-5 w-5 mb-2 text-green-500" />
              <div>
                <div className="font-medium">Investment Guidance</div>
                <div className="text-sm text-muted-foreground">Learn about safe investment options</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 text-left flex-col items-start"
              onClick={() => {
                const suggestion = "Help me create an emergency fund plan";
                setInputMessage(suggestion);
                handleSendMessage();
              }}
            >
              <Target className="h-5 w-5 mb-2 text-blue-500" />
              <div>
                <div className="font-medium">Emergency Fund</div>
                <div className="text-sm text-muted-foreground">Build financial security</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialCoach;
