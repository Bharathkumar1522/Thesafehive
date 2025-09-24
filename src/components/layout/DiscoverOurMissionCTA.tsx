import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Heart, Shield, Leaf, ArrowRight, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Page } from '../../types/navigation';

interface DiscoverMissionCTAProps {
  setCurrentPage: (page: Page) => void;
}

export function DiscoverMissionCTA({ setCurrentPage }: DiscoverMissionCTAProps) {
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

  const handleDiscoverMission = () => {
    setCurrentPage('about');
  };

  return (
    <section 
      ref={ref}
      className="py-20 px-6 bg-gradient-to-br from-white via-[#f8fff8] to-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-[#4CAF50]/8 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-[#66BB6A]/6 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* Mission Values Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Heart, label: "Family Safety", color: "from-red-500/10 to-red-400/5", iconColor: "text-red-500" },
                { icon: Shield, label: "Chemical-Free", color: "from-[#4CAF50]/10 to-[#4CAF50]/5", iconColor: "text-[#4CAF50]" },
                { icon: Leaf, label: "Eco-Conscious", color: "from-green-500/10 to-green-400/5", iconColor: "text-green-600" },
                { icon: Users, label: "Community", color: "from-blue-500/10 to-blue-400/5", iconColor: "text-blue-500" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 md:pt-9 md:pb-9 text-center border border-gray-100/50 backdrop-blur-sm`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <h4 className="text-sm md:text-base text-gray-700">{item.label}</h4>
                </motion.div>
              ))}
            </div>

            {/* Central Focus Element */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                <motion.div
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Leaf className="w-10 h-10 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Curious About Our{' '}
              <span className="text-[#4CAF50] relative">
                Mission?
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={isVisible ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>
            </motion.h2>

            <motion.p
              className="text-md md:text-lg text-gray-600 leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Learn how we're building a safer, chemical-free world for you and your family.
            </motion.p>

            {/* Mission highlights */}
            <motion.div
              className="space-y-5 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {[
                "Rigorous testing for every product we recommend",
                "Educational resources for safer living choices", 
                "Building a community of health-conscious families"
              ].map((point, index) => (
                <motion.div
                  key={point}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                >
                  <div className="w-2.5 h-2.5 bg-[#4CAF50] rounded-full mt-2.5 flex-shrink-0"></div>
                  <p className="text-md md:text-lg text-gray-700">{point}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Button
                to="/about"
                size="md"
                className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#45a049] hover:to-[#5da85d] text-white px-10 py-4 text-base rounded-2xl shadow-2xl hover:shadow-[#4CAF50]/40 transition-all duration-300 transform hover:scale-105 group"
              >
                Discover Our Mission
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}