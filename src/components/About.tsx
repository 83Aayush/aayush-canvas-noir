import { AnimatedSection } from "./AnimatedSection";
import { Card } from "@/components/ui/card";

export const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={300}>
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-muted-foreground">
                Whether you're here to explore my work, connect for collaboration, or just curious about what I build — 
                I invite you to scroll through and experience the <span className="text-primary font-semibold">lovable side of AI-powered creativity</span>.
              </p>
              
              <p className="text-muted-foreground">
                As a Computer Science student, I'm constantly exploring the intersection of technology and creativity. 
                My journey involves building innovative solutions, learning cutting-edge technologies, and creating 
                meaningful digital experiences.
              </p>
              
              <p className="text-muted-foreground">
                I believe in the power of clean code, intuitive design, and the endless possibilities that emerge 
                when passion meets purpose in the world of technology.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-gradient-secondary border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1</div>
                  <div className="text-muted-foreground text-sm">Years of Learning</div>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-secondary border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <div className="text-muted-foreground text-sm">Projects Built</div>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-secondary border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-muted-foreground text-sm">Technologies</div>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-secondary border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">∞</div>
                  <div className="text-muted-foreground text-sm">Curiosity</div>
                </div>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};