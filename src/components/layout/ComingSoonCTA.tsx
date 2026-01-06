import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Leaf, Bell, Sparkles, ArrowRight } from 'lucide-react';
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
      className="py-20 px-6 bg-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-[#4CAF50]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 bg-[#66BB6A]/15 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2]
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
            <div className="w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-2xl flex items-center justify-center relative">
              <Sparkles className="w-8 h-8 text-white" />
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.h2 
          className="text-4xl font-bold mb-6 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Coming Soon
        </motion.h2>

        <motion.p 
          className="text-lg text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          We are actively developing TheSafeHive Safety Graph to bring you the safest choices. We are working to identify the top 1% of products that pass our strict 'SVA-1 Protocol' for our marketplace.
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
            className="gtm-cta-get-notified bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#45a049] hover:to-[#5da85d] text-white px-6 py-2.5 text-base rounded-2xl shadow-2xl hover:shadow-[#4CAF50]/40 transition-all duration-300 transform hover:scale-105 group border-2 border-white/20"
          >
            <Bell className="w-5 h-5 mr-3 group-hover:animate-pulse" />
            Stay Tuned
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-12 text-base text-gray-500"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#4CAF50] rounded-full"></div>
            <span>Toxic-Free Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#4CAF50] rounded-full"></div>
            <span>Evidence-Led Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#4CAF50] rounded-full"></div>
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
