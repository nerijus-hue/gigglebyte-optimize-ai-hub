import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Bot, Brain, Settings, ExternalLink } from "lucide-react";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Optimization", "Automation", "AI Integration"];

  const projects = [
    {
      id: 1,
      title: "Retail Workflow Automation",
      description: "Integrated AI agents to reduce inventory management time by 40% for a major retail chain.",
      category: "Automation",
      metrics: "40% time reduction",
      techStack: ["Python", "Machine Learning APIs", "PostgreSQL", "Docker"],
      icon: Bot,
      results: "Saved 20+ hours weekly, $50K annual cost reduction"
    },
    {
      id: 2,
      title: "Financial Process Optimization",
      description: "Streamlined loan approval processes using AI decision trees and automated validation.",
      category: "Optimization", 
      metrics: "60% faster approvals",
      techStack: ["React", "Node.js", "TensorFlow", "AWS"],
      icon: TrendingUp,
      results: "Reduced approval time from 5 days to 2 days"
    },
    {
      id: 3,
      title: "Customer Service AI Integration",
      description: "Deployed intelligent chatbots with natural language processing for 24/7 customer support.",
      category: "AI Integration",
      metrics: "85% query resolution",
      techStack: ["OpenAI GPT", "Python", "MongoDB", "React"],
      icon: Brain,
      results: "Handled 1000+ queries daily, 95% satisfaction rate"
    },
    {
      id: 4,
      title: "Manufacturing Quality Control",
      description: "Implemented computer vision AI for automated quality inspection on production lines.",
      category: "AI Integration",
      metrics: "99.5% accuracy",
      techStack: ["OpenCV", "TensorFlow", "Python", "REST APIs"],
      icon: Settings,
      results: "Reduced defects by 75%, saved $200K annually"
    },
    {
      id: 5,
      title: "HR Recruitment Automation",
      description: "Automated resume screening and candidate matching using ML algorithms.",
      category: "Automation",
      metrics: "70% time savings",
      techStack: ["scikit-learn", "Django", "PostgreSQL", "Redis"],
      icon: Bot,
      results: "Processed 5000+ applications, improved hire quality"
    },
    {
      id: 6,
      title: "Supply Chain Optimization",
      description: "Optimized logistics routes and inventory levels using predictive analytics.",
      category: "Optimization",
      metrics: "25% cost reduction",
      techStack: ["R", "Power BI", "Azure", "SQL Server"],
      icon: TrendingUp,
      results: "Optimized 50+ distribution centers"
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-5xl font-bold text-primary mb-6">Our Projects</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Discover how we've transformed businesses across industries with innovative automation and AI solutions
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12 fade-in-delay">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className={`glow-on-hover ${
                  activeFilter === filter 
                    ? "bg-accent hover:bg-accent/90 text-white" 
                    : "hover:bg-accent/10 hover:text-accent hover:border-accent"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-delay-2">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="card-gradient border-border/50 glow-on-hover group">
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
                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-accent font-semibold text-lg mb-2">{project.metrics}</div>
                    <p className="text-sm text-muted-foreground">{project.results}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-primary mb-2">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent transition-colors"
                  >
                    Learn More
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-12">Project Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="fade-in">
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="fade-in-delay">
              <div className="text-3xl font-bold text-accent mb-2">$2M+</div>
              <p className="text-muted-foreground">Cost Savings Generated</p>
            </div>
            <div className="fade-in-delay-2">
              <div className="text-3xl font-bold text-accent mb-2">95%</div>
              <p className="text-muted-foreground">Client Satisfaction Rate</p>
            </div>
            <div className="fade-in">
              <div className="text-3xl font-bold text-accent mb-2">60%</div>
              <p className="text-muted-foreground">Average Efficiency Gain</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-t from-muted/20 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how we can help transform your business processes
          </p>
          <Button size="lg" className="glow-on-hover bg-accent hover:bg-accent/90 text-white px-8 py-4">
            Get In Touch
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Projects;