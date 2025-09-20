"use client";

import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Target, 
  Flame, 
  Star, 
  Calendar,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Clock,
  Gift,
  Medal,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const GamificationHub = ({ userStats, transactions, userLevel = 1 }) => {
  const [activeTab, setActiveTab] = useState('challenges');
  const [userPoints, setUserPoints] = useState(2450);
  const [streakDays, setStreakDays] = useState(15);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  // Sample challenges data
  const [activeChallenges, setActiveChallenges] = useState([
    {
      id: 1,
      title: 'Budget Master Week',
      description: 'Stay within budget for 7 consecutive days',
      type: 'budget',
      difficulty: 'Easy',
      points: 100,
      progress: 5,
      target: 7,
      timeLeft: '2 days',
      icon: Target,
      color: 'bg-green-500'
    },
    {
      id: 2,
      title: 'Transaction Tracker',
      description: 'Log at least 3 transactions daily for 5 days',
      type: 'tracking',
      difficulty: 'Easy',
      points: 75,
      progress: 12,
      target: 15,
      timeLeft: '3 days',
      icon: CheckCircle,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Savings Sprint',
      description: 'Save $500 in the next 2 weeks',
      type: 'savings',
      difficulty: 'Medium',
      points: 200,
      progress: 280,
      target: 500,
      timeLeft: '8 days',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Category Control',
      description: 'Don\'t exceed your entertainment budget this month',
      type: 'budget',
      difficulty: 'Hard',
      points: 300,
      progress: 150,
      target: 200,
      timeLeft: '12 days',
      icon: Trophy,
      color: 'bg-orange-500'
    }
  ]);

  // User badges/achievements
  const [userBadges, setUserBadges] = useState([
    { id: 1, name: 'First Steps', description: 'Created your first budget', earned: true, icon: Star, color: 'bg-yellow-500' },
    { id: 2, name: 'Streak Master', description: '7 days logging streak', earned: true, icon: Flame, color: 'bg-red-500' },
    { id: 3, name: 'Budget Guru', description: 'Stayed within budget for a month', earned: true, icon: Target, color: 'bg-green-500' },
    { id: 4, name: 'Investment Rookie', description: 'Made your first investment', earned: false, icon: TrendingUp, color: 'bg-blue-500' },
    { id: 5, name: 'Savings Champion', description: 'Reached a savings goal', earned: false, icon: Trophy, color: 'bg-purple-500' },
    { id: 6, name: 'Community Helper', description: 'Helped 5 users in forums', earned: false, icon: Users, color: 'bg-pink-500' }
  ]);

  // Leaderboard data
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Krish Baranwal', points: 3250, badge: 'Budget Master', avatar: 'AJ' },
    { rank: 2, name: 'Sanjay Yadav', points: 3100, badge: 'Savings Guru', avatar: 'SC' },
    { rank: 3, name: 'You', points: 2450, badge: 'Streak Master', avatar: 'ME', isCurrentUser: true },
    { rank: 4, name: 'Naresh Choudhary', points: 2200, badge: 'Investment Pro', avatar: 'MW' },
    { rank: 5, name: 'Rahul', points: 2050, badge: 'Goal Achiever', avatar: 'ED' }
  ]);

  const levelProgress = ((userPoints % 1000) / 1000) * 100;
  const nextLevelPoints = Math.ceil(userPoints / 1000) * 1000;

  const ChallengesTab = () => (
    <div className="space-y-6">
      {/* Current Challenges */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Active Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeChallenges.map(challenge => {
            const Icon = challenge.icon;
            const progressPercent = (challenge.progress / challenge.target) * 100;
            
            return (
              <Card key={challenge.id} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${challenge.color}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{challenge.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>{challenge.progress} / {challenge.target}</span>
                      <span className="text-muted-foreground">{challenge.timeLeft} left</span>
                    </div>
                    <Progress value={progressPercent} />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-sm font-medium text-yellow-600">
                        <Star className="h-4 w-4" />
                        {challenge.points} points
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <CheckCircle className="h-6 w-6" />
              <span className="font-medium">Log Today's Expenses</span>
              <span className="text-xs text-muted-foreground">+10 points</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Target className="h-6 w-6" />
              <span className="font-medium">Check Budget Status</span>
              <span className="text-xs text-muted-foreground">+5 points</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="font-medium">Review Investments</span>
              <span className="text-xs text-muted-foreground">+15 points</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AchievementsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userBadges.map(badge => {
          const Icon = badge.icon;
          
          return (
            <Card key={badge.id} className={`relative ${badge.earned ? '' : 'opacity-60'}`}>
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${badge.color} ${badge.earned ? '' : 'grayscale'}`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{badge.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {badge.description}
                </p>
                {badge.earned ? (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Earned
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    In Progress
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievement Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Next Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Investment Rookie</span>
                <span className="text-sm text-muted-foreground">Make 1 investment</span>
              </div>
              <Progress value={0} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Community Helper</span>
                <span className="text-sm text-muted-foreground">2/5 users helped</span>
              </div>
              <Progress value={40} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Savings Champion</span>
                <span className="text-sm text-muted-foreground">$350/$500 saved</span>
              </div>
              <Progress value={70} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const LeaderboardTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Monthly Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map(user => (
              <div 
                key={user.rank} 
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  user.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  user.rank === 1 ? 'bg-yellow-500 text-white' :
                  user.rank === 2 ? 'bg-gray-400 text-white' :
                  user.rank === 3 ? 'bg-amber-600 text-white' :
                  'bg-gray-200 text-gray-700'
                }`}>
                  {user.rank <= 3 ? <Medal className="h-4 w-4" /> : user.rank}
                </div>
                
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
                  {user.avatar}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${user.isCurrentUser ? 'text-blue-700' : ''}`}>
                      {user.name}
                    </span>
                    {user.isCurrentUser && (
                      <Badge variant="outline" className="text-xs">You</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{user.badge}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 font-semibold">
                    <Star className="h-4 w-4 text-yellow-500" />
                    {user.points.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Streak Counter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-red-500" />
            Current Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-500 mb-2">{streakDays}</div>
            <p className="text-muted-foreground mb-4">days of consistent tracking</p>
            <div className="flex justify-center gap-1">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i < (streakDays % 7) ? 'bg-red-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  <Flame className="h-4 w-4" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24 space-y-8">
      {/* Header with user level and points */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Financial Journey</h1>
            <p className="text-muted-foreground">Level up your money management skills</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold">{userPoints.toLocaleString()}</span>
              <span className="text-muted-foreground">points</span>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
              Level {userLevel}
            </Badge>
          </div>
        </div>
        
        {/* Level Progress Bar */}
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Progress to Level {userLevel + 1}</span>
            <span className="text-sm text-muted-foreground">
              {userPoints % 1000} / 1000 XP
            </span>
          </div>
          <Progress value={levelProgress} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {nextLevelPoints - userPoints} more points to next level
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="challenges" className="mt-6">
          <ChallengesTab />
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-6">
          <AchievementsTab />
        </TabsContent>
        
        <TabsContent value="leaderboard" className="mt-6">
          <LeaderboardTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamificationHub;