import { Github, Linkedin, Mail, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-primary/20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Aayush
            </h3>
            <p className="text-muted-foreground">
              Building the future with code and creativity
            </p>
          </div>

          <div className="flex space-x-6 mb-6 md:mb-0">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-300"
            >
              <Github size={24} />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-300"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8 mt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center">
            Made with <Heart size={16} className="text-red-500 mx-2" /> by Aayush © 2024
          </p>
        </div>
      </div>
    </footer>
  );
};