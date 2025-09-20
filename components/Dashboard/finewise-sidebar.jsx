// components/Dashboard/finwise-sidebar.js
// OR app/dashboard/_components/finwise-sidebar.js (choose one location)

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  TrendingUp,
  Target,
  BookOpen,
  BarChart3,
  Users,
  Bot,
  Coins,
  Trophy,
  GraduationCap,
  CreditCard,
  Calculator,
  ChevronRight,
  Wallet,
  PiggyBank,
  LineChart,
  Award,
  MessageSquare,
  Settings,
  HelpCircle,
  Bell,
  User,
  LogOut,
  Plus
} from "lucide-react";

const FinWiseSidebar = () => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (key) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedItems(newExpanded);
  };

  const menuItems = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
          badge: null,
          active: pathname === "/dashboard"
        }
      ]
    },
    {
      title: "Financial Management",
      items: [
        {
          title: "Budget Tracker",
          href: "/dashboard/budget",
          icon: TrendingUp,
          badge: "Active",
          active: pathname.startsWith("/dashboard/budget"),
          subItems: [
            { title: "Monthly Budget", href: "/dashboard/budget/monthly" },
            { title: "Category Analysis", href: "/dashboard/budget/categories" },
            { title: "Budget History", href: "/dashboard/budget/history" }
          ]
        },
        {
          title: "Goals",
          href: "/dashboard/goals",
          icon: Target,
          badge: "3",
          badgeVariant: "secondary",
          active: pathname.startsWith("/dashboard/goals"),
          subItems: [
            { title: "Savings Goals", href: "/dashboard/goals/savings" },
            { title: "Investment Goals", href: "/dashboard/goals/investment" },
            { title: "Debt Goals", href: "/dashboard/goals/debt" }
          ]
        },
        {
          title: "Accounts",
          href: "/dashboard/accounts",
          icon: Wallet,
          active: pathname.startsWith("/dashboard/accounts")
        }
      ]
    },
    {
      title: "Investment & Growth",
      items: [
        {
          title: "Micro-Investment",
          href: "/dashboard/micro-investment",
          icon: Coins,
          badge: "Auto",
          badgeVariant: "outline",
          active: pathname.startsWith("/dashboard/micro-investment"),
          subItems: [
            { title: "Round-up Settings", href: "/dashboard/micro-investment/roundup" },
            { title: "Portfolio View", href: "/dashboard/micro-investment/portfolio" },
            { title: "Investment History", href: "/dashboard/micro-investment/history" }
          ]
        },
        {
          title: "Progress Tracking",
          href: "/dashboard/progress",
          icon: BarChart3,
          active: pathname.startsWith("/dashboard/progress"),
          subItems: [
            { title: "Net Worth", href: "/dashboard/progress/networth" },
            { title: "Savings Rate", href: "/dashboard/progress/savings" },
            { title: "Investment Performance", href: "/dashboard/progress/investments" }
          ]
        }
      ]
    },
    {
      title: "AI & Learning",
      items: [
        {
          title: "AI Coach",
          href: "/dashboard/ai-coach",
          icon: Bot,
          badge: "Smart",
          badgeVariant: "default",
          active: pathname.startsWith("/dashboard/ai-coach")
        },
        {
          title: "Learning Hub",
          href: "/dashboard/learning",
          icon: BookOpen,
          badge: "New",
          badgeVariant: "destructive",
          active: pathname.startsWith("/dashboard/learning"),
          subItems: [
            { title: "Courses", href: "/dashboard/learning/courses" },
            { title: "Articles", href: "/dashboard/learning/articles" },
            { title: "Webinars", href: "/dashboard/learning/webinars" },
            { title: "My Progress", href: "/dashboard/learning/progress" }
          ]
        },
        {
          title: "Education Center",
          href: "/dashboard/education",
          icon: GraduationCap,
          active: pathname.startsWith("/dashboard/education"),
          subItems: [
            { title: "Financial Basics", href: "/dashboard/education/basics" },
            { title: "Investment Guide", href: "/dashboard/education/investing" },
            { title: "Tax Education", href: "/dashboard/education/tax" },
            { title: "Retirement Planning", href: "/dashboard/education/retirement" }
          ]
        }
      ]
    },
    {
      title: "Tools & Calculators",
      items: [
        {
          title: "Tax Calculator",
          href: "/dashboard/tax-calculator",
          icon: Calculator,
          active: pathname.startsWith("/dashboard/tax-calculator")
        },
        {
          title: "Credit Score Tracker",
          href: "/dashboard/credit-score",
          icon: CreditCard,
          badge: "750",
          badgeVariant: "secondary",
          active: pathname.startsWith("/dashboard/credit-score")
        }
      ]
    },
    {
      title: "Social & Gamification",
      items: [
        {
          title: "Community",
          href: "/dashboard/community",
          icon: Users,
          active: pathname.startsWith("/dashboard/community"),
          subItems: [
            { title: "Forums", href: "/dashboard/community/forums" },
            { title: "Groups", href: "/dashboard/community/groups" },
            { title: "Events", href: "/dashboard/community/events" }
          ]
        },
        {
          title: "Challenges & Rewards",
          href: "/dashboard/gamification",
          icon: Trophy,
          badge: "5",
          badgeVariant: "secondary",
          active: pathname.startsWith("/dashboard/gamification"),
          subItems: [
            { title: "Active Challenges", href: "/dashboard/gamification/challenges" },
            { title: "Achievements", href: "/dashboard/gamification/achievements" },
            { title: "Leaderboard", href: "/dashboard/gamification/leaderboard" },
            { title: "Rewards Store", href: "/dashboard/gamification/rewards" }
          ]
        }
      ]
    }
  ];

  const renderMenuItem = (item, isSubItem = false) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems.has(item.title);
    
    if (hasSubItems && !isSubItem) {
      return (
        <Collapsible key={item.title}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              onClick={() => toggleExpanded(item.title)}
              className={cn(
                "w-full justify-between",
                item.active && "bg-primary/10 text-primary border-r-2 border-primary"
              )}
            >
              <div className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <Badge variant={item.badgeVariant || "default"} className="text-xs">
                    {item.badge}
                  </Badge>
                )}
                <ChevronRight 
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isExpanded && "rotate-90"
                  )} 
                />
              </div>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.subItems.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild>
                    <Link 
                      href={subItem.href}
                      className={cn(
                        "ml-6",
                        pathname === subItem.href && "bg-primary/10 text-primary"
                      )}
                    >
                      {subItem.title}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <Link 
            href={item.href}
            className={cn(
              "w-full justify-between",
              item.active && "bg-primary/10 text-primary border-r-2 border-primary"
            )}
          >
            <div className="flex items-center gap-2">
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </div>
            {item.badge && (
              <Badge variant={item.badgeVariant || "default"} className="text-xs">
                {item.badge}
              </Badge>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="border-r bg-card">
      <SidebarHeader className="border-b p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">F</span>
          </div>
          <div>
            <h2 className="font-bold text-lg gradient-title">FinWise</h2>
            <p className="text-xs text-muted-foreground">Financial Dashboard</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-2 gap-2 p-2">
              <Button size="sm" variant="outline" asChild>
                <Link href="/transaction/create" className="flex items-center gap-1">
                  <Plus className="h-3 w-3" />
                  Add
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/dashboard/ai-coach" className="flex items-center gap-1">
                  <Bot className="h-3 w-3" />
                  AI
                </Link>
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Main Navigation */}
        {menuItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => renderMenuItem(item))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/notifications" className="w-full justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </div>
                    <Badge variant="destructive" className="text-xs">3</Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/support">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />
        
        {/* User Profile Section */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground">Premium Member</p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default FinWiseSidebar;