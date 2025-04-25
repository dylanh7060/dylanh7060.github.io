import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { Trophy, Users, Presentation, Award, Briefcase, Lightbulb, Map, GitPullRequest, Palette, ArrowRight, ArrowLeft, PauseCircle, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BusinessSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [activeAchievement, setActiveAchievement] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveAchievement(prev => (prev + 1) % achievements.length);
      }, 6000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  };

  const nextAchievement = () => {
    setActiveAchievement(prev => (prev + 1) % achievements.length);
    setIsAutoPlaying(false);
  };

  const prevAchievement = () => {
    setActiveAchievement(prev => (prev - 1 + achievements.length) % achievements.length);
    setIsAutoPlaying(false);
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    })
  };

  const achievements = [
    {
      title: "DECA Excellence",
      description: "My journey in competitive business has been defined by consistent growth and achievement in DECA, where I've developed skills in strategic thinking, presentation, and leadership.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      points: [
        { icon: <Trophy className="h-5 w-5 text-accent" />, text: "3x Provincials award-winner with specialization in marketing cluster" },
        { icon: <Users className="h-5 w-5 text-accent" />, text: "Marketing cluster lead and executive team member" },
        { icon: <Presentation className="h-5 w-5 text-accent" />, text: "Mentoring junior members and leading workshop sessions" },
      ],
      year: "2020-2023",
      color: "bg-green-50",
      badge: "Leadership"
    },
    {
      title: "Case Competitions",
      description: "Case competitions have been instrumental in honing my analytical thinking and presentation skills against top competitors.",
      image: "https://images.unsplash.com/photo-1573164574026-dd69c9fe4e63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      points: [
        { icon: <Award className="h-5 w-5 text-accent" />, text: "Rotman Boardroom Competition (Top 12 finish)" },
        { icon: <Briefcase className="h-5 w-5 text-accent" />, text: "Appleby Case Competition participant" },
        { icon: <Lightbulb className="h-5 w-5 text-accent" />, text: "Developed LISA, an innovative legal AI concept" },
      ],
      year: "2021-2022",
      color: "bg-blue-50",
      badge: "Innovation"
    },
    {
      title: "Leadership & Creative Projects",
      description: "Taking initiative beyond competitions, I've leveraged my skills to create value and lead projects that make an impact.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      points: [
        { icon: <Map className="h-5 w-5 text-accent" />, text: "Designed and implemented subpage creation for the school business team" },
        { icon: <GitPullRequest className="h-5 w-5 text-accent" />, text: "PMK project work focused on real-world applications" },
        { icon: <Palette className="h-5 w-5 text-accent" />, text: "Marketing case work including Wedgewood Theatre, CLEANSE, and Galaxy Pet" },
      ],
      year: "2022-2023",
      color: "bg-yellow-50",
      badge: "Creativity"
    },
  ];

  const [slideDirection, setSlideDirection] = useState(0);

  useEffect(() => {
    setSlideDirection(1);
  }, [activeAchievement]);

  return (
    <section id="business" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <Badge className="bg-primary/10 text-primary mb-4 px-4 py-1.5 text-sm font-medium rounded-full">Professional Journey</Badge>
          </motion.div>
          <h2 className="heading-xl font-heading text-center">My <span className="text-primary">Business</span> Journey</h2>
        </div>
        
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Timeline navigation */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-16"
          >
            <div className="relative p-1 bg-light shadow-md rounded-full">
              <div className="flex space-x-1">
                {achievements.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeAchievement === index 
                        ? 'bg-primary scale-125' 
                        : 'bg-primary/20'
                    }`}
                    onClick={() => {
                      setActiveAchievement(index);
                      setIsAutoPlaying(false);
                    }}
                    aria-label={`View achievement ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main content carousel */}
          <div className="relative overflow-hidden">
            <AnimatePresence custom={slideDirection} initial={false} mode="wait">
              <motion.div
                key={activeAchievement}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`${achievements[activeAchievement].color} rounded-2xl p-8 md:p-10 shadow-xl`}
              >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <Badge variant="secondary" className="mb-3">
                      {achievements[activeAchievement].year}
                    </Badge>
                    <Badge className="bg-primary text-white mb-4 ml-2">
                      {achievements[activeAchievement].badge}
                    </Badge>
                    <h3 className="heading-md mb-4 text-primary">{achievements[activeAchievement].title}</h3>
                    <p className="text-dark mb-8 leading-relaxed">{achievements[activeAchievement].description}</p>
                    
                    <ul className="space-y-5">
                      {achievements[activeAchievement].points.map((point, i) => (
                        <motion.li 
                          key={i} 
                          className={`flex items-start p-3 rounded-lg transition-all duration-300 ${
                            hoveredPoint === i ? 'bg-white shadow-md' : ''
                          }`}
                          onMouseEnter={() => setHoveredPoint(i)}
                          onMouseLeave={() => setHoveredPoint(null)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 + 0.3 }}
                        >
                          <div className="mt-1 mr-4 p-2 bg-primary/10 rounded-full">{point.icon}</div>
                          <span className="leading-relaxed">{point.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="relative rounded-xl overflow-hidden shadow-2xl img-clip">
                      <img 
                        src={achievements[activeAchievement].image} 
                        alt={achievements[activeAchievement].title} 
                        className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation controls */}
            <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 flex items-center space-x-3 z-20">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white border-none" 
                onClick={toggleAutoPlay}
              >
                {isAutoPlaying ? <PauseCircle className="h-5 w-5 text-primary" /> : <PlayCircle className="h-5 w-5 text-primary" />}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white border-none" 
                onClick={prevAchievement}
              >
                <ArrowLeft className="h-5 w-5 text-primary" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white border-none" 
                onClick={nextAchievement}
              >
                <ArrowRight className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </div>
          
          {/* Skills showcase */}
          <motion.div 
            className="mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6"
            variants={sectionVariants}
          >
            {['Strategy', 'Leadership', 'Marketing', 'Presentation', 'Innovation', 'Analysis'].map((skill, index) => (
              <motion.div
                key={skill}
                variants={itemVariants}
                className="hover-card bg-light rounded-lg p-6 text-center shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  backgroundColor: '#f0fbf4',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="number-badge mb-3 mx-auto">{index + 1}</div>
                <p className="font-medium text-primary">{skill}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessSection;
