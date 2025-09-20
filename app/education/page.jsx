"use client";

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  Trophy,
  Star,
  ChevronRight,
  Video,
  FileText,
  Headphones,
  Award,
  Target,
  TrendingUp,
  Calculator,
  PiggyBank,
  CreditCard,
  Shield,
  Gamepad2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EducationalHub = ({ userAge = 25, userProfile }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userProgress, setUserProgress] = useState({
    completedCourses: 5,
    totalCourses: 20,
    currentStreak: 3,
    pointsEarned: 750
  });

  // Age-specific content categories
  const ageCategories = {
    kids: { label: 'Kids (8-12)', icon: Gamepad2, color: 'bg-pink-500' },
    teens: { label: 'Teens (13-17)', icon: Target, color: 'bg-purple-500' },
    college: { label: 'College (18-22)', icon: BookOpen, color: 'bg-blue-500' },
    professional: { label: 'Working (23-40)', icon: TrendingUp, color: 'bg-green-500' },
    family: { label: 'Family (30-50)', icon: Shield, color: 'bg-orange-500' },
    retirement: { label: 'Retirement (50+)', icon: PiggyBank, color: 'bg-gray-600' }
  };

  // Educational content modules
  const [educationalModules, setEducationalModules] = useState([
    // Kids Content
    {
      id: 1,
      title: 'Piggy Bank Adventure',
      description: 'Learn about saving money through fun games and stories',
      category: 'kids',
      difficulty: 'Beginner',
      duration: '15 min',
      type: 'interactive',
      icon: PiggyBank,
      points: 50,
      completed: false,
      progress: 0,
      ageGroup: '8-12 years',
      modules: ['What is Money?', 'Saving vs Spending', 'Goal Setting Game']
    },
    {
      id: 2,
      title: 'Money Detective',
      description: 'Identify needs vs wants in everyday situations',
      category: 'kids',
      difficulty: 'Beginner',
      duration: '20 min',
      type: 'game',
      icon: Target,
      points: 75,
      completed: true,
      progress: 100,
      ageGroup: '8-12 years',
      modules: ['Needs vs Wants', 'Smart Shopping', 'Money Choices']
    },

    // College Student Content
    {
      id: 3,
      title: 'Student Budget Mastery',
      description: 'Master budgeting with limited income and student loans',
      category: 'college',
      difficulty: 'Intermediate',
      duration: '45 min',
      type: 'course',
      icon: BookOpen,
      points: 150,
      completed: false,
      progress: 60,
      ageGroup: '18-22 years',
      modules: ['Student Budget Basics', 'Managing Loans', 'Part-time Income', 'Campus Savings']
    },
    {
      id: 4,
      title: 'Credit Card Fundamentals',
      description: 'Understanding credit, building credit history responsibly',
      category: 'college',
      difficulty: 'Intermediate',
      duration: '30 min',
      type: 'video',
      icon: CreditCard,
      points: 100,
      completed: true,
      progress: 100,
      ageGroup: '18-22 years',
      modules: ['Credit Basics', 'Building Credit', 'Avoiding Debt Traps', 'Credit Monitoring']
    },

    // Working Professional Content
    {
      id: 5,
      title: 'Salary Budgeting Pro',
      description: 'Optimize your salary for savings, investments, and lifestyle',
      category: 'professional',
      difficulty: 'Advanced',
      duration: '60 min',
      type: 'course',
      icon: Calculator,
      points: 200,
      completed: false,
      progress: 30,
      ageGroup: '23-40 years',
      modules: ['Salary Breakdown', 'Tax Planning', 'Investment Basics', 'Emergency Fund']
    },
    {
      id: 6,
      title: 'Investment Fundamentals',
      description: 'Start your investment journey with mutual funds and SIPs',
      category: 'professional',
      difficulty: 'Advanced',
      duration: '90 min',
      type: 'course',
      icon: TrendingUp,
      points: 250,
      completed: false,
      progress: 0,
      ageGroup: '23-40 years',
      modules: ['Investment Types', 'Risk Assessment', 'SIP Strategy', 'Portfolio Diversification']
    },

    // Family/Parent Content
    {
      id: 7,
      title: 'Family Financial Planning',
      description: 'Manage household budget, kids education, and insurance',
      category: 'family',
      difficulty: 'Advanced',
      duration: '75 min',
      type: 'course',
      icon: Shield,
      points: 200,
      completed: false,
      progress: 20,
      ageGroup: '30-50 years',
      modules: ['Household Budgeting', 'Education Planning', 'Insurance Coverage', 'Estate Planning']
    },

    // Retirement Content
    {
      id: 8,
      title: 'Retirement Planning Essentials',
      description: 'Pension optimization and retirement savings strategies',
      category: 'retirement',
      difficulty: 'Expert',
      duration: '120 min',
      type: 'course',
      icon: PiggyBank,
      points: 300,
      completed: false,
      progress: 0,
      ageGroup: '50+ years',
      modules: ['Pension Planning', 'Retirement Corpus', 'Healthcare Costs', 'Legacy Planning']
    }
  ]);

  // Interactive simulations
  const [simulations, setSimulations] = useState([
    {
      id: 1,
      title: 'Budget vs Reality Simulator',
      description: 'Experience what happens when you exceed your budget',
      difficulty: 'Beginner',
      estimatedTime: '10 min',
      participants: 1250,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Investment Growth Calculator',
      description: 'See how different investment choices affect long-term wealth',
      difficulty: 'Intermediate',
      estimatedTime: '15 min',
      participants: 890,
      rating: 4.6
    },
    {
      id: 3,
      title: 'Loan vs Save Decision Maker',
      description: 'Compare the real cost of borrowing vs saving for purchases',
      difficulty: 'Intermediate',
      estimatedTime: '12 min',
      participants: 670,
      rating: 4.7
    }
  ]);

  const getAgeCategory = (age) => {
    if (age <= 12) return 'kids';
    if (age <= 17) return 'teens';
    if (age <= 22) return 'college';
    if (age <= 40) return 'professional';
    if (age <= 50) return 'family';
    return 'retirement';
  };

  const currentAgeCategory = getAgeCategory(userAge);
  
  const filteredModules = selectedCategory === 'all' 
    ? educationalModules 
    : educationalModules.filter(module => module.category === selectedCategory);

  const recommendedModules = educationalModules.filter(module => 
    module.category === currentAgeCategory && !module.completed
  );

  const LearningProgress = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Your Learning Journey
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{userProgress.completedCourses}</div>
            <p className="text-sm text-muted-foreground">Courses Completed</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{userProgress.currentStreak}</div>
            <p className="text-sm text-muted-foreground">Learning Streak</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{userProgress.pointsEarned}</div>
            <p className="text-sm text-muted-foreground">Points Earned</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((userProgress.completedCourses / userProgress.totalCourses) * 100)}%
            </div>
            <p className="text-sm text-muted-foreground">Overall Progress</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Learning Progress</span>
            <span>{userProgress.completedCourses}/{userProgress.totalCourses} courses</span>
          </div>
          <Progress value={(userProgress.completedCourses / userProgress.totalCourses) * 100} />
        </div>
      </CardContent>
    </Card>
  );

  const CoursesTab = () => (
    <div className="space-y-6">
      <LearningProgress />
      
      {/* Recommended for your age */}
      {recommendedModules.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Recommended for You ({ageCategories[currentAgeCategory].label})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {recommendedModules.slice(0, 4).map(module => {
              const Icon = module.icon;
              return (
                <Card key={module.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{module.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {module.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <Badge variant="outline">{module.difficulty}</Badge>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {module.duration}
                        </span>
                      </div>
                      
                      {module.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm font-medium text-yellow-600">
                          <Star className="h-4 w-4" />
                          {module.points} points
                        </div>
                        <Button size="sm">
                          {module.progress > 0 ? 'Continue' : 'Start Learning'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Age Category Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Browse by Age Group</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            All Ages
          </Button>
          {Object.entries(ageCategories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <Button
                key={key}
                variant={selectedCategory === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(key)}
                className="flex items-center gap-1"
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* All Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModules.map(module => {
            const Icon = module.icon;
            const categoryInfo = ageCategories[module.category];
            
            return (
              <Card key={module.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={categoryInfo.color}>
                      {categoryInfo.label}
                    </Badge>
                    {module.completed && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {module.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {module.duration}
                      </span>
                      <Badge variant="secondary">{module.difficulty}</Badge>
                    </div>
                    
                    {module.progress > 0 && !module.completed && (
                      <Progress value={module.progress} />
                    )}
                    
                    <Button className="w-full" size="sm">
                      {module.completed ? 'Review' : 
                       module.progress > 0 ? 'Continue' : 'Start Course'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );

  const SimulationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Interactive Simulations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Practice financial decisions in a risk-free virtual environment
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {simulations.map(simulation => (
              <Card key={simulation.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">{simulation.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {simulation.description}
                  </p>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <Badge variant="outline" size="sm">{simulation.difficulty}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{simulation.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participants:</span>
                      <span>{simulation.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{simulation.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Start Simulation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>    
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Education Hub</h1>
        <p className="text-muted-foreground">
          Age-appropriate financial learning tailored for {ageCategories[currentAgeCategory].label}
        </p>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList>
          <TabsTrigger value="courses">Learning Modules</TabsTrigger>
          <TabsTrigger value="simulations">Simulations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="mt-6">
          <CoursesTab />
        </TabsContent>
        
        <TabsContent value="simulations" className="mt-6">
          <SimulationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationalHub;