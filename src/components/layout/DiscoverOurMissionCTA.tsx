import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Heart, Shield, Leaf, ArrowRight, Users } from 'lucide-react';
import { Button } from '../ui/Button';

export function DiscoverMissionCTA() {
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
      className="py-24 px-6 bg-offWhite relative overflow-hidden rounded-t-[3rem] -mt-8 z-20"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-48 h-48 bg-sage/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-64 h-64 bg-earth/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.4, 0.2]
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
            <div className="grid grid-cols-2 gap-6 relative z-10">
              {[
                { icon: Heart, label: "Family Safety", color: "from-earth/20 to-cream", iconColor: "text-earth" },
                { icon: Shield, label: "Toxic-Free", color: "from-sage/20 to-cream", iconColor: "text-forest" },
                { icon: Leaf, label: "Eco-Conscious", color: "from-sage/30 to-cream", iconColor: "text-sage-dark" },
                { icon: Users, label: "Community", color: "from-earth/30 to-cream", iconColor: "text-charcoal" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className={`bg-gradient-to-br ${item.color} rounded-[2rem] p-6 md:p-8 text-center border border-white/40 shadow-sm backdrop-blur-md`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-14 h-14 bg-white/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm backdrop-blur-sm">
                    <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                  </div>
                  <h4 className="text-sm md:text-base font-medium text-forest">{item.label}</h4>
                </motion.div>
              ))}
            </div>

            {/* Central Focus Element */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="w-28 h-28 bg-sage rounded-full flex items-center justify-center shadow-lg border-8 border-offWhite pointer-events-auto">
                <motion.div
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Leaf className="w-12 h-12 text-cream" />
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
              className="text-4xl md:text-5xl font-heading font-bold mb-8 text-forest leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Curious About Our{' '}
              <span className="text-sage-dark relative italic">
                Mission?
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-sage rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={isVisible ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-charcoal/80 leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              In our busy lives, it’s hard to research every product - so we do it for you, uncovering hidden toxins. Learn how we curate safer, harm-free products for your family.
            </motion.p>

            {/* Mission highlights */}
            <motion.div
              className="space-y-6 mb-12"
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
                  className="flex items-start gap-5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                >
                  <div className="w-2.5 h-2.5 bg-sage-dark rounded-full mt-2.5 flex-shrink-0"></div>
                  <p className="text-lg text-charcoal/80">{point}</p>
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
                className="gtm-cta-discover-mission bg-sage text-white px-8 py-4 text-lg rounded-[2rem] hover:bg-sage-dark hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
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
