"use client";

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  CreditCard,
  Calculator,
  Shield,
  Info,
  ArrowRight,
  Building,
  Percent,
  Clock,
  Target,
  FileText,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CreditLoanHub = ({ userProfile }) => {
  const [creditScore, setCreditScore] = useState(720);
  const [creditHistory, setCreditHistory] = useState([
    { month: 'Jan', score: 680 },
    { month: 'Feb', score: 695 },
    { month: 'Mar', score: 710 },
    { month: 'Apr', score: 715 },
    { month: 'May', score: 720 }
  ]);
  
  const [loanAmount, setLoanAmount] = useState('500000');
  const [loanTenure, setLoanTenure] = useState('20');
  const [selectedLoanType, setSelectedLoanType] = useState('home');

  // Credit improvement tips
  const [improvementTips, setImprovementTips] = useState([
    {
      id: 1,
      category: 'Payment History',
      tip: 'Pay all bills on time, every time',
      impact: 'High',
      timeframe: 'Immediate',
      implemented: true,
      description: 'Payment history is 35% of your credit score. Never miss a payment.'
    },
    {
      id: 2,
      category: 'Credit Utilization',
      tip: 'Keep credit card usage below 30%',
      impact: 'High',
      timeframe: '1-2 months',
      implemented: false,
      description: 'Currently using 45% of available credit. Reduce to below 30% for better score.'
    },
    {
      id: 3,
      category: 'Credit Mix',
      tip: 'Diversify credit types (cards, loans)',
      impact: 'Medium',
      timeframe: '3-6 months',
      implemented: false,
      description: 'Having different types of credit shows you can manage various financial products.'
    },
    {
      id: 4,
      category: 'Credit Age',
      tip: 'Keep old accounts open',
      impact: 'Medium',
      timeframe: 'Ongoing',
      implemented: true,
      description: 'Average account age is 4.2 years. Keep oldest accounts active.'
    }
  ]);

  // Loan options data
  const [loanOptions, setLoanOptions] = useState({
    home: [
      {
        provider: 'SBI Home Loans',
        type: 'Government',
        interestRate: 8.50,
        processingFee: 0.35,
        maxTenure: 30,
        features: ['Tax benefits', 'Flexible EMI', 'Part prepayment'],
        rating: 4.2,
        specialOffer: 'Festive rates - 8.35% for women borrowers'
      },
      {
        provider: 'HDFC Home Loans',
        type: 'Private',
        interestRate: 8.75,
        processingFee: 0.50,
        maxTenure: 30,
        features: ['Quick approval', 'Digital process', 'Balance transfer'],
        rating: 4.5,
        specialOffer: 'Pre-approved customers get 0.10% discount'
      },
      {
        provider: 'LIC Housing Finance',
        type: 'NBFC',
        interestRate: 8.40,
        processingFee: 0.25,
        maxTenure: 30,
        features: ['Lowest rates', 'Senior citizen benefits', 'Rural property'],
        rating: 4.1,
        specialOffer: 'No processing fee for loans above ₹25 lakhs'
      }
    ],
    personal: [
      {
        provider: 'Bajaj Finserv',
        type: 'NBFC',
        interestRate: 11.50,
        processingFee: 2.50,
        maxTenure: 7,
        features: ['Instant approval', 'No collateral', 'Flexible EMI dates'],
        rating: 4.3,
        specialOffer: 'First-time customers get 0.50% discount'
      },
      {
        provider: 'HDFC Personal Loan',
        type: 'Private',
        interestRate: 12.25,
        processingFee: 2.00,
        maxTenure: 6,
        features: ['Salary account holders', 'Digital journey', 'Quick disbursal'],
        rating: 4.4,
        specialOffer: 'Existing customers get preferential rates'
      }
    ],
    business: [
      {
        provider: 'Mudra Loan (PMMY)',
        type: 'Government',
        interestRate: 9.50,
        processingFee: 0.00,
        maxTenure: 10,
        features: ['Collateral free', 'Government backed', 'Subsidized rates'],
        rating: 4.0,
        specialOffer: 'Interest subvention available for timely repayment'
      },
      {
        provider: 'Axis Bank Business Loan',
        type: 'Private',
        interestRate: 11.75,
        processingFee: 1.00,
        maxTenure: 5,
        features: ['Working capital', 'Quick approval', 'Overdraft facility'],
        rating: 4.2,
        specialOffer: 'Digital documentation for existing customers'
      }
    ]
  });

  const getCreditScoreColor = (score) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCreditScoreStatus = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    return 'Poor';
  };

  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / 12 / 100;
    const numberOfPayments = tenure * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                 (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return Math.round(emi);
  };

  const CreditScoreSection = () => (
    <div className="space-y-6">
      {/* Credit Score Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Your Credit Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold mb-2 ${getCreditScoreColor(creditScore)}`}>
              {creditScore}
            </div>
            <Badge className={
              creditScore >= 750 ? 'bg-green-100 text-green-800' :
              creditScore >= 650 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }>
              {getCreditScoreStatus(creditScore)}
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: 3 days ago
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Range</div>
              <div className="font-semibold">300-850</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Your Position</div>
              <div className="font-semibold">{Math.round(((creditScore - 300) / 550) * 100)}%</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Change</div>
              <div className="font-semibold text-green-600 flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4" />
                +35
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Next Review</div>
              <div className="font-semibold">28 days</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Excellent (750+)</span>
              <span>30 points to go</span>
            </div>
            <Progress value={((creditScore - 300) / 550) * 100} />
          </div>
        </CardContent>
      </Card>

      {/* Credit Score Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Score Improvement Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {improvementTips.map(tip => (
              <div key={tip.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      {tip.implemented ? 
                        <CheckCircle className="h-4 w-4 text-green-500" /> :
                        <Clock className="h-4 w-4 text-orange-500" />
                      }
                      {tip.category}
                    </h4>
                    <p className="font-medium text-sm">{tip.tip}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={
                      tip.impact === 'High' ? 'destructive' :
                      tip.impact === 'Medium' ? 'default' : 'secondary'
                    }>
                      {tip.impact} Impact
                    </Badge>
                    <Badge variant="outline">{tip.timeframe}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {tip.description}
                </p>
                {!tip.implemented && (
                  <Button size="sm" variant="outline">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Get Action Steps
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const LoanComparisonSection = () => (
    <div className="space-y-6">
      {/* Loan Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Loan Calculator & Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Loan Type</label>
              <Select value={selectedLoanType} onValueChange={setSelectedLoanType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home Loan</SelectItem>
                  <SelectItem value="personal">Personal Loan</SelectItem>
                  <SelectItem value="business">Business Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Loan Amount (₹)</label>
              <Input
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tenure (Years)</label>
              <Input
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                placeholder="Enter years"
              />
            </div>
          </div>

          {/* Loan Options Comparison */}
          <div className="space-y-4">
            <h4 className="font-semibold">Best Options for You (Credit Score: {creditScore})</h4>
            {loanOptions[selectedLoanType]?.map((loan, index) => {
              const emi = calculateEMI(parseInt(loanAmount), loan.interestRate, parseInt(loanTenure));
              const totalAmount = emi * parseInt(loanTenure) * 12;
              const totalInterest = totalAmount - parseInt(loanAmount);
              const processingFeeAmount = (parseInt(loanAmount) * loan.processingFee) / 100;

              return (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold">{loan.provider}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{loan.type}</Badge>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-full ${
                                  i < Math.floor(loan.rating) ? 'bg-yellow-400' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-muted-foreground ml-1">
                              {loan.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm">
                        Apply Now
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Interest Rate</div>
                        <div className="text-xl font-bold text-blue-600">
                          {loan.interestRate}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Monthly EMI</div>
                        <div className="text-xl font-bold">
                          ₹{emi.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Processing Fee</div>
                        <div className="text-xl font-bold">
                          ₹{Math.round(processingFeeAmount).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Interest</div>
                        <div className="text-xl font-bold text-red-600">
                          ₹{Math.round(totalInterest).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {loan.specialOffer && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">
                            Special Offer: {loan.specialOffer}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {loan.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Max Tenure: </span>
                        <span className="font-medium">{loan.maxTenure} years</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Amount: </span>
                        <span className="font-medium">₹{Math.round(totalAmount).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Eligibility: </span>
                        <span className={`font-medium ${
                          creditScore >= 750 ? 'text-green-600' :
                          creditScore >= 650 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {creditScore >= 750 ? 'Excellent' :
                           creditScore >= 650 ? 'Good' : 'Fair'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Government Schemes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Government Loan Schemes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">PM Awas Yojana (PMAY)</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Credit-linked subsidy scheme for affordable housing
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Interest Subsidy:</span>
                  <span className="font-medium text-green-600">Up to 6.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Loan Amount:</span>
                  <span className="font-medium">₹12 Lakhs</span>
                </div>
                <div className="flex justify-between">
                  <span>Income Limit:</span>
                  <span className="font-medium">₹18 Lakhs/year</span>
                </div>
              </div>
              <Button size="sm" className="w-full mt-3">Check Eligibility</Button>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Mudra Loan (PMMY)</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Micro-finance scheme for small businesses
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Interest Rate:</span>
                  <span className="font-medium text-green-600">8.5-11.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Amount:</span>
                  <span className="font-medium">₹10 Lakhs</span>
                </div>
                <div className="flex justify-between">
                  <span>Collateral:</span>
                  <span className="font-medium text-green-600">Not Required</span>
                </div>
              </div>
              <Button size="sm" className="w-full mt-3">Apply Online</Button>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Stand-Up India</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Loans for SC/ST and women entrepreneurs
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Loan Range:</span>
                  <span className="font-medium">₹10L - ₹1Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>Tenure:</span>
                  <span className="font-medium">Up to 7 years</span>
                </div>
                <div className="flex justify-between">
                  <span>Margin:</span>
                  <span className="font-medium text-green-600">10%</span>
                </div>
              </div>
              <Button size="sm" className="w-full mt-3">Learn More</Button>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Education Loan Scheme</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Central government sponsored education loans
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Interest Rate:</span>
                  <span className="font-medium text-green-600">9.5-11.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Amount:</span>
                  <span className="font-medium">₹30 Lakhs</span>
                </div>
                <div className="flex justify-between">
                  <span>Moratorium:</span>
                  <span className="font-medium text-green-600">Course + 1 year</span>
                </div>
              </div>
              <Button size="sm" className="w-full mt-3">Calculate EMI</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Credit & Loan Center</h1>
        <p className="text-muted-foreground">
          Monitor your credit health and find the best loan options
        </p>
      </div>

      <Tabs defaultValue="credit" className="w-full">
        <TabsList>
          <TabsTrigger value="credit">Credit Score</TabsTrigger>
          <TabsTrigger value="loans">Loan Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="credit" className="mt-6">
          <CreditScoreSection />
        </TabsContent>
        
        <TabsContent value="loans" className="mt-6">
          <LoanComparisonSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreditLoanHub;