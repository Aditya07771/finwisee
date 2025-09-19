import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Star, CheckCircle } from "lucide-react";

const CallToAction = () => {
  const benefits = [
    "Free to start with premium features",
    "Expert-led workshops and webinars", 
    "AI-powered financial insights",
    "Gamified learning experience",
    "Community support and networking",
    "Industry partnerships and rewards"
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <Card className="card-elegant max-w-4xl mx-auto overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-warning text-warning" />
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-primary mr-3" />
              <span className="text-lg font-semibold text-primary">Ready to Transform Your Finances?</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-title">
              Join 10,000+ Users
              <br />
              Building Wealth
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your financial transformation today with FinWise. No credit card required. 
              Cancel anytime. Your financial freedom is just one click away.
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-left">
                  <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="btn-hero text-lg px-8 py-6">
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover-lift">
                Schedule Demo
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              ✨ Free forever plan available • No setup fees • 24/7 support
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CallToAction;