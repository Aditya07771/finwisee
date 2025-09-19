import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Target, 
  Trophy, 
  BookOpen, 
  Brain, 
  Bell,
  Users,
  Handshake,
  TrendingUp
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Calculator,
      title: "Smart Budget Tools",
      description: "Intuitive budget planners, expense trackers, and savings calculators designed for all skill levels.",
      badge: "Essential",
      color: "text-primary"
    },
    {
      icon: Target,
      title: "Goal-Based Planning",
      description: "Set and track financial goals for education, travel, emergency funds, and more with personalized milestones.",
      badge: "Popular",
      color: "text-secondary"
    },
    {
      icon: Trophy,
      title: "Gamified Learning",
      description: "Earn points, unlock badges, and climb leaderboards as you build better financial habits.",
      badge: "Engaging",
      color: "text-warning"
    },
    {
      icon: BookOpen,
      title: "Expert Workshops",
      description: "Regular sessions on financial literacy, investing basics, and digital banking from industry experts.",
      badge: "Educational",
      color: "text-success"
    },
    {
      icon: Brain,
      title: "AI Insights",
      description: "Personalized recommendations on spending habits, savings opportunities, and financial optimization.",
      badge: "Intelligent",
      color: "text-primary"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Proactive notifications for overspending, bill reminders, and savings opportunities.",
      badge: "Proactive",
      color: "text-secondary"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with like-minded individuals on their financial journey and share success stories.",
      badge: "Social",
      color: "text-success"
    },
    {
      icon: Handshake,
      title: "Industry Partnerships",
      description: "Exclusive benefits through collaborations with banks, fintechs, and government programs.",
      badge: "Exclusive",
      color: "text-warning"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Comprehensive analytics and reports to visualize your financial growth over time.",
      badge: "Analytics",
      color: "text-primary"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-accent/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Comprehensive Features
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-title">
            Everything You Need for
            <br />Financial Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From basic budgeting to advanced investment strategies, FinWise provides all the tools 
            and knowledge you need to achieve your financial goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-elegant hover-lift group">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-accent/50 ${feature.color} group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;