import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Users } from "lucide-react";

const About = () => {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-32 px-6 text-center hero-gradient flex items-end justify-center"
      >
        <div className="max-w-4xl mx-auto fade-in pb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">About Us</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Transforming businesses through cutting-edge optimization, automation, and AI solutions
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center fade-in-delay">
          <h2 className="text-4xl font-bold text-primary mb-8">Our Story</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            It all started back in 2017 for our founder, Nerijus Urbietis, a dedicated professional with roots in Lithuania. While working as an administrator, consultant, and developer, he tackled complex challenges in automation and integrations, often building tools from scratch to streamline operations. His recent forays into AI agents opened new doors, allowing him to embed smart technologies into business workflows for smarter decision-making. Inspired by these experiences—and certified in areas like process automation and data integration—Nerijus embarked on a focused career path in business technology, specializing in roles that emphasized automation tools and integrations. He quickly became adept at solving integration puzzles and incorporating AI for enhanced business processes. After years of delivering impactful solutions in a single-company environment, Nerijus recognized the broader need for accessible, innovative services. That's why he launched this business—to share his knowledge and extend his expertise in custom automations and AI integrations to diverse companies of all sizes. We're here to help automate repetitive tasks, integrate AI seamlessly, and achieve scalable success, leveraging cutting-edge tech to streamline your operations, foster growth, and turn challenges into opportunities—all backed by over eight years of proven results, a track record of excellence, and a genuine passion for tech-driven efficiency.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="card-gradient border-border/50 glow-on-hover">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To empower businesses with efficient, automated processes powered by AI. We strive to eliminate inefficiencies and unlock the full potential of every organization we work with.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient border-border/50 glow-on-hover">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A world where technology seamlessly enhances human potential. We envision businesses operating at peak efficiency, with AI and automation handling routine tasks while humans focus on innovation and growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-accent mr-3" />
              <h2 className="text-4xl font-bold text-primary">Meet Our Team</h2>
            </div>
            <p className="text-xl text-muted-foreground">
              Industry experts passionate about transforming businesses through technology
            </p>
          </div>

          <div className="flex justify-center fade-in-delay">
            <Card className="card-gradient border-border/50 glow-on-hover text-center max-w-md">
              <CardContent className="p-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img 
                    src="/lovable-uploads/2b7b2873-9df5-4d04-8d8c-d78338fc75c5.png" 
                    alt="Nerijus Urbietis - Founder & Lead Automation Expert"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Nerijus Urbietis</h3>
                <p className="text-accent font-medium mb-4">Founder & Lead Automation Expert</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  With over 7 years of dedicated experience in business automation, consulting, and development, I specialize in crafting seamless integrations and AI-driven agents that transform everyday processes. From streamlining workflows to embedding intelligent AI for enhanced decision-making, my work focuses on helping businesses save time, cut costs, and achieve scalable growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="fade-in">
              <h3 className="text-xl font-semibold text-primary mb-3">Innovation</h3>
              <p className="text-muted-foreground">We stay at the forefront of technology to deliver cutting-edge solutions.</p>
            </div>
            <div className="fade-in-delay">
              <h3 className="text-xl font-semibold text-primary mb-3">Excellence</h3>
              <p className="text-muted-foreground">We deliver exceptional results that exceed expectations every time.</p>
            </div>
            <div className="fade-in-delay-2">
              <h3 className="text-xl font-semibold text-primary mb-3">Partnership</h3>
              <p className="text-muted-foreground">We work closely with clients as trusted partners in their success journey.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;