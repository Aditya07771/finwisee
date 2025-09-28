"use client";
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  PiggyBank, 
  Settings, 
  ArrowUp, 
  ArrowDown, 
  DollarSign,
  Target,
  Coins,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const MicroInvestment = ({ transactions, userSettings }) => {
  const [roundUpEnabled, setRoundUpEnabled] = useState(userSettings?.roundUpEnabled || false);
  const [investmentGoals, setInvestmentGoals] = useState([
    { id: 1, name: 'Emergency Fund', target: 5000, current: 1250, type: 'savings' },
    { id: 2, name: 'Vacation Fund', target: 2000, current: 850, type: 'goal' },
    { id: 3, name: 'Investment Portfolio', target: 10000, current: 2340, type: 'investment' }
  ]);
  const [roundUpAmount, setRoundUpAmount] = useState(0);
  const [availableInvestments, setAvailableInvestments] = useState([
    {
      id: 1,
      name: 'Nifty 50 Index Fund',
      type: 'Equity',
      risk: 'Moderate',
      returns: '12-15%',
      minAmount: 500,
      description: 'Diversified index fund tracking top 50 Indian companies'
    },
    {
      id: 2,
      name: 'Gold ETF',
      type: 'Commodity',
      risk: 'Low-Moderate',
      returns: '8-10%',
      minAmount: 100,
      description: 'Digital gold investment with high liquidity'
    },
    {
      id: 3,
      name: 'Liquid Fund',
      type: 'Debt',
      risk: 'Very Low',
      returns: '4-6%',
      minAmount: 1000,
      description: 'Low-risk fund for short-term parking of money'
    },
    {
      id: 4,
      name: 'Balanced Hybrid Fund',
      type: 'Hybrid',
      risk: 'Moderate',
      returns: '10-12%',
      minAmount: 500,
      description: 'Mix of equity and debt for balanced growth'
    }
  ]);

  // Calculate round-up amounts from transactions
  useEffect(() => {
    if (transactions && roundUpEnabled) {
      const roundUps = transactions
        .filter(t => t.type === 'EXPENSE')
        .map(t => Math.ceil(t.amount) - t.amount)
        .reduce((sum, roundUp) => sum + roundUp, 0);
      
      setRoundUpAmount(roundUps);
    }
  }, [transactions, roundUpEnabled]);

  const RoundUpSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Round-Up Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="font-medium">Enable Round-Up Investments</h4>
            <p className="text-sm text-muted-foreground">
              Automatically invest spare change from your purchases
            </p>
          </div>
          <Switch
            checked={roundUpEnabled}
            onCheckedChange={setRoundUpEnabled}
          />
        </div>
        
        {roundUpEnabled && (
          <div className="border rounded-lg p-4 bg-green-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Total Round-Up This Month</span>
              <span className="text-lg font-bold text-green-600">
                ${roundUpAmount.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Money ready to be invested from spare change
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="font-medium">Investment Preferences</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Risk Tolerance</label>
              <Select defaultValue="moderate">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Auto-Invest Threshold</label>
              <Select defaultValue="25">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">$10</SelectItem>
                  <SelectItem value="25">$25</SelectItem>
                  <SelectItem value="50">$50</SelectItem>
                  <SelectItem value="100">$100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const InvestmentGoals = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Investment Goals
        </CardTitle>
        <Button size="sm">Add Goal</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {investmentGoals.map(goal => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <div key={goal.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{goal.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">
                      {goal.type}
                    </p>
                  </div>
                  <Badge variant="outline">
                    ${goal.current} / ${goal.target}
                  </Badge>
                </div>
                <Progress value={progress} className="mb-2" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    {progress.toFixed(1)}% complete
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Add Money
                    </Button>
                    <Button size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  const InvestmentOptions = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Investment Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {availableInvestments.map(investment => (
            <div key={investment.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">{investment.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {investment.description}
                  </p>
                </div>
                <Badge 
                  variant="outline"
                  className={
                    investment.risk === 'Very Low' ? 'text-green-600 border-green-600' :
                    investment.risk === 'Low-Moderate' ? 'text-yellow-600 border-yellow-600' :
                    investment.risk === 'Moderate' ? 'text-orange-600 border-orange-600' :
                    'text-red-600 border-red-600'
                  }
                >
                  {investment.risk}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">Type</span>
                  <p className="font-medium">{investment.type}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Expected Returns</span>
                  <p className="font-medium text-green-600">{investment.returns}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Min Investment</span>
                  <p className="font-medium">${investment.minAmount}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Learn More
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  disabled={roundUpAmount < investment.minAmount}
                >
                  {roundUpAmount < investment.minAmount ? 
                    `Need $${investment.minAmount}` : 
                    'Start Investing'
                  }
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

    const PortfolioOverview = () => {
    const totalInvestments = investmentGoals.reduce((sum, goal) => sum + goal.current, 0);
    const totalTargets = investmentGoals.reduce((sum, goal) => sum + goal.target, 0);
    const overallProgress = (totalInvestments / totalTargets) * 100;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invested</p>
                <p className="text-2xl font-bold">${totalInvestments.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Round-Up Pending</p>
                <p className="text-2xl font-bold">${roundUpAmount.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Coins className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            {roundUpEnabled && (
              <Button size="sm" className="mt-4 w-full">
                Invest Round-Ups Now
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Goal Progress</p>
                <p className="text-2xl font-bold">{overallProgress.toFixed(1)}%</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <Progress value={overallProgress} className="mt-4" />
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 mt-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Global</h1>
          <p className="text-muted-foreground">Grow your wealth with spare change</p>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      <PortfolioOverview />

      <Tabs defaultValue="roundup" className="w-full">
        <TabsList>
          <TabsTrigger value="roundup">Round-Up</TabsTrigger>
          <TabsTrigger value="goals">Investment Goals</TabsTrigger>
          <TabsTrigger value="options">Investment Options</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roundup" className="space-y-6">
          <RoundUpSettings />
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-6">
          <InvestmentGoals />
        </TabsContent>
        
        <TabsContent value="options" className="space-y-6">
          <InvestmentOptions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MicroInvestment;