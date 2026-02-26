import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Bell, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function ComingSoonCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);


  return (
    <section
      ref={ref}
      className="py-24 px-6 bg-cream relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-48 h-48 bg-sage/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 bg-earth/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Icon */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-20 h-20 bg-sage rounded-[2rem] flex items-center justify-center relative shadow-lg">
              <Sparkles className="w-10 h-10 text-offWhite" />
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-[2rem]"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl font-heading font-bold mb-6 text-forest"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Coming Soon
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-charcoal/80 leading-relaxed mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          We are actively developing THESAFEHIVE Safety Graph to bring you the safest choices. We are working to identify the top 1% of products that pass our strict 'SVA-1 Protocol' for our marketplace.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Button
            to="/contact"
            size="md"
            className="gtm-cta-get-notified bg-sage text-white px-8 py-4 text-lg rounded-[2rem] shadow-lg hover:shadow-xl hover:bg-sage-dark transition-all duration-300 transform hover:-translate-y-1 group border border-white/40 backdrop-blur-sm"
          >
            <Bell className="w-5 h-5 mr-3 group-hover:animate-pulse" />
            Stay Tuned
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-12 text-base text-charcoal/70"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-sage-dark rounded-full"></div>
            <span>Toxic-Free Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-sage-dark rounded-full"></div>
            <span>Evidence-Led Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-sage-dark rounded-full"></div>
            <span>Eco-Friendly Packaging</span>
          </div>
        </motion.div>
        {/* Bottom decorative element */}
        {/* <motion.div
          className="flex justify-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center gap-4 text-gray-400">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300" />
            <Leaf className="w-6 h-6 text-[#4CAF50]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300" />
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
