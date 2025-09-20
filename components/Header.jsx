"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Menu, 
  LayoutDashboard, 
  PenBox,
  ChevronDown,
  CreditCard,
  Target,
  TrendingUp,
  Bot,
  Coins,
  Shield,
  Calculator,
  Users,
  Trophy,
  BookOpen,
  PieChart,
  Wallet,
  X
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const NavigationDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navigationSections = [
    {
      title: "Overview",
      items: [
        {
          name: "Dashboard",
          description: "Overview and accounts",
          icon: LayoutDashboard,
          href: "/dashboard",
          color: "text-blue-500"
        },
        {
          name: "Budget Tracker",
          description: "Track your spending",
          icon: PieChart,
          href: "/budget",
          color: "text-green-500"
        },
        {
          name: "Goals",
          description: "Financial goals",
          icon: Target,
          href: "/goals",
          color: "text-purple-500"
        },
        {
          name: "Progress",
          description: "Track your journey",
          icon: TrendingUp,
          href: "/progress",
          color: "text-orange-500"
        }
      ]
    },
    {
      title: "Tools",
      items: [
        {
          name: "AI Coach",
          description: "Personal finance AI",
          icon: Bot,
          href: "/ai-coach",
          color: "text-indigo-500"
        },
        {
          name: "Micro Investment",
          description: "Round-up investing",
          icon: Coins,
          href: "/micro-investment",
          color: "text-yellow-500"
        },
        {
          name: "Credit Score",
          description: "Monitor your score",
          icon: Shield,
          href: "/credit-score",
          color: "text-red-500"
        },
        {
          name: "Tax Calculator",
          description: "Calculate taxes",
          icon: Calculator,
          href: "/tax-calculator",
          color: "text-teal-500"
        }
      ]
    },
    {
      title: "Community",
      items: [
        {
          name: "Community",
          description: "Connect with others",
          icon: Users,
          href: "/community",
          color: "text-pink-500"
        },
        {
          name: "Gamification",
          description: "Challenges & rewards",
          icon: Trophy,
          href: "/gamification",
          color: "text-amber-500"
        }
      ]
    },
    {
      title: "Learning",
      items: [
        {
          name: "Financial Education",
          description: "Learn and grow",
          icon: BookOpen,
          href: "/education",
          color: "text-emerald-500"
        }
      ]
    }
  ];

  return (
    <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-t border-border/20 z-40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-900 border-b border-gray-200 pb-2">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50/80 transition-all duration-200 hover:shadow-md"
                  >
                    <div className={`p-2 rounded-md bg-gray-50 group-hover:bg-white transition-colors ${item.color}`}>
                      <item.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 leading-tight">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-3">
            <Link href="/transaction/create" onClick={onClose}>
              <Button className="btn-hero flex items-center gap-2">
                <PenBox size={16} />
                Add Transaction
              </Button>
            </Link>
            <Link href="/dashboard" onClick={onClose}>
              <Button variant="outline" className="flex items-center gap-2">
                <LayoutDashboard size={16} />
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/chatbot" onClick={onClose}>
              <Button variant="outline" className="flex items-center gap-2">
                <Bot size={16} />
                AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const mobileMenuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Budget Tracker", href: "/budget", icon: PieChart },
    { name: "Goals", href: "/goals", icon: Target },
    { name: "AI Coach", href: "/ai-coach", icon: Bot },
    { name: "Community", href: "/community", icon: Users },
    { name: "Learning", href: "/learning", icon: BookOpen },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4 space-y-2">
          {mobileMenuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={onClose}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <item.icon size={20} className="text-primary" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t">
            <Link href="/transaction/create" onClick={onClose}>
              <Button className="w-full btn-hero flex items-center justify-center gap-2">
                <PenBox size={16} />
                Add Transaction
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border/50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-2xl font-bold gradient-title">FinWise</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
              How it Works
            </a>
            <a href="#workshops" className="text-muted-foreground hover:text-primary transition-colors">
              Workshops
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
          </SignedOut>
          
          <SignedIn>
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                <span>Menu</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </Button>
            </div>
            
            <Link
              href="/chatbot"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Bot size={18} />
              <span>AI Assistant</span>
            </Link>
          </SignedIn>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="hidden md:inline-flex">
                Sign In
              </Button>
            </SignInButton>
            
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <Button className="btn-hero">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <Link href="/transaction/create" className="hidden md:block">
              <Button className="btn-hero flex items-center gap-2">
                <PenBox size={18} />
                <span>Add Transaction</span>
              </Button>
            </Link>
            
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {/* Navigation Dropdown for Desktop */}
      <SignedIn>
        <div 
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <NavigationDropdown 
            isOpen={isDropdownOpen} 
            onClose={() => setIsDropdownOpen(false)} 
          />
        </div>
      </SignedIn>

      {/* Mobile Menu */}
      <SignedIn>
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      </SignedIn>
    </header>
  );
};

export default Header;