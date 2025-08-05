import { AnimatedSection } from "./AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate or just want to say hello? I'd love to hear from you!
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8">
          <AnimatedSection delay={300} className="lg:col-span-2">
            <Card className="p-8 bg-gradient-secondary border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
              <h3 className="text-2xl font-bold mb-6 text-center">Send me a message</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Name</label>
                    <Input 
                      placeholder="Your name"
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Email</label>
                    <Input 
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Subject</label>
                  <Input 
                    placeholder="What's this about?"
                    className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Message</label>
                  <Textarea 
                    placeholder="Tell me about your project or just say hello!"
                    rows={5}
                    className="bg-background/50 border-primary/20 focus:border-primary transition-colors resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-3"
                >
                  <Send size={20} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-secondary border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow group">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-primary rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail size={24} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">Email</h4>
                    <p className="text-muted-foreground">aayush@example.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-secondary border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow group">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-primary rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone size={24} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">Phone</h4>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-secondary border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow group">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-primary rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={24} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">Location</h4>
                    <p className="text-muted-foreground">New Delhi, India</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-accent border-primary/20 text-center">
                <h4 className="font-semibold mb-2">Response Time</h4>
                <p className="text-muted-foreground">Usually within 24 hours</p>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};