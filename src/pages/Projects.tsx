import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Bot, Brain, Settings, Users, FileText, Bell, HardDrive, Mail, Zap, BarChart3, GitBranch, ShoppingCart, Dumbbell, Bug, Activity, Search, TrendingDown } from "lucide-react";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Optimization", "Automation", "AI Integration"];

  const projects = [
    {
      id: 1,
      title: "AI-Powered Predictive Maintenance",
      description: "Deploy AI agents to monitor equipment logs from IoT devices, predict failures based on patterns, and trigger maintenance tickets—minimizing downtime in large-scale operations.",
      category: "AI Integration",
      icon: Settings
    },
    {
      id: 2,
      title: "Website Scraping for Market Intelligence",
      description: "Scrape competitor sites for data like pricing or reviews, store it in databases, and integrate AI agents to analyze trends and send team alerts—keeping e-commerce businesses ahead with real-time insights.",
      category: "AI Integration",
      icon: Search
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

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-5xl font-bold text-primary mb-6">Automations</h1>
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
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
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