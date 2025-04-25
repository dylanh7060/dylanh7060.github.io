import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 1.4,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.75,
      transition: { duration: 1.2 }
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      ref={ref}
    >
      {/* Full screen background image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src="https://images.unsplash.com/photo-1564769662533-4f00a87b4056?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80" 
          alt="Modern aesthetic background" 
          className="w-full h-full object-cover object-center"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-0"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
        />
      </div>
      
      {/* Content overlay */}
      <div className="container mx-auto px-6 py-10 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Main headline */}
          <motion.div 
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate={controls}
            className="mb-8"
          >
            <h1 className="font-heading font-black tracking-tight text-8xl md:text-9xl xl:text-mega leading-none text-white">
              <span className="block text-gradient-primary bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                DYLAN
              </span>
            </h1>
          </motion.div>
          
          {/* Subtitle */}
          <motion.div
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate={controls}
            className="mb-10 md:mb-16"
          >
            <p className="font-heading text-xl md:text-2xl lg:text-3xl font-medium tracking-wide text-white/80">
              Business competitor. Squash player. <br className="hidden md:block" />
              <span className="text-accent">Always learning, always growing.</span>
            </p>
          </motion.div>
          
          {/* Background abstract shapes */}
          <div className="absolute left-40 top-32 w-32 h-32 border-2 border-white/20 rounded-full animate-pulse-soft"></div>
          <div className="absolute right-60 bottom-40 w-48 h-48 border border-accent/30 rounded-full animate-spin-slow"></div>
          <div className="absolute -left-10 bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float opacity-50"></div>
          <div className="absolute right-0 top-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-scale-in-out opacity-30"></div>

          {/* Call to action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Button 
              asChild
              size="lg"
              className="btn-gradient px-10 py-7 text-lg rounded-full group shadow-xl border-none"
            >
              <a href="#business" className="flex items-center gap-2">
                Explore My Story
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white/70 flex flex-col items-center gap-2"
        >
          <span className="text-sm uppercase tracking-widest">Scroll Down</span>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
