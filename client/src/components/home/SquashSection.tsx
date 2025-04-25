import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Star, Target, Zap, Dumbbell, Timer, Trophy, Brain } from "lucide-react";

const SquashSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const statsRef = useRef(null);
  const inView = useInView(ref, { once: true });
  const statsInView = useInView(statsRef, { once: true });
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTournament, setSelectedTournament] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (statsInView) {
      startCounters();
    }
  }, [statsInView]);

  const startCounters = () => {
    // This would be implemented with a real counting animation library
    // We're simulating the concept here
  };

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
    hidden: { opacity: 0, y: 30 },
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

  const bounceVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const tournaments = [
    {
      type: "Regional",
      title: "City Championships",
      description: "Semifinalist in highly competitive bracket, notable for strategic play against higher-ranked opponents.",
      date: "April 2023",
      placement: "Top 4",
      color: "bg-blue-50",
      icon: <Trophy className="h-5 w-5 text-blue-500" />,
      image: "https://images.unsplash.com/photo-1566577134664-17a565982f26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      stats: [
        { label: "Matches", value: 5 },
        { label: "Win Rate", value: "80%" },
        { label: "Points Scored", value: 165 }
      ]
    },
    {
      type: "Provincial",
      title: "Ontario Junior Open",
      description: "Quarterfinal finish with notable victory against provincial seed. Demonstrated effective adaptation to challenging court conditions.",
      date: "November 2022",
      placement: "Top 8",
      color: "bg-green-50",
      icon: <Star className="h-5 w-5 text-green-500" />,
      image: "https://images.unsplash.com/photo-1554290813-ec6a2a72e5c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      stats: [
        { label: "Matches", value: 4 },
        { label: "Win Rate", value: "75%" },
        { label: "Points Scored", value: 143 }
      ]
    },
    {
      type: "School",
      title: "Interscholastic Finals",
      description: "Team captain leading to championship match. Personal record of 7-1 throughout the tournament series.",
      date: "February 2023",
      placement: "Finalist",
      color: "bg-amber-50",
      icon: <Target className="h-5 w-5 text-amber-500" />,
      image: "https://images.unsplash.com/photo-1542766788-a2f588f447ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1076&q=80",
      stats: [
        { label: "Matches", value: 8 },
        { label: "Win Rate", value: "87.5%" },
        { label: "Points Scored", value: 231 }
      ]
    }
  ];

  const tabContent = [
    {
      label: "My Journey",
      content: (
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-primary/10 z-0 animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-accent/10 z-0 animate-pulse"></div>
            <div className="relative z-10 aspect-video rounded-xl overflow-hidden shadow-2xl img-clip border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1554290813-ec6a2a72e5c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
                alt="Squash court" 
                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
              />
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="heading-md mb-6 text-primary">The Beginning</h3>
            <p className="text-dark mb-4 leading-relaxed">
              My squash journey began as a casual interest and quickly evolved into a passion that has shaped my character and approach to challenges.
            </p>
            <p className="text-dark mb-6 leading-relaxed">
              What started with basic rallies transformed through dedicated training sessions, strategic gameplay development, and a growing love for the mental chess match that high-level squash represents.
            </p>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-primary"
            >
              <p className="italic text-dark text-lg">
                "Squash has taught me that success comes from the perfect balance of strategy, discipline, and adaptability—the same skills that drive my approach to business challenges."
              </p>
            </motion.div>
          </motion.div>
        </div>
      )
    },
    {
      label: "Tournaments",
      content: (
        <div>
          <div className="flex justify-center mb-10 gap-2 md:gap-4">
            {tournaments.map((tournament, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedTournament(index)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedTournament === index 
                    ? `${tournament.color} shadow-md scale-105` 
                    : 'bg-white hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  {tournament.icon}
                  <span className="hidden md:inline">{tournament.title}</span>
                </div>
              </motion.button>
            ))}
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTournament}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Badge className={tournaments[selectedTournament].color.replace('bg-', 'bg-') + ' text-' + tournaments[selectedTournament].color.split('-')[0] + '-700'}>
                      {tournaments[selectedTournament].type}
                    </Badge>
                    <span className="font-medium text-primary">{tournaments[selectedTournament].date}</span>
                  </div>
                  
                  <h4 className="heading-md mb-4 text-primary">{tournaments[selectedTournament].title}</h4>
                  <p className="text-dark mb-8 leading-relaxed">{tournaments[selectedTournament].description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {tournaments[selectedTournament].stats.map((stat, idx) => (
                      <div key={idx} className="text-center p-4 rounded-lg bg-light">
                        <div className="text-2xl font-bold text-primary">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Final Placement</span>
                    <span className="font-bold text-xl text-primary">{tournaments[selectedTournament].placement}</span>
                  </div>
                </div>
                
                <div className="relative rounded-xl overflow-hidden shadow-lg h-72">
                  <img 
                    src={tournaments[selectedTournament].image}
                    alt={tournaments[selectedTournament].title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )
    },
    {
      label: "Lessons Learned",
      content: (
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <h3 className="heading-md mb-6 text-primary">Junior vs. Senior: The Dilemma</h3>
            <p className="text-dark mb-4 leading-relaxed">
              Facing the choice between junior and senior teams challenged me to evaluate my goals, capabilities, and growth potential. It represented a pivotal moment in my squash journey.
            </p>
            <p className="text-dark mb-8 leading-relaxed">
              This decision taught me valuable lessons about self-assessment, strategic career planning, and balancing present opportunities with future growth – lessons that apply directly to my business aspirations.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: <Brain className="h-5 w-5 text-accent" />, title: "Mindset", description: "Embracing challenges over comfort" },
                { icon: <Target className="h-5 w-5 text-accent" />, title: "Strategy", description: "Adapting to opponents' patterns" },
                { icon: <Zap className="h-5 w-5 text-accent" />, title: "Perseverance", description: "Finding opportunities in setbacks" }
              ].map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start p-4 rounded-lg bg-white shadow-md hover-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="mr-4 p-2 bg-primary/10 rounded-full">{skill.icon}</div>
                  <div>
                    <h4 className="font-medium mb-1">{skill.title}</h4>
                    <p className="text-gray-600">{skill.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={bounceVariants} className="order-1 md:order-2">
            <div className="grid grid-cols-6 grid-rows-6 gap-4 h-full">
              <div className="col-span-3 row-span-3 rounded-xl overflow-hidden shadow-lg img-clip">
                <img 
                  src="https://images.unsplash.com/photo-1566577134624-6f6cc4bb272b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Squash action shot 1" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="col-span-3 row-span-4 rounded-xl overflow-hidden shadow-lg img-clip">
                <img 
                  src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Squash action shot 2" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="col-span-3 row-span-3 col-start-4 row-start-1 rounded-xl overflow-hidden shadow-lg img-clip">
                <img 
                  src="https://images.unsplash.com/photo-1554290813-ec6a2a72e5c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
                  alt="Squash court" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="col-span-6 row-span-2 row-start-5 rounded-xl overflow-hidden shadow-lg img-clip">
                <img 
                  src="https://images.unsplash.com/photo-1542766788-a2f588f447ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1076&q=80" 
                  alt="Squash team photo" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )
    }
  ];

  return (
    <section id="squash" className="py-20 bg-gradient-to-b from-light to-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <Badge className="bg-primary/10 text-primary mb-4 px-4 py-1.5 text-sm font-medium rounded-full">Athletic Journey</Badge>
          </motion.div>
          <h2 className="heading-xl font-heading text-center">Squash: <span className="text-primary">A Journey of Discipline</span></h2>
        </div>
        
        {/* Stats Section */}
        <motion.div 
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { icon: <Dumbbell className="h-6 w-6 text-primary" />, value: "7+", label: "Years Playing" },
            { icon: <Trophy className="h-6 w-6 text-primary" />, value: "12+", label: "Tournaments" },
            { icon: <Timer className="h-6 w-6 text-primary" />, value: "1200+", label: "Training Hours" },
            { icon: <Zap className="h-6 w-6 text-primary" />, value: "85%", label: "Win Rate" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg text-center hover-card"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Tab Navigation */}
        <div className="mb-12">
          <div className="flex justify-center space-x-2 md:space-x-4 bg-white p-1 rounded-full shadow-md w-fit mx-auto">
            {tabContent.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                  activeTab === index ? 'bg-primary text-white shadow-md' : 'hover:bg-primary/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {tabContent[activeTab].content}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SquashSection;
