import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { TrendingUp, Bot, Brain, Settings, Users, FileText, Bell, HardDrive, Mail, Zap, BarChart3, GitBranch, ShoppingCart, Dumbbell, Bug, Activity, Search, TrendingDown, Clock, Star, Eye } from "lucide-react";

const Projects = () => {

  const projects = [
    {
      id: 1,
      title: "AI-Powered Predictive Maintenance",
      description: "Deploy AI agents to monitor equipment logs from IoT devices, predict failures based on patterns, and trigger maintenance tickets—minimizing downtime in large-scale operations.",
      fullDescription: "This comprehensive solution leverages machine learning algorithms to analyze historical equipment data, sensor readings, and maintenance logs. The AI agents continuously monitor IoT device outputs, identifying subtle patterns that indicate potential failures weeks before they occur. When anomalies are detected, the system automatically generates maintenance tickets with detailed recommendations, priority levels, and suggested repair windows. This proactive approach has helped manufacturing companies reduce unexpected downtime by up to 85% while extending equipment lifespan by 20-30%.",
      category: "AI Integration",
      icon: Settings,
      duration: "2-3 months",
      complexity: "High",
      savings: "$50K-200K/year",
      tags: ["IoT", "Machine Learning", "Predictive Analytics", "Manufacturing"]
    },
    {
      id: 2,
      title: "Website Scraping for Market Intelligence",
      description: "Scrape competitor sites for data like pricing or reviews, store it in databases, and integrate AI agents to analyze trends and send team alerts—keeping e-commerce businesses ahead with real-time insights.",
      fullDescription: "Our intelligent web scraping solution automatically monitors competitor websites, extracting pricing data, product information, customer reviews, and promotional offers. The system uses advanced anti-detection techniques to ensure reliable data collection while respecting rate limits. AI agents analyze the collected data to identify pricing trends, market opportunities, and competitive threats. Automated alerts notify your team of significant changes, while comprehensive dashboards provide actionable insights for strategic decision-making.",
      category: "AI Integration",
      icon: Search,
      duration: "1-2 months",
      complexity: "Medium",
      savings: "$25K-75K/year",
      tags: ["Web Scraping", "Market Research", "Competitive Analysis", "AI Analytics"]
    },
    {
      id: 3,
      title: "File Backup and Sync",
      description: "Automatically back up files from cloud storage like Google Drive to another service, with versioning to ensure data security and easy recovery.",
      category: "Automation",
      icon: HardDrive
    },
    {
      id: 4,
      title: "Multi-Channel Order Fulfillment",
      description: "Sync orders from Shopify or Amazon to warehouse systems, automate picking lists and shipping labels, and notify customers of status updates for seamless retail operations.",
      category: "Automation",
      icon: ShoppingCart
    },
    {
      id: 5,
      title: "Research and Data Aggregation Agent",
      description: "Deploy an AI agent to search web sources for market trends, compile summaries, and integrate findings into your business intelligence dashboard.",
      category: "AI Integration",
      icon: Brain
    },
    {
      id: 6,
      title: "Inventory Alert System",
      description: "Monitor stock levels in your warehouse software and send real-time notifications to team members when items fall below a threshold, preventing stockouts.",
      category: "Automation",
      icon: Bell
    },
    {
      id: 7,
      title: "Competitor Benchmarking Dashboard Update",
      description: "Automate API data aggregation for metrics like SEO rankings into dashboards like Google Sheets, with AI agents comparing performance and generating visual reports—helping tech companies optimize growth strategies.",
      category: "Optimization",
      icon: TrendingDown
    },
    {
      id: 8,
      title: "AI-Driven Product Recommendation Engine",
      description: "Use AI agents to analyze browsing history, generate personalized product suggestions, and push them via email or site pop-ups—increasing average order value for e-commerce sites.",
      category: "AI Integration",
      icon: Brain
    },
    {
      id: 9,
      title: "Member Retention Automation",
      description: "Monitor attendance data from gym software, send automated re-engagement emails for inactive members, and integrate with calendars for class reminders—improving retention in wellness centers.",
      category: "Automation",
      icon: Dumbbell
    },
    {
      id: 10,
      title: "Lead Capture and CRM Integration",
      description: "Automatically pull new leads from web forms or emails and sync them to your CRM system, ensuring no opportunities slip through the cracks and saving hours on manual data entry.",
      category: "Automation",
      icon: Users
    },
    {
      id: 11,
      title: "Budget Tracking and Alerts",
      description: "Sync expense data from accounting apps like QuickBooks, monitor against budgets in real-time, and send executive summaries via Slack or email, helping SMB owners maintain financial control without dedicated finance staff.",
      category: "Optimization",
      icon: BarChart3
    },
    {
      id: 12,
      title: "Bug Reporting and Triage",
      description: "Automate ticket creation from user feedback forms, integrate with Jira for prioritization, and notify devs via Slack—speeding up issue resolution in SaaS development.",
      category: "Automation",
      icon: Bug
    },
    {
      id: 13,
      title: "Cross-Department Data Synchronization",
      description: "Integrate disparate systems (e.g., HR, finance, and ops) via n8n to sync updates in real-time, preventing data silos and enabling enterprise-wide visibility for strategic decision-making.",
      category: "Optimization",
      icon: GitBranch
    },
    {
      id: 14,
      title: "AI-Powered Content Generation",
      description: "Use AI agents to take topic ideas from a Trello board, generate draft blog posts or social media captions, and post them after human review.",
      category: "AI Integration",
      icon: Brain
    },
    {
      id: 15,
      title: "Invoice Generation and Sending",
      description: "When a sale closes in your e-commerce system, generate invoices from templates, attach them to emails, and send them to clients while updating your accounting software.",
      category: "Automation",
      icon: FileText
    },
    {
      id: 16,
      title: "API Monitoring and Alerts",
      description: "Poll APIs for uptime, log errors, and trigger failover workflows—ensuring reliability for tech companies reliant on integrations.",
      category: "Optimization",
      icon: Activity
    },
    {
      id: 17,
      title: "HR Onboarding Workflow",
      description: "When a new hire is added to your HR system, automate document sending, account creation in tools like email and Slack, and schedule orientation reminders.",
      category: "Automation",
      icon: Users
    },
    {
      id: 18,
      title: "Personalized Email Campaigns",
      description: "Leverage AI agents to segment your email list based on user behavior, generate tailored content, and automate sending for higher engagement rates.",
      category: "AI Integration",
      icon: Mail
    },
    {
      id: 19,
      title: "Customer Feedback Collection",
      description: "After a purchase or service interaction, send automated surveys via email or SMS, collect responses, and store them in a database for easy analysis.",
      category: "Automation",
      icon: Mail
    },
    {
      id: 20,
      title: "Abandoned Cart Recovery Chain",
      description: "Track cart abandonments in e-commerce platforms, automate personalized reminder emails with dynamic discounts, and integrate with inventory to update stock—boosting recovery rates by 20-30% for online retailers.",
      category: "Automation",
      icon: ShoppingCart
    },
    {
      id: 21,
      title: "Expense Approval Workflow",
      description: "Route employee submissions from apps like Expensify for manager approvals, integrate with payroll, and flag anomalies—enhancing compliance in finance operations.",
      category: "Automation",
      icon: FileText
    }
  ];

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
              <span>1-6 month delivery</span>
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
                        <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                        
                        {/* Project Metrics */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.duration && (
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {project.duration}
                            </Badge>
                          )}
                          {project.complexity && (
                            <Badge variant="outline" className={`text-xs ${
                              project.complexity === "High" ? "border-red-200 text-red-700" :
                              project.complexity === "Medium" ? "border-yellow-200 text-yellow-700" :
                              "border-green-200 text-green-700"
                            }`}>
                              {project.complexity}
                            </Badge>
                          )}
                          {project.savings && (
                            <Badge variant="outline" className="text-xs text-green-700 border-green-200">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {project.savings}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground group-hover:text-accent transition-colors">
                          <Eye className="w-4 h-4 mr-2" />
                          Click to view details
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
                      {/* Project Metrics Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {project.duration && (
                          <div className="bg-muted/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-accent" />
                              <span className="font-medium">Duration</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{project.duration}</p>
                          </div>
                        )}
                        {project.complexity && (
                          <div className="bg-muted/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Settings className="w-4 h-4 text-accent" />
                              <span className="font-medium">Complexity</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{project.complexity}</p>
                          </div>
                        )}
                        {project.savings && (
                          <div className="bg-muted/20 rounded-lg p-4 col-span-2">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="font-medium">Expected Savings</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{project.savings}</p>
                          </div>
                        )}
                      </div>

                      {/* Full Description */}
                      <div>
                        <h4 className="font-semibold text-primary mb-3">Project Details</h4>
                        <SheetDescription className="text-base leading-relaxed">
                          {project.fullDescription || project.description}
                        </SheetDescription>
                      </div>

                      {/* Tags */}
                      {project.tags && (
                        <div>
                          <h4 className="font-semibold text-primary mb-3">Technologies & Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="pt-4 border-t">
                        <Button className="w-full bg-accent hover:bg-accent/90 text-white">
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
      <div className="sticky bottom-4 z-50 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-xl p-4 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-primary">Ready to Transform Your Business?</h3>
                <p className="text-sm text-muted-foreground">Let's discuss your automation needs</p>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-white px-6">
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