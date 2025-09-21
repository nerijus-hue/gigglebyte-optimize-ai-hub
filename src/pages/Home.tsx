import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Settings, Bot, Brain, TrendingUp, DollarSign, BarChart3, Shield, CheckCircle, Zap, Clock, Target, ChevronDown, ChevronUp, Users } from "lucide-react";

const Home = () => {
  const [allExpanded, setAllExpanded] = useState(false);

  const toggleAllBenefits = () => {
    setAllExpanded(!allExpanded);
  };
  const services = [
    {
      icon: Users,
      title: "CRM Implementation",
      description: "Build your business backbone with CRM systems and integrated automation workflows."
    },
    {
      icon: Settings,
      title: "Business Process Optimization",
      description: "Streamline operations and eliminate inefficiencies through intelligent process redesign."
    },
    {
      icon: Bot,
      title: "Automation Solutions", 
      description: "Custom automation workflows that save time and reduce manual workload significantly."
    },
    {
      icon: Brain,
      title: "AI Agent Integrations",
      description: "Deploy smart AI agents that handle routine tasks and enhance decision-making capabilities."
    }
  ];

  const benefits = [
    { icon: TrendingUp, title: "Increased Efficiency", description: "Streamline operations for better performance" },
    { icon: DollarSign, title: "Cost Savings", description: "Reduce operational expenses through automation" },
    { icon: BarChart3, title: "Scalable Growth", description: "Build systems that grow with your business" },
    { icon: Shield, title: "Future-Proof Tech", description: "Stay ahead with cutting-edge solutions" }
  ];

  const targetAudiences = [
    {
      title: "Growing Startups",
      description: "Are you a growing startup juggling too many manual tasks? Contact us to discover how our automations and AI integrations can streamline your operations, boost productivity, and free up your team for innovation.",
      benefits: [
        { icon: Zap, text: "Automate repetitive tasks without coding expertise" },
        { icon: Brain, text: "Integrate AI agents for smarter decisions" },
        { icon: Clock, text: "Achieve up to 40% time savings – proven with automation workflows" },
        { icon: Target, text: "Focus your team on high-value innovation work" }
      ]
    },
    {
      title: "Small-Medium Businesses",
      description: "Running an SMB without a full tech team? Reach out to learn how we can automate your daily workflows, integrate AI for smarter insights, and help you scale without the overhead.",
      benefits: [
        { icon: CheckCircle, text: "No technical team required – we handle everything" },
        { icon: DollarSign, text: "Reduce operational costs by up to 30%" },
        { icon: BarChart3, text: "Scale operations without hiring overhead" },
        { icon: Shield, text: "Enterprise-grade security for small business budgets" }
      ]
    },
    {
      title: "Small Business Owners",
      description: "As a small business owner overwhelmed by repetitive processes? Let's chat about customizing automations and AI agents to cut costs, save time, and drive your growth forward.",
      benefits: [
        { icon: Clock, text: "Reclaim 10+ hours per week from automation" },
        { icon: Zap, text: "Eliminate manual data entry and reporting" },
        { icon: Brain, text: "AI-powered insights for better decision making" },
        { icon: TrendingUp, text: "Proven ROI within 60 days of implementation" }
      ]
    },
    {
      title: "Fitness Industry",
      description: "In the fitness industry dealing with membership tracking? Get in touch for tailored integrations that automate reminders, personalize programs with AI, and improve retention rates.",
      benefits: [
        { icon: Target, text: "Automated membership renewals and reminders" },
        { icon: Brain, text: "AI-personalized workout recommendations" },
        { icon: TrendingUp, text: "Increase member retention by 25%" },
        { icon: CheckCircle, text: "Seamless integration with existing fitness apps" }
      ]
    },
    {
      title: "Online Retail",
      description: "Running an online retail business bogged down by manual updates? Reach out to learn how we can embed AI for predictive analytics, reduce errors, and boost your bottom line.",
      benefits: [
        { icon: BarChart3, text: "Predictive inventory management with AI" },
        { icon: Zap, text: "Automated price optimization and competitor tracking" },
        { icon: DollarSign, text: "Reduce manual errors by 90%" },
        { icon: Clock, text: "Real-time analytics and automated reporting" }
      ]
    },
    {
      title: "E-commerce Stores",
      description: "Operating an e-commerce store with inventory headaches? Contact us to understand how our automations and AI integrations can handle stock management, personalize customer experiences, and increase sales.",
      benefits: [
        { icon: CheckCircle, text: "Automated stock alerts and reordering" },
        { icon: Target, text: "AI-powered product recommendations" },
        { icon: TrendingUp, text: "Increase average order value by 35%" },
        { icon: Shield, text: "Fraud detection and prevention automation" }
      ]
    },
    {
      title: "Consulting Firms",
      description: "Leading a consulting firm buried in client admin? Contact us to discover how automations and AI can organize workflows, integrate tools for better collaboration, and elevate your service delivery.",
      benefits: [
        { icon: Zap, text: "Automate client onboarding and project setup" },
        { icon: Clock, text: "Streamline time tracking and invoicing" },
        { icon: Brain, text: "AI-assisted research and report generation" },
        { icon: BarChart3, text: "Integrated project management across all tools" }
      ]
    },
    {
      title: "Financial Services",
      description: "Managing financial workflows overloaded with manual checks? Let's chat about custom integrations that enhance forecasting with AI, reduce errors, and boost your operational resilience.",
      benefits: [
        { icon: Shield, text: "Automated compliance monitoring and reporting" },
        { icon: Brain, text: "AI-enhanced risk assessment and forecasting" },
        { icon: CheckCircle, text: "Reduce manual verification errors by 95%" },
        { icon: Clock, text: "Accelerate client onboarding by 50%" }
      ]
    },
    {
      title: "Multi-Hat Business Owners",
      description: "Business owner wearing too many hats? Contact us to see how our automations free you from repetitive work, integrate AI for growth insights, and let you focus on what matters most.",
      benefits: [
        { icon: Zap, text: "Automate admin tasks across all business areas" },
        { icon: Target, text: "Focus on strategy instead of operations" },
        { icon: Brain, text: "AI dashboard for unified business insights" },
        { icon: TrendingUp, text: "Achieve 40% productivity boost in first month" }
      ]
    }
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
            Transform Your Business: 20-50% Efficiency Boost with AI Automations & Integrations.
          </p>
          <p className="text-lg text-white mb-12 max-w-2xl mx-auto leading-relaxed">
            Custom workflows tailored for SMBs—save time, cut costs, scale smarter.
          </p>
          <Link to="/contact">
            <Button size="lg" className="glow-on-hover bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-medium">
              Claim Free Audit
            </Button>
          </Link>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-delay">
            <h2 className="text-4xl font-bold text-primary mb-6">How we can help you</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how our solutions can transform your specific business challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-delay-2 relative">
            {targetAudiences.map((audience, index) => (
              <div key={index} className="relative">
                {index === 1 && (
                  <Button 
                    onClick={toggleAllBenefits}
                    variant="outline"
                    size="sm"
                    className="absolute -top-10 right-0 text-xs font-medium border-accent text-accent hover:bg-accent hover:text-white px-4 py-2 w-fit z-10"
                  >
                    {allExpanded ? (
                      <>
                        <ChevronUp className="w-3 h-3 mr-1" />
                        Hide All Key Benefits
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3 mr-1" />
                        See All Key Benefits
                      </>
                    )}
                  </Button>
                )}
                <Card className="card-gradient border-border/50 glow-on-hover h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">{audience.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {audience.description}
                    </p>
                    <Accordion 
                      type="single" 
                      collapsible 
                      className="w-full"
                      value={allExpanded ? "benefits" : undefined}
                    >
                      <AccordionItem value="benefits" className="border-none">
                        <AccordionTrigger className="text-sm font-medium text-accent hover:text-accent/80 py-2">
                          View Key Benefits
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <ul className="space-y-2">
                            {audience.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <benefit.icon className="w-4 h-4 text-accent flex-shrink-0" />
                                <span>{benefit.text}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            ))}
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

          <div className="grid md:grid-cols-4 gap-8 fade-in-delay-2">
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

            <div className="text-center mt-12 fade-in-delay-2">
              <Link 
                to="/contact" 
                className="inline-flex items-center px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                Book a Free Audit
              </Link>
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

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-t from-muted/20 to-background">
        <div className="max-w-4xl mx-auto text-center">
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