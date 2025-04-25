import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { Bike, UtensilsCrossed, Quote, Camera, Book, Music, ChevronRight, ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BeyondSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [activeInterest, setActiveInterest] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80
      }
    }
  };

  const interests = [
    {
      title: "Biking",
      icon: <Bike className="h-8 w-8 text-accent" />,
      description: "Biking represents freedom and exploration for me. Whether it's a challenging trail or a scenic route through the city, cycling provides both physical challenge and mental clarity.",
      additionalText: "Some of my best business ideas and problem-solving breakthroughs happen during long rides, where the rhythm of pedaling creates space for creative thinking.",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      color: "from-blue-50 to-green-50",
      facts: [
        "Cycled over 1,500km in 2022",
        "Favorite route: Lakeside Trail",
        "Weekend ritual: Dawn rides"
      ]
    },
    {
      title: "Cooking",
      icon: <UtensilsCrossed className="h-8 w-8 text-accent" />,
      description: "The kitchen is my creative laboratory. Experimenting with recipes, techniques, and flavors is both a meditative practice and a way to maintain balance during intense academic and athletic periods.",
      additionalText: "Cooking has taught me valuable lessons about precision, improvisation, and the importance of fundamentals – skills that translate surprisingly well to both business strategy and athletic preparation.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      color: "from-amber-50 to-red-50",
      facts: [
        "Specialty: Asian fusion",
        "Can prepare a 3-course meal",
        "Learning fermentation techniques"
      ]
    },
    {
      title: "Photography",
      icon: <Camera className="h-8 w-8 text-accent" />,
      description: "Photography helps me capture moments and perspectives that might otherwise go unnoticed. It's a practice in mindfulness and attention to detail that I find deeply rewarding.",
      additionalText: "Being behind the lens has taught me to look at the world differently, finding beauty in unexpected places and understanding the power of framing and perspective.",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      color: "from-purple-50 to-blue-50",
      facts: [
        "Favorite subject: Urban landscapes",
        "Equipment: Mirrorless camera",
        "Exhibited at school art show"
      ]
    },
    {
      title: "Reading",
      icon: <Book className="h-8 w-8 text-accent" />,
      description: "Books have always been my gateway to new ideas and perspectives. I'm particularly drawn to biographies, business literature, and classic fiction that offers insights into human nature.",
      additionalText: "Reading widely has been essential to my growth, introducing me to mentors and ideas through pages that have significantly shaped my thinking and aspirations.",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      color: "from-green-50 to-yellow-50",
      facts: [
        "Reading goal: 24 books/year",
        "Favorite author: Malcolm Gladwell",
        "Current read: Business innovation"
      ]
    }
  ];

  return (
    <section id="beyond" className="py-20 bg-gradient-to-b from-white to-light" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <Badge className="bg-primary/10 text-primary mb-4 px-4 py-1.5 text-sm font-medium rounded-full">Personal Interests</Badge>
          </motion.div>
          <h2 className="heading-xl font-heading text-center">Beyond the <span className="text-primary">Court & Classroom</span></h2>
        </div>
        
        {/* Interest Selector */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-2 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
            {interests.map((interest, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveInterest(index)}
                className={`p-4 rounded-lg transition-all duration-300 ${
                  activeInterest === index 
                    ? 'bg-primary text-white shadow-md' 
                    : 'hover:bg-light'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`${activeInterest === index ? 'text-white' : 'text-accent'}`}>
                    {interest.icon}
                  </div>
                  <span className="font-medium">{interest.title}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Featured Interest Content */}
        <div className="mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeInterest}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, type: "spring" }}
              className={`bg-gradient-to-br ${interests[activeInterest].color} rounded-2xl p-8 md:p-10 shadow-xl`}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white rounded-full shadow-md">
                      {interests[activeInterest].icon}
                    </div>
                    <h3 className="heading-md text-primary">{interests[activeInterest].title}</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-dark leading-relaxed">
                      {interests[activeInterest].description}
                    </p>
                    <p className="text-dark leading-relaxed">
                      {interests[activeInterest].additionalText}
                    </p>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                      <h4 className="font-medium text-primary mb-3">Quick Facts</h4>
                      <ul className="space-y-2">
                        {interests[activeInterest].facts.map((fact, idx) => (
                          <motion.li 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 + 0.2 }}
                            className="flex items-center gap-2"
                          >
                            <div className="w-2 h-2 rounded-full bg-accent"></div>
                            <span>{fact}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <motion.div 
                    className="relative"
                    initial={{ scale: 0.9, rotate: -5 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <div className="absolute inset-4 bg-primary/10 rounded-xl -rotate-3 z-0"></div>
                    <div className="relative z-10 rounded-xl overflow-hidden img-clip shadow-2xl border-4 border-white">
                      <img 
                        src={interests[activeInterest].image} 
                        alt={interests[activeInterest].title} 
                        className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    
                    {/* Navigation arrows */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-20">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white"
                        onClick={() => setActiveInterest((prev) => (prev - 1 + interests.length) % interests.length)}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-20">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white"
                        onClick={() => setActiveInterest((prev) => (prev + 1) % interests.length)}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Quote Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -top-6 -left-6 text-6xl text-primary/20 z-0">"</div>
            <div className="absolute -bottom-6 -right-6 text-6xl text-primary/20 z-0">"</div>
            
            <div className="relative z-10 bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center">
              <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
              <blockquote className="text-2xl md:text-3xl font-light text-dark mb-8 leading-relaxed">
                The richness of life comes from the diversity of our passions. Business gives me purpose, squash teaches me discipline, and my hobbies keep me grounded and creative.
              </blockquote>
              <div className="font-medium text-primary text-xl">Dylan</div>
              
              <motion.div 
                className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
          </div>
          
          {/* Additional Visual Elements */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[Music, Book, Camera].map((Icon, index) => (
              <motion.div
                key={index}
                className="bg-light rounded-full p-6 aspect-square flex items-center justify-center shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.5 }}
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
                }}
              >
                <Icon className="h-10 w-10 text-primary" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeyondSection;
