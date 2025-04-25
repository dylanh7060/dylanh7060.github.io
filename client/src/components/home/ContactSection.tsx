import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Instagram, Github, Send, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters.")
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

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

  const socialLinks = [
    { 
      icon: <Mail className="h-5 w-5" />, 
      text: "contact@example.com", 
      href: "mailto:contact@example.com",
      color: "bg-blue-500"
    },
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      text: "linkedin.com/in/dylanprofile", 
      href: "https://linkedin.com",
      color: "bg-blue-700"
    },
    { 
      icon: <Instagram className="h-5 w-5" />, 
      text: "@dylan_profile", 
      href: "https://instagram.com",
      color: "bg-pink-600"
    },
    { 
      icon: <Github className="h-5 w-5" />, 
      text: "github.com/dylan", 
      href: "https://github.com",
      color: "bg-gray-800"
    }
  ];

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Submit form data to the API
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-secondary to-secondary/90 text-white relative overflow-hidden" ref={ref}>
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-primary/30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <Badge className="bg-accent/20 text-accent mb-4 px-4 py-1.5 text-sm font-medium rounded-full">Say Hello</Badge>
          </motion.div>
          <h2 className="heading-xl font-heading text-center text-white">Let's <span className="text-accent">Connect</span></h2>
        </div>
        
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <h3 className="heading-md mb-6 text-accent">Get In Touch</h3>
            <p className="mb-10 text-white/80 leading-relaxed text-lg">
              I'm always open to discussing business ideas, squash strategies, or potential collaborations. Feel free to reach out through the form or connect with me directly.
            </p>
            
            <div className="space-y-6 mb-10">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group hover-card p-4 bg-white/5 backdrop-blur-sm rounded-xl transition-all duration-300"
                  whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <div className={`w-12 h-12 flex items-center justify-center ${link.color} rounded-full mr-6 text-white`}>
                    {link.icon}
                  </div>
                  <div className="flex-grow">
                    <span className="block text-white">{link.text}</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/0 group-hover:text-white/100 transition-all duration-300" />
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h4 className="font-medium text-accent mb-3">Response Time</h4>
              <p className="text-white/80">
                I typically respond to messages within 24-48 hours. For urgent matters, please reach out via LinkedIn.
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/10 backdrop-blur-md text-white p-10 rounded-xl shadow-xl border border-white/10 text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Message Sent Successfully!</h3>
                  <p className="text-white/80 mb-8">
                    Thank you for reaching out! I'll review your message and get back to you as soon as possible.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-xl"></div>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="relative z-10 bg-white/10 backdrop-blur-md text-white p-8 rounded-xl shadow-xl border border-white/10">
                        <div className="absolute -top-5 -right-5 py-2 px-4 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium text-white">
                          Let's Talk!
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel className="text-white font-medium mb-2">Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your name" 
                                  {...field} 
                                  className="w-full p-3 border border-white/20 bg-white/5 text-white rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent placeholder:text-white/40"
                                />
                              </FormControl>
                              <FormMessage className="text-red-300" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel className="text-white font-medium mb-2">Email</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your email address" 
                                  type="email" 
                                  {...field} 
                                  className="w-full p-3 border border-white/20 bg-white/5 text-white rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent placeholder:text-white/40"
                                />
                              </FormControl>
                              <FormMessage className="text-red-300" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem className="mb-8">
                              <FormLabel className="text-white font-medium mb-2">Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Your message" 
                                  rows={5} 
                                  {...field} 
                                  className="w-full p-3 border border-white/20 bg-white/5 text-white rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none placeholder:text-white/40"
                                />
                              </FormControl>
                              <FormMessage className="text-red-300" />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-accent hover:bg-accent/90 text-white font-medium px-6 py-6 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
                        >
                          {isSubmitting ? (
                            <>Sending...</>
                          ) : (
                            <>
                              Send Message <Send className="h-5 w-5 ml-2" />
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
