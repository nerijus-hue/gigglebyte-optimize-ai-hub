import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Users } from "lucide-react";
import aboutImage from "@/assets/about-visual.jpg";
import teamImage from "@/assets/team-avatars.jpg";

const About = () => {
  const teamMembers = [
    {
      name: "Alex Thompson",
      role: "CEO & Founder", 
      bio: "15+ years in business optimization and digital transformation. Former McKinsey consultant with expertise in process engineering."
    },
    {
      name: "Sarah Chen",
      role: "AI Specialist",
      bio: "PhD in Machine Learning from Stanford. Previously led AI initiatives at Google and specialized in business process automation."
    },
    {
      name: "Michael Rodriguez", 
      role: "Automation Engineer",
      bio: "Expert in workflow automation and system integration. Built scalable solutions for Fortune 500 companies."
    },
    {
      name: "Emily Watson",
      role: "Business Analyst",
      bio: "MBA from Wharton with 10+ years analyzing and optimizing business processes across various industries."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-32 px-6 text-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 31, 63, 0.8) 0%, rgba(169, 169, 169, 0.6) 100%), url(${aboutImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">About Gigglebyte</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Transforming businesses through cutting-edge optimization, automation, and AI solutions
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center fade-in-delay">
          <h2 className="text-4xl font-bold text-primary mb-8">Our Story</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Founded in 2023, Gigglebyte is a forward-thinking consultancy dedicated to transforming businesses through cutting-edge optimization, automation, and AI. Our team of experts combines industry knowledge with innovative technology to deliver tailored solutions that drive real results.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe that every business deserves efficient, intelligent systems that work seamlessly to enhance human potential and drive sustainable growth.
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 fade-in-delay">
            {teamMembers.map((member, index) => (
              <Card key={index} className="card-gradient border-border/50 glow-on-hover text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <Users className="w-12 h-12 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
                  <p className="text-accent font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
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