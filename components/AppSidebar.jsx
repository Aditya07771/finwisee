"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Target,
  BookOpen,
  TrendingUp,
  Users,
  Bot,
  PiggyBank,
  Trophy,
  GraduationCap,
  CreditCard,
  Calculator,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview and accounts"
  },
  {
    title: "Budget Tracker",
    url: "/budget",
    icon: Target,
    description: "Track your spending"
  },
  {
    title: "Goals",
    url: "/goals",
    icon: TrendingUp,
    description: "Financial goals"
  },
  {
    title: "Progress",
    url: "/progress",
    icon: BookOpen,
    description: "Track your journey"
  },
];

const toolsItems = [
  {
    title: "AI Coach",
    url: "/ai-coach",
    icon: Bot,
    description: "Personal finance AI"
  },
  {
    title: "Micro Investment",
    url: "/investment",
    icon: PiggyBank,
    description: "Round-up investing"
  },
  {
    title: "Credit Score",
    url: "/credit-score",
    icon: CreditCard,
    description: "Monitor your score"
  },
  {
    title: "Tax Calculator",
    url: "/tax-calculator",
    icon: Calculator,
    description: "Calculate taxes"
  },
];

const communityItems = [
  {
    title: "Community",
    url: "/community",
    icon: Users,
    description: "Connect with others"
  },
  {
    title: "Gamification",
    url: "/gamification",
    icon: Trophy,
    description: "Challenges & rewards"
  },
  {
    title: "Learning",
    url: "/learning",
    icon: GraduationCap,
    description: "Financial education"
  },
];

export default function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const collapsed = state === "collapsed";

  const isActive = (path) => pathname === path;

  const NavGroup = ({ items, label, isExpanded = true }) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  className={cn(
                    "nav-item",
                    isActive(item.url) && "nav-item-active"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && (
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar
      className={cn(
        "transition-all duration-300 border-r",
        collapsed ? "w-16" : "w-72"
      )}
    >
      <SidebarContent className="bg-sidebar">
        {/* Navigation Groups - Logo section removed */}
        <div className="flex-1 overflow-auto py-6 space-y-6">
          <NavGroup items={navigationItems} label="Overview" />
          <NavGroup items={toolsItems} label="Tools" />
          <NavGroup items={communityItems} label="Community" />
        </div>

        {/* User Stats (when not collapsed) */}
        {!collapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Level 3</span>
                <span className="text-xs text-muted-foreground">2,450 XP</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-3/4"></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">550 XP to next level</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}