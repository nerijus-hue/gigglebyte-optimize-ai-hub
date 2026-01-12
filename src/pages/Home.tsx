import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { services, benefits, targetAudiences } from "@/data/home";

const Home = () => {
  const [allExpanded, setAllExpanded] = useState(false);

  const toggleAllBenefits = () => {
    setAllExpanded(!allExpanded);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative hero-gradient min-h-screen flex items-center justify-center text-center px-6 pt-20"
      >
        <div className="max-w-4xl mx-auto fade-in">
          <div className="mb-6">
            <img 
              src="/images/home-hero.png" 
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
              <div key={audience.title} className="relative">
                {index === 0 && (
                  <Button 
                    onClick={toggleAllBenefits}
                    variant="outline"
                    size="sm"
                    className="absolute -top-10 left-0 text-xs font-medium border-accent text-accent hover:bg-accent hover:text-white px-4 py-2 w-fit z-10"
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
            {services.map((service) => (
              <Card key={service.title} className="card-gradient border-border/50 glow-on-hover group">
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
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center glow-on-hover border-border/50">
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