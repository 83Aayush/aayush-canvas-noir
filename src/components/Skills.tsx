import { AnimatedSection } from "./AnimatedSection";
import { Card } from "@/components/ui/card";
import { Code2, Database, Palette, Smartphone, Globe, Brain } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "React, TypeScript, Tailwind CSS",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Node.js, Python, SQL",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "React Native, Flutter",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Figma, Adobe Creative Suite",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Globe,
    title: "Web Technologies",
    description: "HTML5, CSS3, JavaScript",
    color: "from-orange-500 to-amber-500"
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "TensorFlow, PyTorch, OpenAI",
    color: "from-indigo-500 to-blue-500"
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A diverse set of technical skills and creative abilities that drive innovation
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <AnimatedSection key={skill.title} delay={index * 200}>
              <Card className="group p-6 bg-gradient-secondary border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-glow hover:scale-105 cursor-pointer">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <skill.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                    {skill.title}
                  </h3>
                </div>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {skill.description}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};