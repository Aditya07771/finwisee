import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, LayoutDashboard, PenBox } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();

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
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
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
            <Link href="/transaction/create">
              <Button className="btn-hero flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
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
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;