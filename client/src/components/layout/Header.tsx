import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state based on scroll position
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Detect active section
      const sections = document.querySelectorAll('section[id]');
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).clientHeight;
        
        if (window.scrollY >= (sectionTop - 300)) {
          currentSection = section.getAttribute('id') || '';
        }
      });
      
      if (currentSection !== activeSection && currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  // Close mobile menu when user clicks a link
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#business", label: "Business" },
    { href: "#squash", label: "Squash" },
    { href: "#beyond", label: "Beyond" },
    { href: "#contact", label: "Contact" },
  ];

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.header 
      initial="initial"
      animate="animate"
      variants={headerVariants}
      className={`fixed w-full ${
        scrolled 
          ? 'bg-white/80 shadow-md backdrop-blur-md py-3' 
          : 'bg-white/0 py-5'
      } transition-all duration-300 z-50`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="relative z-10">
          <div className="text-primary font-heading font-bold text-2xl relative">
            <span className="relative z-10">DYLAN</span>
            {scrolled && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute -bottom-1 left-0 h-1 bg-primary/20 rounded-full"
              />
            )}
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <motion.a 
              key={link.href}
              href={link.href}
              className={`nav-link font-medium hover:text-primary transition-colors py-2 px-1 ${
                scrolled ? 'text-secondary' : 'text-white'
              } ${
                activeSection === link.href.substring(1) ? 'active' : ''
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <motion.button 
          onClick={toggleMobileMenu}
          className={`md:hidden hover:text-primary focus:outline-none relative z-10 ${
            scrolled ? 'text-secondary' : 'text-white'
          }`}
          aria-label="Toggle mobile menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-light overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-2">
              {navLinks.map((link, index) => (
                <motion.a 
                  key={link.href}
                  href={link.href}
                  variants={linkVariants}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    activeSection === link.href.substring(1) 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-secondary hover:bg-light'
                  } transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{link.label}</span>
                  {activeSection === link.href.substring(1) && (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </motion.a>
              ))}
              
              <motion.div 
                variants={linkVariants}
                className="mt-6 pt-4 border-t border-light"
              >
                <div className="flex items-center justify-center space-x-4">
                  <a href="mailto:contact@example.com" className="p-2 rounded-full bg-light text-primary hover:bg-primary/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-light text-primary hover:bg-primary/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header Background for Hero Section */}
      {!scrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent -z-10"></div>
      )}
    </motion.header>
  );
};

export default Header;
