import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Mail, 
  MapPin, 
  Phone,
  Heart
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold gradient-title">FinWise</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering individuals to build better financial habits through gamified learning, 
              expert guidance, and AI-powered insights.
            </p>
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-accent hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center cursor-pointer transition-colors">
                <Twitter className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-accent hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center cursor-pointer transition-colors">
                <Linkedin className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-accent hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center cursor-pointer transition-colors">
                <Github className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
              <li><a href="#workshops" className="text-muted-foreground hover:text-primary transition-colors">Workshops</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Success Stories</a></li>
              <li><a href="#api" className="text-muted-foreground hover:text-primary transition-colors">API</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#press" className="text-muted-foreground hover:text-primary transition-colors">Press</a></li>
              <li><a href="#partners" className="text-muted-foreground hover:text-primary transition-colors">Partners</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@finwise.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              🔒 Bank-level Security
            </Badge>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>© {currentYear} FinWise. All rights reserved.</span>
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-destructive fill-destructive" />
            <span>for financial freedom</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;