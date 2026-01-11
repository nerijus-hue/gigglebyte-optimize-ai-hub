import { Settings, Bot, Brain, TrendingUp, DollarSign, BarChart3, Shield, CheckCircle, Zap, Clock, Target, Users, LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface TargetAudienceBenefit {
  icon: LucideIcon;
  text: string;
}

export interface TargetAudience {
  title: string;
  description: string;
  benefits: TargetAudienceBenefit[];
}

export const services: Service[] = [
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

export const benefits: Benefit[] = [
  { icon: TrendingUp, title: "Increased Efficiency", description: "Streamline operations for better performance" },
  { icon: DollarSign, title: "Cost Savings", description: "Reduce operational expenses through automation" },
  { icon: BarChart3, title: "Scalable Growth", description: "Build systems that grow with your business" },
  { icon: Shield, title: "Future-Proof Tech", description: "Stay ahead with cutting-edge solutions" }
];

export const targetAudiences: TargetAudience[] = [
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
