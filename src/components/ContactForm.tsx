import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { toast } from "sonner"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields")
      return
    }
    
    toast.success("Message sent successfully! We'll get back to you soon.")
    setFormData({ name: "", email: "", company: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      detail: "hello@gigglebyte.com"
    },
    {
      icon: Phone,
      title: "Phone",
      detail: "+1 (555) 123-4567"
    },
    {
      icon: MapPin,
      title: "Address",
      detail: "123 Tech Street, Digital City"
    },
    {
      icon: Clock,
      title: "Hours",
      detail: "Mon-Fri 9AM-6PM EST"
    }
  ]

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-foreground/20 blur-2xl"></div>
      </div>

      <div className="w-full max-w-4xl space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Get In Touch</h1>
          <p className="text-muted-foreground">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="gradient-border">
            <Card className="p-6 space-y-4 shadow-lg shadow-primary/5 border-0">
              <div className="space-y-2 mb-6">
                <h2 className="text-xl font-semibold text-foreground">Send us a message</h2>
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                  Response within 24 hours
                </Badge>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-border focus:ring-2 focus:ring-primary/5 focus:border-primary/10 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-border focus:ring-2 focus:ring-primary/5 focus:border-primary/10 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-foreground">
                    Company (Optional)
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={handleChange}
                    className="input-border focus:ring-2 focus:ring-primary/5 focus:border-primary/10 transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[100px] input-border focus:ring-2 focus:ring-primary/5 focus:border-primary/10 transition-all duration-200"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 transition-all duration-200 shadow-sm"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground mb-6">
                Ready to start your project? Get in touch with our team using any of the methods below.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="gradient-border">
                  <Card className="p-4 shadow-lg shadow-primary/5 border-0">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.detail}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <div className="gradient-border">
              <Card className="p-6 shadow-lg shadow-primary/5 border-0">
                <h3 className="font-semibold text-foreground mb-2">Why Choose Us?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Expert team with 10+ years experience</li>
                  <li>• 24/7 customer support</li>
                  <li>• Competitive pricing</li>
                  <li>• Fast project delivery</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}