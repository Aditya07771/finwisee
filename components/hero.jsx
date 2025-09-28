// path: components/Hero.jsx

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, TrendingUp, Award, Users } from "lucide-react";
// import heroImage from "@/assets/hero-dashboard.jpg";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-secondary/10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
          <Award className="w-4 h-4 mr-2" />
          AI-Powered Financial Intelligence
        </Badge>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-title leading-tight">
          Master Your Money
          <br />
          <span className="text-4xl md:text-6xl lg:text-7xl">with FinWise</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Transform your financial habits with our gamified learning platform. 
          Track expenses, earn rewards, and build wealth through expert-led workshops and AI insights.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <Button size="lg" className="btn-hero text-lg px-8 py-6">
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover-lift">
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>10,000+ Active Users</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-success" />
            <span>85% Improved Savings</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Award className="h-4 w-4 text-warning" />
            <span>50+ Expert Workshops</span>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="relative max-w-6xl mx-auto">
          <div className="floating-animation">
            <img
              src='/hero-dashboard.jpg'
              alt="FinWise Dashboard Preview"
              className="rounded-2xl shadow-2xl border border-border/20 w-full"
            />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;