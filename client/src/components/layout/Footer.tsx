import { useState, useEffect } from "react";
import { Linkedin, Instagram, Mail, Github, ExternalLink, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "hover:bg-blue-600" 
    },
    { 
      icon: <Instagram className="h-5 w-5" />, 
      href: "https://instagram.com",
      label: "Instagram",
      color: "hover:bg-pink-600" 
    },
    { 
      icon: <Github className="h-5 w-5" />, 
      href: "https://github.com",
      label: "GitHub",
      color: "hover:bg-gray-800" 
    },
    { 
      icon: <Mail className="h-5 w-5" />, 
      href: "mailto:contact@example.com",
      label: "Email",
      color: "hover:bg-blue-500" 
    }
  ];

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Business", href: "#business" },
    { label: "Squash", href: "#squash" },
    { label: "Beyond", href: "#beyond" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <footer className="pt-16 pb-8 bg-gradient-to-b from-secondary/90 to-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-white/90">
          {/* About */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="text-2xl font-heading font-bold text-white">DYLAN</h3>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-4 text-white/70"
            >
              Business competitor, squash player, and lifelong learner. Always growing, always challenging myself to reach new heights.
            </motion.p>
          </div>
          
          {/* Quick Links */}
          <div className="lg:ml-auto">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg font-semibold mb-4 text-white"
            >
              Quick Links
            </motion.h4>
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 mr-0 group-hover:w-3 group-hover:mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>
          
          {/* Social Links */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg font-semibold mb-4 text-white"
            >
              Connect
            </motion.h4>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full bg-white/10 text-white hover:text-white transition-all duration-300 ${link.color}`}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </div>
          
          {/* Contact Info */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg font-semibold mb-4 text-white"
            >
              Contact
            </motion.h4>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-2 text-white/70"
            >
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" /> 
                <span>contact@example.com</span>
              </div>
              <div>
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-1 text-accent hover:text-accent/80 transition-colors mt-2"
                >
                  Send a message <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-white/60">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            © {currentYear} Dylan. All rights reserved.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm mt-2 md:mt-0"
          >
            Designed with passion. Built with purpose.
          </motion.div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: showScrollTop ? 1 : 0, 
            scale: showScrollTop ? 1 : 0.5,
            pointerEvents: showScrollTop ? "auto" : "none"
          }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className="rounded-full bg-primary/90 text-white border-none shadow-lg hover:bg-primary hover:scale-110 transition-all duration-300"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
