import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { z } from "zod";

// Security: Form validation schema
const contactFormSchema = z.object({
  firstName: z.string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  lastName: z.string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters"),
  company: z.string()
    .max(100, "Company name must be less than 100 characters")
    .optional(),
  message: z.string()
    .min(1, "Message is required")
    .max(3000, "Message must be less than 3000 characters")
    .min(10, "Message must be at least 10 characters long")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security: Validate form data with Zod schema
    try {
      const validatedData = contactFormSchema.parse(formData);
      setErrors({});
      
      // Simulate form submission
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: "Validation Error",
          description: "Please check the form for errors and try again.",
          variant: "destructive"
        });
      }
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["nerijus@gigglebyte.ltd"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+37065643244"]
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
                      <Label htmlFor="firstName" className="text-primary font-medium">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`mt-2 focus:ring-accent focus:border-accent ${errors.firstName ? 'border-destructive' : ''}`}
                        placeholder="First name"
                        required
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-primary font-medium">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`mt-2 focus:ring-accent focus:border-accent ${errors.lastName ? 'border-destructive' : ''}`}
                        placeholder="Last name"
                        required
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
                      )}
                    </div>
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
                      className={`mt-2 focus:ring-accent focus:border-accent ${errors.email ? 'border-destructive' : ''}`}
                      placeholder="your@email.com"
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-primary font-medium">
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`mt-2 focus:ring-accent focus:border-accent ${errors.company ? 'border-destructive' : ''}`}
                      placeholder="Your company name"
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive mt-1">{errors.company}</p>
                    )}
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
                      className={`mt-2 min-h-[120px] focus:ring-accent focus:border-accent ${errors.message ? 'border-destructive' : ''}`}
                      placeholder="Tell us a bit about your inefficiencies and how we can help"
                      required
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1">{errors.message}</p>
                    )}
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

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;