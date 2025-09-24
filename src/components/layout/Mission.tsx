import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Target, Users, Globe } from 'lucide-react';

export function Mission() {
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
      id="mission" 
      ref={ref}
      className="py-24 px-6 bg-gradient-to-br from-[#f8fffe] to-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-[#4CAF50]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 bg-[#66BB6A]/10 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 leading-tight">
                Discover Our{' '}
                <span className="text-[#4CAF50] relative">
                  Mission
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={isVisible ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </span>
              </h2>
            </motion.div>

            <motion.p
              className="text-md md:text-lg text-gray-600 leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Helping individuals and families choose safe, non-toxic alternatives for everyday life. 
              Learn how we're building a safer, chemical-free world for you and your family.
            </motion.p>

            {/* Mission points */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                {
                  icon: Target,
                  title: "Targeted Safety",
                  description: "Every product is carefully vetted for harmful substances"
                },
                {
                  icon: Users,
                  title: "Family First",
                  description: "Solutions designed with your loved ones in mind"
                },
                {
                  icon: Globe,
                  title: "Global Impact",
                  description: "Building a movement for safer, sustainable living"
                }
              ].map((point, index) => (
                <motion.div
                  key={point.title}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50]/10 to-[#4CAF50]/5 rounded-xl flex items-center justify-center">
                      <point.icon className="w-6 h-6 text-[#4CAF50]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-gray-900 font-semibold text-base">
                      {point.title}
                    </h4>
                    <p className="text-gray-600 text-base">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Main circle */}
              <motion.div
                className="w-80 h-80 mx-auto relative"
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-[#4CAF50]/20"></div>
                <div className="absolute inset-4 rounded-full border-2 border-[#4CAF50]/30"></div>
                <div className="absolute inset-8 rounded-full border-2 border-[#4CAF50]/40"></div>
              </motion.div>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-2xl flex items-center justify-center mx-auto mb-4"
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Target className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="mb-2 text-gray-900 font-sans font-semibold text-lg">
                    Our Goal
                  </h3>
                  <p className="text-gray-600 font-sans text-sm">
                    Chemical-free living for everyone
                  </p>
                </motion.div>
              </div>

              {/* Floating elements */}
              {[
                { top: '10%', left: '20%', delay: 0 },
                { top: '20%', right: '15%', delay: 1 },
                { bottom: '15%', left: '10%', delay: 2 },
                { bottom: '25%', right: '20%', delay: 3 }
              ].map((pos, index) => (
                <motion.div
                  key={index}
                  className="absolute w-4 h-4 bg-[#4CAF50]/30 rounded-full"
                  style={{ ...pos }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: pos.delay
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}