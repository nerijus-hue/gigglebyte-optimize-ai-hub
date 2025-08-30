import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Bot, Brain, TrendingUp, DollarSign, BarChart3, Shield } from "lucide-react";

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
        className="relative hero-gradient min-h-screen flex items-center justify-center text-center px-6 pt-20"
      >
        <div className="max-w-4xl mx-auto fade-in">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/b247747e-24b7-45f2-bd08-6fea82dcd635.png" 
              alt="Gigglebyte" 
              className="mx-auto h-40 md:h-64 w-auto"
            />
          </div>
          <p className="text-xl md:text-2xl text-white mb-8 font-light">
            Optimizing Business Processes with Automation and AI Integration
          </p>
          <p className="text-lg text-white mb-12 max-w-2xl mx-auto leading-relaxed">
            We streamline your operations, automate repetitive tasks, and integrate intelligent AI agents to boost efficiency and innovation.
          </p>
          <Link to="/contact">
            <Button size="lg" className="glow-on-hover bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-medium">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-delay">
            <h2 className="text-4xl font-bold text-primary mb-6">Target Audience</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how our solutions can transform your specific business challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-delay-2">
            <Card className="card-gradient border-border/50 glow-on-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Growing Startups</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Are you a growing startup juggling too many manual tasks? Contact us to discover how our automations and AI integrations can streamline your operations, boost productivity, and free up your team for innovation.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient border-border/50 glow-on-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Small-Medium Businesses</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Running an SMB without a full tech team? Reach out to learn how we can automate your daily workflows, integrate AI for smarter insights, and help you scale without the overhead.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient border-border/50 glow-on-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Small Business Owners</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  As a small business owner overwhelmed by repetitive processes? Let's chat about customizing automations and AI agents to cut costs, save time, and drive your growth forward.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient border-border/50 glow-on-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Fitness Industry</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  In the fitness industry dealing with membership tracking? Get in touch for tailored integrations that automate reminders, personalize programs with AI, and improve retention rates.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient border-border/50 glow-on-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Online Retail</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Running an online retail business bogged down by manual updates? Reach out to learn how we can embed AI for predictive analytics, reduce errors, and boost your bottom line.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient border-border/50 glow-on-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">E-commerce Stores</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Operating an e-commerce store with inventory headaches? Contact us to understand how our automations and AI integrations can handle stock management, personalize customer experiences, and increase sales.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient border-border/50 glow-on-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Consulting Firms</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Leading a consulting firm buried in client admin? Contact us to discover how automations and AI can organize workflows, integrate tools for better collaboration, and elevate your service delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient border-border/50 glow-on-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Financial Services</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Managing financial workflows overloaded with manual checks? Let's chat about custom integrations that enhance forecasting with AI, reduce errors, and boost your operational resilience.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient border-border/50 glow-on-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Multi-Hat Business Owners</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Business owner wearing too many hats? Contact us to see how our automations free you from repetitive work, integrate AI for growth insights, and let you focus on what matters most.
                </p>
              </CardContent>
            </Card>
          </div>
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

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-primary">Ready to Transform Your Business?</h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss how we can optimize your processes and boost your efficiency
            </p>
            <div className="pt-4">
              <Link to="/contact">
                <Button size="lg" className="glow-on-hover bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
                  Book a call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;