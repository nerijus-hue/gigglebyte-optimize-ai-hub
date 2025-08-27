import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Bot, Brain, TrendingUp, DollarSign, BarChart3, Shield } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import servicesImage from "@/assets/services-icons.jpg";

const Home = () => {
  const services = [
    {
      icon: Settings,
      title: "Business Process Optimization",
      description: "Analyze and refine workflows for maximum productivity."
    },
    {
      icon: Bot,
      title: "Automation Solutions", 
      description: "Implement tools to handle routine tasks seamlessly."
    },
    {
      icon: Brain,
      title: "AI Agent Integrations",
      description: "Embed smart agents into your systems for real-time decision-making."
    }
  ];

  const benefits = [
    { icon: TrendingUp, title: "Increased Efficiency", description: "Streamline operations for better performance" },
    { icon: DollarSign, title: "Cost Savings", description: "Reduce operational expenses through automation" },
    { icon: BarChart3, title: "Scalable Growth", description: "Build systems that grow with your business" },
    { icon: Shield, title: "Future-Proof Tech", description: "Stay ahead with cutting-edge solutions" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative hero-gradient min-h-screen flex items-start justify-center text-center px-6 pt-20"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 31, 63, 0.9) 0%, rgba(169, 169, 169, 0.7) 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-inter tracking-tight">
            Gigglebyte
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            Optimizing Business Processes with Automation and AI Integration
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            We streamline your operations, automate repetitive tasks, and integrate intelligent AI agents to boost efficiency and innovation.
          </p>
          <Link to="/contact">
            <Button size="lg" className="glow-on-hover bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-medium">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-delay">
            <h2 className="text-4xl font-bold text-primary mb-6">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your business with our comprehensive suite of optimization and automation solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 fade-in-delay-2">
            {services.map((service, index) => (
              <Card key={index} className="card-gradient border-border/50 glow-on-hover group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Why Choose Gigglebyte</h2>
            <p className="text-xl text-muted-foreground">
              Unlock your business potential with proven results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center glow-on-hover border-border/50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial & CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-t from-muted/20 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="card-gradient border-border/50 mb-12">
            <CardContent className="p-8">
              <blockquote className="text-lg italic text-muted-foreground mb-4">
                "Gigglebyte transformed our operations completely. Their AI integration reduced our processing time by 60% and saved us thousands in operational costs."
              </blockquote>
              <cite className="text-primary font-medium">Sarah Johnson, CEO at TechFlow Solutions</cite>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Ready to Transform Your Business?</h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss how we can optimize your processes and boost your efficiency
            </p>
            <Link to="/contact">
              <Button size="lg" className="glow-on-hover bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;