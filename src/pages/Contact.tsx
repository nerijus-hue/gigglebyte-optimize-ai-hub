import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Tech Lane", "Future City, CA 94000"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@gigglebyte.com", "support@gigglebyte.com"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 2:00 PM"]
    }
  ];

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-5xl font-bold text-primary mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            We're excited to discuss how we can optimize your business—reach out today!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="fade-in-delay">
            <Card className="card-gradient border-border/50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-primary font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-2 focus:ring-accent focus:border-accent"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-primary font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-2 focus:ring-accent focus:border-accent"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-primary font-medium">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-2 focus:ring-accent focus:border-accent"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-primary font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-2 min-h-[120px] focus:ring-accent focus:border-accent"
                      placeholder="Tell us about your project and how we can help..."
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full glow-on-hover bg-accent hover:bg-accent/90 text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="fade-in-delay-2">
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ready to transform your business? Get in touch with our team of experts and let's discuss your optimization and automation needs.
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <Card key={index} className="card-gradient border-border/50 glow-on-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <Card className="card-gradient border-border/50 mt-8">
              <CardContent className="p-0">
                <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive Map Coming Soon</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      123 Tech Lane, Future City, CA 94000
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Common questions about our services and process
            </p>
          </div>

          <div className="space-y-6">
            <Card className="card-gradient border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary mb-2">How long does a typical project take?</h3>
                <p className="text-muted-foreground">
                  Project timelines vary based on complexity, but most implementations range from 4-12 weeks from initial consultation to deployment.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary mb-2">Do you provide ongoing support?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer comprehensive support packages including monitoring, maintenance, and continuous optimization of your systems.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary mb-2">What industries do you work with?</h3>
                <p className="text-muted-foreground">
                  We work across various industries including retail, finance, manufacturing, healthcare, and technology companies of all sizes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;