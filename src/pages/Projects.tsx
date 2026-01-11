import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { TrendingUp, Zap, TrendingDown, Clock, Star } from "lucide-react";
import { projects } from "@/data/projects";

const Projects = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="py-16 pb-8 px-6 text-center bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-5xl font-bold text-primary mb-6">Automation Solutions</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Explore {projects.length} proven automation projects that have transformed businesses across industries. 
            From AI-powered insights to seamless workflow integrations.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Fast delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Enterprise-grade solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Proven ROI results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pt-6 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-delay-2">
            {projects.map((project) => (
                <Sheet key={project.id}>
                  <SheetTrigger asChild>
                    <Card className="card-gradient border-border/50 glow-on-hover group cursor-pointer transition-all hover:scale-[1.02]">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <project.icon className="w-6 h-6 text-accent" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {project.category}
                          </Badge>
                        </div>

                        <h3 className="text-xl font-semibold text-primary mb-3">{project.title}</h3>
                        <div className="space-y-3 mb-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Before:</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{project.before}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">After:</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{project.after}</p>
                          </div>
                        </div>
                        
        <div className="flex items-center text-sm text-accent font-medium">
          <Clock className="w-4 h-4 mr-2" />
          Saves {project.timeSavings} on average
        </div>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
                  
                  <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                    <SheetHeader className="mb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center">
                          <project.icon className="w-8 h-8 text-accent" />
                        </div>
                        <div className="flex-1">
                          <SheetTitle className="text-2xl text-primary mb-2">{project.title}</SheetTitle>
                          <Badge variant="secondary" className="mb-4">
                            {project.category}
                          </Badge>
                        </div>
                      </div>
                    </SheetHeader>
                    
                    <div className="space-y-6">
                      {/* Before/After/Benefit Sections */}
                      <div className="space-y-4">
                        <div className="bg-muted/20 rounded-lg p-4">
                          <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                            <TrendingDown className="w-4 h-4" />
                            Before
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">{project.before}</p>
                        </div>
                        
                        <div className="bg-muted/20 rounded-lg p-4">
                          <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            After
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">{project.after}</p>
                        </div>
                        
                        <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                          <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            Business Impact
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">{project.benefit}</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="pt-4 border-t">
                        <Button onClick={() => navigate('/contact')} className="w-full bg-accent hover:bg-accent/90 text-white">
                          Discuss This Project
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
        </div>
      </section>

      {/* Sticky Bottom CTA */}
      <div className="sticky bottom-4 sm:bottom-20 z-50 px-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-xl p-4 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-primary">Ready to Transform Your Business?</h3>
                <p className="text-sm text-muted-foreground">Let's discuss your automation needs</p>
              </div>
              <Button onClick={() => navigate('/contact')} className="bg-accent hover:bg-accent/90 text-white px-6">
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Projects;