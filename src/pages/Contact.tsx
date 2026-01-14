import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone } from "lucide-react";
import { z } from "zod";

// Security: Form validation schema
const contactFormSchema = z.object({
  firstName: z.string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[\p{L}\s'-]+$/u, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  lastName: z.string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[\p{L}\s'-]+$/u, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
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
    .min(10, "Message must be at least 10 characters long"),
  honeypot: z.string().max(0, "Spam detected").optional() // Security: honeypot field should be empty
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
    honeypot: "" // Security: honeypot field
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check cooldown period (1 minute)
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    const cooldownPeriod = 60000; // 1 minute in milliseconds
    
    if (timeSinceLastSubmit < cooldownPeriod) {
      const remainingSeconds = Math.ceil((cooldownPeriod - timeSinceLastSubmit) / 1000);
      toast({
        title: "Please Wait",
        description: `You can submit another message in ${remainingSeconds} seconds.`,
        variant: "destructive",
      });
      return;
    }
    
    // Security: Validate form data with Zod schema
    try {
      const validatedData = contactFormSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);
      
      // Send to Netlify Function
      const response = await fetch('/.netlify/functions/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...validatedData,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        let errorMessage = 'Failed to send message';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // Response is not JSON (likely 404 or server error)
          if (response.status === 404) {
            errorMessage = 'Contact form service not available. Please deploy to Netlify or contact support.';
          } else {
            errorMessage = `Server error (${response.status}). Please try again later.`;
          }
        }
        throw new Error(errorMessage);
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you within 24 hours.",
      });

      // Update last submit time
      setLastSubmitTime(now);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        message: "",
        honeypot: ""
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      
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
      } else {
        const errorMessage = (error as Error)?.message || "Failed to send message. Please try again.";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-8">
      <Helmet>
        <link rel="canonical" href="https://gigglebyte.ltd/contact" />
        <title>Contact Us - Gigglebyte</title>
      </Helmet>
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-5xl font-bold text-primary mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            We're excited to discuss how we can optimize your business—reach out today!
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-4">
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
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                      aria-invalid={errors.firstName ? "true" : undefined}
                      className={`mt-2 focus:ring-accent focus:border-accent ${errors.firstName ? 'border-destructive' : ''}`}
                      placeholder="First name"
                      required
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="text-sm text-destructive mt-1" role="alert">{errors.firstName}</p>
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
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                      aria-invalid={errors.lastName ? "true" : undefined}
                      className={`mt-2 focus:ring-accent focus:border-accent ${errors.lastName ? 'border-destructive' : ''}`}
                      placeholder="Last name"
                      required
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="text-sm text-destructive mt-1" role="alert">{errors.lastName}</p>
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
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={errors.email ? "true" : undefined}
                    className={`mt-2 focus:ring-accent focus:border-accent ${errors.email ? 'border-destructive' : ''}`}
                    placeholder="your@email.com"
                    required
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive mt-1" role="alert">{errors.email}</p>
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
                    aria-describedby={errors.company ? "company-error" : undefined}
                    aria-invalid={errors.company ? "true" : undefined}
                    className={`mt-2 focus:ring-accent focus:border-accent ${errors.company ? 'border-destructive' : ''}`}
                    placeholder="Your company name"
                  />
                  {errors.company && (
                    <p id="company-error" className="text-sm text-destructive mt-1" role="alert">{errors.company}</p>
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
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={errors.message ? "true" : undefined}
                    className={`mt-2 min-h-[120px] focus:ring-accent focus:border-accent ${errors.message ? 'border-destructive' : ''}`}
                    placeholder="Tell us about your business inefficiencies and how we can help optimize your operations"
                    required
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-destructive mt-1" role="alert">{errors.message}</p>
                  )}
                </div>

                {/* Security: Honeypot field - hidden from users but visible to bots */}
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <Button
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full glow-on-hover bg-accent hover:bg-accent/90 text-white disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
              
              {/* Contact Information Below Form */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex flex-col sm:flex-row gap-4 justify-center text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="w-4 h-4 text-accent" />
                    <a 
                      href="mailto:nerijus@gigglebyte.ltd" 
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      nerijus@gigglebyte.ltd
                    </a>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Phone className="w-4 h-4 text-accent" />
                    <a 
                      href="tel:+37065643244" 
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      +370 656 43244
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;