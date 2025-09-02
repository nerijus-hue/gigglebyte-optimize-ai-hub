import { Link } from "react-router-dom";
import { Linkedin, X } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 Gigglebyte. All rights reserved.
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.linkedin.com/company/108490342/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors glow-on-hover p-2 rounded-full"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://x.com/gigglebyteltd" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors glow-on-hover p-2 rounded-full"
              aria-label="X (formerly Twitter)"
            >
              <X size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;