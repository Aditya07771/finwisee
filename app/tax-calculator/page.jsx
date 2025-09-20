"use client";

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Calendar, 
  AlertTriangle, 
  Shield, 
  FileText,
  Clock,
  DollarSign,
  TrendingDown,
  Lightbulb,
  CheckCircle,
  Phone,
  MessageCircle,
  Building,
  CreditCard,
  Target,
  ArrowRight,
  Download,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TaxEmergencyHub = ({ userProfile, userIncome }) => {
  const [annualIncome, setAnnualIncome] = useState(userIncome || '800000');
  const [age, setAge] = useState('30');
  const [deductions, setDeductions] = useState({
    section80C: '150000',
    section80D: '25000',
    section24B: '200000',
    nps: '50000'
  });
  
  const [emergencyFund, setEmergencyFund] = useState({
    current: 45000,
    target: 180000,
    monthlyExpenses: 30000
  });

  const [taxReminders, setTaxReminders] = useState([
    { id: 1, title: 'ITR Filing Deadline', date: '2024-07-31', daysLeft: 45, priority: 'high' },
    { id: 2, title: 'Advance Tax Q4', date: '2024-03-15', daysLeft: -30, priority: 'overdue' },
    { id: 3, title: 'TDS Certificate Download', date: '2024-06-15', daysLeft: 15, priority: 'medium' }
  ]);

  const [emergencyScenarios, setEmergencyScenarios] = useState([
    {
      id: 1,
      scenario: 'Job Loss',
      probability: 'Medium',
      impact: 'High',
      preparedness: 65,
      actionPlan: [
        'Build 6-month emergency fund',
        'Update resume and LinkedIn',
        'Research unemployment benefits',
        'Consider skill upgrade courses'
      ]
    },
    {
      id: 2,
      scenario: 'Medical Emergency',
      probability: 'Low',
      impact: 'High',
      preparedness: 80,
      actionPlan: [
        'Ensure adequate health insurance',
        'Maintain emergency medical fund',
        'Know nearest hospitals',
        'Keep important documents ready'
      ]
    },
    {
      id: 3,
      scenario: 'Major Appliance/Vehicle Breakdown',
      probability: 'High',
      impact: 'Medium',
      preparedness: 40,
      actionPlan: [
        'Set aside repair fund',
        'Research reliable service providers',
        'Consider extended warranties',
        'Plan for replacement timeline'
      ]
    }
  ]);

  // Tax calculation logic
  const calculateIncomeTax = () => {
    const income = parseInt(annualIncome);
    const totalDeductions = Object.values(deductions).reduce((sum, val) => sum + parseInt(val), 0);
    const taxableIncome = Math.max(0, income - totalDeductions);
    
    let tax = 0;
    
    // New Tax Regime (2023-24)
    if (taxableIncome > 300000) tax += (Math.min(taxableIncome, 600000) - 300000) * 0.05;
    if (taxableIncome > 600000) tax += (Math.min(taxableIncome, 900000) - 600000) * 0.10;
    if (taxableIncome > 900000) tax += (Math.min(taxableIncome, 1200000) - 900000) * 0.15;
    if (taxableIncome > 1200000) tax += (Math.min(taxableIncome, 1500000) - 1200000) * 0.20;
    if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
    
    // Health and Education Cess
    const cess = tax * 0.04;
    const totalTax = tax + cess;
    
    return {
      grossIncome: income,
      deductions: totalDeductions,
      taxableIncome,
      incomeTax: tax,
      cess,
      totalTax,
      netIncome: income - totalTax,
      effectiveRate: income > 0 ? (totalTax / income) * 100 : 0
    };
  };

  const taxCalculation = calculateIncomeTax();

  const TaxCalculatorSection = () => (
    <div className="space-y-6">
      {/* Tax Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Income Tax Calculator (AY 2024-25)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Annual Income (₹)</label>
                <Input
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  placeholder="Enter annual income"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <Select value={age} onValueChange={setAge}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below60">Below 60 years</SelectItem>
                    <SelectItem value="60to80">60-80 years</SelectItem>
                    <SelectItem value="above80">Above 80 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Tax Deductions (₹)</h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-muted-foreground">Section 80C (EPF, ELSS, PPF)</label>
                  <Input
                    value={deductions.section80C}
                    onChange={(e) => setDeductions({...deductions, section80C: e.target.value})}
                    placeholder="Max: 1,50,000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground">Section 80D (Health Insurance)</label>
                  <Input
                    value={deductions.section80D}
                    onChange={(e) => setDeductions({...deductions, section80D: e.target.value})}
                    placeholder="Max: 25,000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground">Section 24(B) (Home Loan Interest)</label>
                  <Input
                    value={deductions.section24B}
                    onChange={(e) => setDeductions({...deductions, section24B: e.target.value})}
                    placeholder="Max: 2,00,000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground">NPS (Additional 80CCD)</label>
                  <Input
                    value={deductions.nps}
                    onChange={(e) => setDeductions({...deductions, nps: e.target.value})}
                    placeholder="Max: 50,000"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Calculation Results */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Calculation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Gross Income</div>
              <div className="text-xl font-bold text-blue-600">
                ₹{taxCalculation.grossIncome.toLocaleString()}
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Total Deductions</div>
              <div className="text-xl font-bold text-green-600">
                ₹{taxCalculation.deductions.toLocaleString()}
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Taxable Income</div>
              <div className="text-xl font-bold text-orange-600">
                ₹{taxCalculation.taxableIncome.toLocaleString()}
              </div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Total Tax</div>
              <div className="text-xl font-bold text-red-600">
                ₹{Math.round(taxCalculation.totalTax).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span>Income Tax:</span>
              <span className="font-semibold">₹{Math.round(taxCalculation.incomeTax).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Health & Education Cess (4%):</span>
              <span className="font-semibold">₹{Math.round(taxCalculation.cess).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b font-bold">
              <span>Net Income (Take Home):</span>
              <span className="text-green-600">₹{Math.round(taxCalculation.netIncome).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Effective Tax Rate:</span>
              <span className="font-semibold">{taxCalculation.effectiveRate.toFixed(2)}%</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Tax Summary
            </Button>
            <Button variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Generate ITR Draft
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tax Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Tax Calendar & Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {taxReminders.map(reminder => (
              <div key={reminder.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                reminder.priority === 'overdue' ? 'bg-red-50 border-red-200' :
                reminder.priority === 'high' ? 'bg-orange-50 border-orange-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-center gap-3">
                  <Calendar className={`h-5 w-5 ${
                    reminder.priority === 'overdue' ? 'text-red-500' :
                    reminder.priority === 'high' ? 'text-orange-500' :
                    'text-blue-500'
                  }`} />
                  <div>
                    <div className="font-medium">{reminder.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Due: {new Date(reminder.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Badge variant={
                  reminder.priority === 'overdue' ? 'destructive' :
                  reminder.priority === 'high' ? 'default' : 'secondary'
                }>
                  {reminder.daysLeft > 0 ? `${reminder.daysLeft} days left` :
                   reminder.daysLeft === 0 ? 'Due today' : `${Math.abs(reminder.daysLeft)} days overdue`}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const EmergencyManagementSection = () => (
    <div className="space-y-6">
      {/* Emergency Fund Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Emergency Fund Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Current Fund</div>
              <div className="text-2xl font-bold text-blue-600">
                ₹{emergencyFund.current.toLocaleString()}
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Target (6 months)</div>
              <div className="text-2xl font-bold text-green-600">
                ₹{emergencyFund.target.toLocaleString()}
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Monthly Expenses</div>
              <div className="text-2xl font-bold text-orange-600">
                ₹{emergencyFund.monthlyExpenses.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Emergency Fund Progress</span>
              <span>{((emergencyFund.current / emergencyFund.target) * 100).toFixed(1)}% Complete</span>
            </div>
            <Progress value={(emergencyFund.current / emergencyFund.target) * 100} />
            <div className="text-sm text-muted-foreground">
              You need ₹{(emergencyFund.target - emergencyFund.current).toLocaleString()} more to reach your 6-month target
            </div>
          </div>

          <Alert className="mt-4">
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              <strong>Recommendation:</strong> Save ₹{Math.ceil((emergencyFund.target - emergencyFund.current) / 12).toLocaleString()} monthly 
              to complete your emergency fund in 12 months.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Emergency Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Emergency Preparedness Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyScenarios.map(scenario => (
              <Card key={scenario.id} className="border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{scenario.scenario}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">
                          {scenario.probability} Probability
                        </Badge>
                        <Badge variant="outline">
                          {scenario.impact} Impact
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Preparedness</div>
                      <div className={`text-lg font-bold ${
                        scenario.preparedness >= 80 ? 'text-green-600' :
                        scenario.preparedness >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {scenario.preparedness}%
                      </div>
                    </div>
                  </div>
                  
                  <Progress value={scenario.preparedness} className="mb-3" />
                  
                  <div>
                    <h5 className="font-medium mb-2">Action Plan:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {scenario.actionPlan.map((action, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts & Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 border rounded">
                <div>
                  <div className="font-medium">Credit Card Helpline</div>
                  <div className="text-sm text-muted-foreground">For card blocking</div>
                </div>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <div>
                  <div className="font-medium">Bank Customer Care</div>
                  <div className="text-sm text-muted-foreground">Account issues</div>
                </div>
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <div>
                  <div className="font-medium">Insurance Company</div>
                  <div className="text-sm text-muted-foreground">Claim support</div>
                </div>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Emergency Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Block All Cards
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Building className="h-4 w-4 mr-2" />
                Notify Bank About Emergency
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Access Emergency Fund
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Download Important Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Debt Management Emergency Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Emergency Debt Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">If You Can't Pay Bills:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                  <span>Prioritize essential expenses (rent, utilities, groceries)</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                  <span>Contact lenders immediately to explain situation</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                  <span>Ask for payment deferrals or restructuring</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                  <span>Document all communications in writing</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Emergency Income Sources:</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 border rounded">
                  <div className="font-medium">Freelance/Gig Work</div>
                  <div className="text-muted-foreground">Quick income opportunities</div>
                </div>
                <div className="p-2 border rounded">
                  <div className="font-medium">Sell Unused Items</div>
                  <div className="text-muted-foreground">Electronics, furniture, etc.</div>
                </div>
                <div className="p-2 border rounded">
                  <div className="font-medium">Family/Friends Support</div>
                  <div className="text-muted-foreground">Last resort borrowing</div>
                </div>
                <div className="p-2 border rounded">
                  <div className="font-medium">Government Schemes</div>
                  <div className="text-muted-foreground">Emergency welfare programs</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tax & Emergency Center</h1>
        <p className="text-muted-foreground">
          Plan your taxes and prepare for financial emergencies
        </p>
      </div>

      <Tabs defaultValue="tax" className="w-full">
        <TabsList>
          <TabsTrigger value="tax">Tax Calculator</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Planning</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tax" className="mt-6">
          <TaxCalculatorSection />
        </TabsContent>
        
        <TabsContent value="emergency" className="mt-6">
          <EmergencyManagementSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxEmergencyHub;