import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary font-inter tracking-tight">
              Gigglebyte
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "relative text-sm font-medium px-4 py-2 rounded-full transition-colors",
                    isActive 
                      ? "text-primary bg-muted" 
                      : "text-foreground"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="headerLamp"
                      className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground p-2"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <nav className="px-6 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "relative block py-3 px-4 text-sm font-medium transition-colors border-b border-transparent rounded-lg",
                      isActive 
                        ? "text-primary border-primary bg-muted" 
                        : "text-foreground"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="mobileLamp"
                        className="absolute inset-0 w-full bg-primary/5 rounded-lg -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="absolute -top-1 left-4 w-6 h-0.5 bg-primary rounded-t-full">
                          <div className="absolute w-8 h-4 bg-primary/20 rounded-full blur-md -top-1 -left-1" />
                          <div className="absolute w-6 h-4 bg-primary/20 rounded-full blur-md -top-0.5" />
                          <div className="absolute w-3 h-3 bg-primary/20 rounded-full blur-sm top-0 left-1.5" />
                        </div>
                      </motion.div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;