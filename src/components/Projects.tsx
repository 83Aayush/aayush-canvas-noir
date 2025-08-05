import { AnimatedSection } from "./AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "AI-Powered Portfolio",
    description: "A dynamic portfolio website showcasing the perfect blend of AI creativity and modern web development. Built with React, TypeScript, and cutting-edge design principles.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/placeholder.svg",
    github: "#",
    live: "#"
  },
  {
    title: "Smart Learning Platform",
    description: "An intelligent learning management system that adapts to individual learning styles using machine learning algorithms.",
    tech: ["Next.js", "Python", "TensorFlow", "PostgreSQL"],
    image: "/placeholder.svg",
    github: "#",
    live: "#"
  },
  {
    title: "Mobile Task Manager",
    description: "A productivity app with AI-powered task prioritization and smart scheduling features for enhanced workflow management.",
    tech: ["React Native", "Node.js", "MongoDB", "OpenAI API"],
    image: "/placeholder.svg",
    github: "#",
    live: "#"
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of innovative projects that demonstrate creativity, technical skill, and problem-solving abilities
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={project.title} delay={index * 300}>
              <Card className="group overflow-hidden bg-gradient-secondary border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-glow hover:scale-105">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                    
                    <Button 
                      size="sm" 
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};