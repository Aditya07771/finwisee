import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, BookOpen, Trophy, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      step: "01",
      title: "Sign Up & Set Goals",
      description: "Create your account and define your financial objectives - whether saving for a trip, building an emergency fund, or planning investments.",
      color: "from-primary to-primary-glow"
    },
    {
      icon: BookOpen,
      step: "02", 
      title: "Learn & Track",
      description: "Use our tools to track expenses, attend workshops, and complete learning modules. Every action earns you points and builds your financial knowledge.",
      color: "from-secondary to-primary"
    },
    {
      icon: Trophy,
      step: "03",
      title: "Earn & Achieve",
      description: "Unlock badges, climb leaderboards, and receive rewards as you hit milestones. Celebrate your progress with our gamified system.",
      color: "from-warning to-secondary"
    },
    {
      icon: TrendingUp,
      step: "04",
      title: "Grow & Thrive",
      description: "Watch your financial health improve with AI insights, personalized recommendations, and continued learning from industry experts.",
      color: "from-success to-primary"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-title">
            How FinWise Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our proven 4-step approach makes financial learning engaging and effective. 
            Start your journey today and see results in weeks, not years.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-success opacity-30 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <Card key={index} className="card-elegant hover-lift text-center group relative">
                <CardContent className="p-8">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-sm font-bold`}>
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;