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
      title: "RAG Implementation for Knowledge Retrieval",
      before: "Scattered data across documents leading to slow searches and missed insights in enterprises.",
      after: "AI agents retrieve and augment queries from databases or PDFs, generating precise responses.",
      benefit: "Cut research time by 60%, improve accuracy by 40%—empowering mid-to-large enterprises to make data-driven decisions faster.",
      category: "AI Integration",
      icon: Search,
      timeSavings: "20 hrs/week",
    },
    {
      id: 2,
      title: "CRM Implementation and Sync",
      before: "Fragmented customer data causing lost sales and inefficient follow-ups in SMBs.",
      after: "Automated CRM setup syncs contacts from emails/forms and triggers personalized workflows, integrating with accounting, support, and inventory systems for a 360 view of your business.",
      benefit: "Boost lead conversion by 35%, save 15 hours/week on data management—ideal for e-commerce businesses scaling customer relationships.",
      category: "Automation",
      icon: Users,
      timeSavings: "15 hrs/week",
    },
    {
      id: 3,
      title: "Lead Capture and CRM Integration",
      before: "Manually entering leads from forms, risking lost opportunities and hours of data drudgery.",
      after: "Seamless workflow pulls leads automatically and syncs to your CRM.",
      benefit: "Save 10+ hours/week on entry tasks, boost conversion rates by 30%—ideal for SMBs scaling sales without extra staff.",
      category: "Automation",
      icon: Users,
      timeSavings: "10 hrs/week",
    },
    {
      id: 4,
      title: "AI Agent Phone Transcription Summarization",
      before: "Lengthy call recordings overwhelming teams with unstructured data and missed follow-ups in sales ops.",
      after: "AI agents read transcriptions from tools like Zoom, summarize key points, and generate actionable bullet points for tasks.",
      benefit: "Save 25 hours/week on review time, increase follow-up efficiency by 40%—ideal for professional services firms turning calls into quick wins.",
      category: "AI Integration",
      icon: Bot,
      timeSavings: "25 hrs/week",
    },
    {
      id: 5,
      title: "Text-to-SQL Data Querying and Visualization",
      before: "Technical barriers requiring SQL expertise to access and analyze data, slowing decisions for non-tech users.",
      after: "Text-to-SQL tools convert natural language queries into database commands, visualizing results in charts or dashboards.",
      benefit: "Eliminate coding needs for 80% of queries, speed up insights by 50%—empowering SMBs and business owners to query data effortlessly and drive informed growth.",
      category: "AI Integration",
      icon: BarChart3,
      timeSavings: "12 hrs/week",
    },
    {
      id: 6,
      title: "AI-Powered Content Generation",
      before: "Spending days drafting content manually, delaying marketing campaigns.",
      after: "AI agents generate drafts from topic ideas, ready for review and posting.",
      benefit: "Cut content creation time by 50%, enhance engagement by 35%—perfect for tech SaaS companies accelerating product launches.",
      category: "AI Integration",
      icon: Brain,
      timeSavings: "16 hrs/week",
    },
    {
      id: 7,
      title: "Member Retention Automation",
      before: "High churn from forgotten gym members and manual follow-ups.",
      after: "Automated monitoring of attendance and sending of re-engagement emails with AI-personalized incentives.",
      benefit: "Boost retention by 25%, add €2K/month in recurring revenue—empowering fitness businesses to thrive beyond peak seasons.",
      category: "Automation",
      icon: Dumbbell,
      timeSavings: "8 hrs/week",
    },
    {
      id: 8,
      title: "Client Project Tracking Pipeline",
      before: "Chaotic milestone tracking causing delays in professional services.",
      after: "Automated updates from tools like Asana, with reports and billing triggers.",
      benefit: "Improve billing accuracy by 20%, free up 15 hours/week for client work—driving higher satisfaction and referrals.",
      category: "Optimization",
      icon: Activity,
      timeSavings: "15 hrs/week",
    },
    {
      id: 10,
      title: "Expense Approval Workflow",
      before: "Compliance risks from slow, error-prone finance approvals.",
      after: "Automated routing of submissions for reviews, integration with payroll, and anomaly flagging.",
      benefit: "Cut errors by 45%, save 20 hours/week on audits—ensuring operations-heavy businesses maintain financial resilience.",
      category: "Automation",
      icon: FileText,
      timeSavings: "20 hrs/week",
    },
    {
      id: 11,
      title: "Website Scraping for Market Intelligence",
      before: "Hours wasted on manual competitor research in e-commerce.",
      after: "Automated scraping of sites for pricing/reviews, with AI agents analyzing trends and alerting teams.",
      benefit: "Gain insights in minutes, improve pricing strategies by 20%—staying ahead in competitive retail landscapes.",
      category: "AI Integration",
      icon: Search,
      timeSavings: "18 hrs/week",
    },
    {
      id: 12,
      title: "AI-Personalized Wellness Plans",
      before: "Generic programs leading to low engagement in wellness centers.",
      after: "AI agents process client data to create custom plans delivered through apps.",
      benefit: "Increase member satisfaction by 30%, reduce drop-offs by 40%—fostering long-term loyalty in fitness industries.",
      category: "AI Integration",
      icon: Dumbbell,
      timeSavings: "12 hrs/week",
    },
    {
      id: 13,
      title: "Supply Chain Optimization with AI",
      before: "Delays and overstock from unpredictable ops in manufacturing.",
      after: "AI agents analyze vendor data, forecast demand, and automate reorders.",
      benefit: "Lower inventory costs by €15K/year, cut delays by 35%—enabling mid-to-large enterprises to achieve operational excellence.",
      category: "Optimization",
      icon: Settings,
      timeSavings: "22 hrs/week",
    },
    {
      id: 14,
      title: "Social Media Scheduling with AI",
      before: "Inconsistent posting leading to low engagement and forgotten content calendars.",
      after: "Automated posting across platforms, with AI suggesting optimal times and hashtags based on analytics.",
      benefit: "Increase reach by 40%, save 8 hours/week on management—empowering professional services firms to maintain a strong online presence effortlessly.",
      category: "AI Integration",
      icon: TrendingUp,
      timeSavings: "8 hrs/week",
    },
    {
      id: 15,
      title: "HR Onboarding Workflow",
      before: "Tedious manual setup for new hires, causing delays and compliance risks in enterprises.",
      after: "Automated document sending, account creation, and reminders integrated with HR tools.",
      benefit: "Shorten onboarding by 50%, reduce errors by 35%—ideal for mid-to-large businesses scaling teams with minimal HR overhead.",
      category: "Automation",
      icon: Users,
      timeSavings: "14 hrs/week",
    },
    {
      id: 16,
      title: "Sentiment Analysis on Reviews",
      before: "Overlooking customer feedback trends, missing opportunities to improve in retail.",
      after: "AI agents scan reviews from sites like Google, analyze sentiment, and flag issues for follow-up.",
      benefit: "Boost satisfaction scores by 25%, prevent churn saving €3K/month—transforming e-commerce feedback into actionable growth.",
      category: "AI Integration",
      icon: Brain,
      timeSavings: "6 hrs/week",
    },
    {
      id: 17,
      title: "Event Registration Management",
      before: "Chaotic sign-ups and payments leading to overbookings in wellness events.",
      after: "Automated handling of forms, calendar adds, confirmations, and gateway integrations for seamless processing.",
      benefit: "Cut admin time by 60%, increase attendance by 30%—helping fitness gyms host successful classes without the hassle.",
      category: "Automation",
      icon: Users,
      timeSavings: "18 hrs/week",
    },
    {
      id: 18,
      title: "Contract Review and Approval",
      before: "Slow multi-level approvals delaying deals in consulting firms.",
      after: "Automated routing of documents, tracking changes, and archiving signed versions with AI flagging risks.",
      benefit: "Accelerate closures by 40%, minimize legal errors saving €8K/year—streamlining professional services for faster revenue.",
      category: "Automation",
      icon: FileText,
      timeSavings: "12 hrs/week",
    },
    {
      id: 19,
      title: "Personalized Email Campaigns",
      before: "Generic blasts yielding low open rates for SMB marketing.",
      after: "AI segments lists by behavior, generates tailored content, and automates sending.",
      benefit: "Lift engagement by 30%, drive 20% more conversions—helping startups build customer loyalty without big budgets.",
      category: "AI Integration",
      icon: Mail,
      timeSavings: "10 hrs/week",
    },
    {
      id: 20,
      title: "Financial Forecasting Agent",
      before: "Manual trend predictions prone to errors in volatile markets.",
      after: "Automated data pulls from accounting tools, AI model application, and weekly report visualization.",
      benefit: "Increase forecast accuracy by 40%, avoid €10K in losses—empowering finance businesses to navigate uncertainty proactively.",
      category: "AI Integration",
      icon: BarChart3,
      timeSavings: "16 hrs/week",
    },
    {
      id: 21,
      title: "Customer Support Chatbot Integration",
      before: "Overloaded support teams handling routine queries slowly in SaaS.",
      after: "AI agents route inquiries, resolve basics, and escalate complex ones with logs.",
      benefit: "Decrease response time by 45%, cut support costs by 30%—enhancing user satisfaction for tech companies.",
      category: "AI Integration",
      icon: Bot,
      timeSavings: "25 hrs/week",
    },
    {
      id: 22,
      title: "Report Generation Automation",
      before: "Tedious manual compiling of reports wasting hours in finance.",
      after: "Automated data pulls from multiple sources, dashboard formatting, and weekly email summaries.",
      benefit: "Save 20 hours/month on reporting, improve accuracy by 35%—enabling professional services firms to focus on analysis.",
      category: "Automation",
      icon: FileText,
      timeSavings: "5 hrs/week",
    },
    {
      id: 23,
      title: "Email Newsletter Compilation",
      before: "Manual content curation delaying marketing outreach for startups.",
      after: "Automated aggregation from RSS/internal sources, AI curation, and scheduled distributions.",
      benefit: "Increase open rates by 25%, save 10 hours/week—helping SMBs nurture leads with consistent, engaging content.",
      category: "Automation",
      icon: Mail,
      timeSavings: "10 hrs/week",
    },
    {
      id: 24,
      title: "Compliance Auditing Chain",
      before: "Risky manual checks missing regulatory issues in finance ops.",
      after: "Automated document scanning, non-compliance flagging, and audit trail generation with AI reviews.",
      benefit: "Cut audit errors by 50%, ensure GDPR compliance saving €5K in fines—securing operations for Irish businesses.",
      category: "Automation",
      icon: Settings,
      timeSavings: "15 hrs/week",
    },
    {
      id: 25,
      title: "User Behavior Analytics Agent",
      before: "Blind spots in app usage leading to high churn in SaaS.",
      after: "AI processes logs, identifies patterns, and automates retention campaigns.",
      benefit: "Reduce churn by 30%, grow users by 20%—driving sustainable revenue for tech and SaaS companies.",
      category: "AI Integration",
      icon: Activity,
      timeSavings: "8 hrs/week",
    },
    {
      id: 26,
      title: "Billing and Invoicing Automation",
      before: "Error-prone manual invoicing delaying payments in services firms.",
      after: "Automated invoice generation from CRMs, PDF creation, sending, and accounting updates with reminders.",
      benefit: "Accelerate payments by 40%, minimize errors saving €3K/month—streamlining cash flow for professional services.",
      category: "Automation",
      icon: FileText,
      timeSavings: "12 hrs/week",
    },
    {
      id: 27,
      title: "Fraud Detection Automation with AI",
      before: "Manual transaction reviews missing anomalies and exposing finance risks.",
      after: "AI monitors patterns in real-time, flags suspicious activities, and alerts teams with reports.",
      benefit: "Reduce fraud losses by 45%, save €8K/year in investigations—securing operations for finance-heavy businesses.",
      category: "AI Integration",
      icon: Settings,
      timeSavings: "20 hrs/week",
    },
    {
      id: 28,
      title: "Content Moderation Workflow",
      before: "Overwhelmed moderators handling user-generated content slowly in social platforms.",
      after: "AI scans submissions, categorizes risks, and automates approvals or escalations.",
      benefit: "Cut moderation time by 55%, improve community safety by 30%—enhancing user trust for tech and SaaS companies.",
      category: "AI Integration",
      icon: Bot,
      timeSavings: "22 hrs/week",
    },
    {
      id: 29,
      title: "Employee Feedback Aggregation",
      before: "Scattered surveys leading to ignored insights and low morale in enterprises.",
      after: "Automated response collection from forms, AI-summarized themes, and action plan generation.",
      benefit: "Boost employee satisfaction by 25%, reduce turnover costs by €5K/month—fostering better HR in mid-to-large organizations.",
      category: "Automation",
      icon: Users,
      timeSavings: "6 hrs/week",
    },
    {
      id: 30,
      title: "SEO Keyword Optimization Agent",
      before: "Manual keyword research delaying content strategies for e-commerce.",
      after: "AI analyzes trends, suggests optimizations, and integrates with CMS for updates.",
      benefit: "Increase organic traffic by 35%, save 12 hours/week—driving visibility and sales for retail businesses.",
      category: "AI Integration",
      icon: Search,
      timeSavings: "12 hrs/week",
    },
    {
      id: 31,
      title: "Vendor Performance Tracking",
      before: "Inconsistent supplier evaluations causing supply chain delays.",
      after: "Automated data pulls from APIs, AI-scored vendor performance, and review triggers.",
      benefit: "Improve supplier reliability by 40%, cut delays saving €6K/year—optimizing ops for manufacturing enterprises.",
      category: "Optimization",
      icon: TrendingUp,
      timeSavings: "8 hrs/week",
    },
    {
      id: 32,
      title: "Personalized Learning Path Generator",
      before: "Generic training programs leading to low completion rates in wellness firms.",
      after: "AI assesses user data, creates custom paths, and tracks progress with reminders.",
      benefit: "Raise engagement by 30%, reduce drop-offs by 45%—enhancing outcomes for fitness and wellness businesses.",
      category: "AI Integration",
      icon: Brain,
      timeSavings: "10 hrs/week",
    },
    {
      id: 33,
      title: "Market Trend Monitoring Dashboard",
      before: "Fragmented news sources missing timely insights for startups.",
      after: "Automated feed aggregation, AI-filtered trends, and interactive dashboard updates.",
      benefit: "Accelerate strategy adjustments by 50%, gain 20% competitive edge—empowering SMBs with proactive intelligence.",
      category: "Optimization",
      icon: TrendingUp,
      timeSavings: "14 hrs/week",
    },
    {
      id: 34,
      title: "Asset Management Automation",
      before: "Manual tracking of equipment leading to losses and inefficiencies in gyms.",
      after: "AI inventories assets via IoT, predicts maintenance, and automates orders.",
      benefit: "Minimize asset downtime by 35%, save €4K/year in replacements—streamlining operations for fitness centers.",
      category: "Optimization",
      icon: Settings,
      timeSavings: "7 hrs/week",
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
      <div className="sticky bottom-20 z-50 px-6 mb-8">
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