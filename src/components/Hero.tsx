import { Button } from "@/components/ui/button";
import { TypewriterText } from "./TypewriterText";
import { AnimatedSection } from "./AnimatedSection";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-secondary opacity-50" />
      <div className="absolute inset-0 bg-gradient-accent animate-pulse-glow" />
      
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              <TypewriterText text="Hi, I'm Aayush" speed={100} />
            </h1>
            
            <div className="text-xl md:text-2xl text-muted-foreground leading-relaxed space-y-4">
              <p>
                A passionate <span className="text-primary font-semibold">B.Tech CSE student</span> from KR Mangalam University,
              </p>
              <p>
                driven by creativity and innovation in technology.
              </p>
            </div>
          </div>

          <AnimatedSection delay={1000} className="mb-12">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Welcome to my personal portfolio where I showcase my skills, projects, and journey in the world of Computer Science.
              This website is not just a digital resume — it's a thoughtfully crafted experience with the best of UI/UX design, 
              reflecting my love for clean, modern aesthetics and user-centric design principles.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={1500} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-3">
              Explore My Work
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-3">
              Download Resume
            </Button>
          </AnimatedSection>

          <AnimatedSection delay={2000} className="flex justify-center space-x-6 mb-16">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-300">
              <Github size={28} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-300">
              <Linkedin size={28} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-300">
              <Mail size={28} />
            </a>
          </AnimatedSection>

          <AnimatedSection delay={2500}>
            <a href="#about" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors group">
              <ArrowDown size={24} className="animate-bounce group-hover:translate-y-1 transition-transform" />
            </a>
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </section>
  );
};