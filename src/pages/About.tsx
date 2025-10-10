import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { coreValues } from "../data/values";
import {
  Leaf,
  Building,
  Search,
  Shield,
  AlertTriangle,
  Award,
  MessageSquare,
  Eye,
  Microscope,
  TrendingUp,
  Target,
  ShieldCheck,
  ShoppingBag,
  GraduationCap,
} from "lucide-react";
import { CoreValuesGrid } from "../components/ui/CoreValueCard";

/** Cloudinary helper: build responsive URLs with f_auto,q_auto and width */
const cld = (publicUrl: string, w: number) => {
  // turns .../upload/... into .../upload/f_auto,q_auto,w_{w}/...
  return publicUrl.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
};

/** ---- Inlined Mission component ---- */
const Mission = () => {
  const missionPoints = [
    {
      icon: Target,
      title: "Our Core Mission",
      description:
        "Connect people with trusted, natural, and toxin-free products. We exist to make it easier to choose products that are genuinely safe – or at the very least, significantly safer than conventional alternatives.",
    },
    {
      icon: ShieldCheck,
      title: "Ethical Partnerships",
      description:
        "Partner with ethical brands that prioritise transparency, sustainability, and well-being. We promote healthier, more conscious living in everyday life.",
    },
    {
      icon: ShoppingBag,
      title: "Effortless Shopping",
      description:
        "Clear labels, trusted certifications, and vibrant choices – all just a click away. Navigate today's crowded market with confidence and ease.",
    },
    {
      icon: GraduationCap,
      title: "Education & Support",
      description:
        "Beyond products, we're committed to empowering through resources, guides, and customer care. Understand what's in the products you use and make confident, informed decisions for yourself, your families, and even your pets.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="mission-section-heading">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 id="mission-section-heading" className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Discover Our <span className="text-green-600">Vision</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At TheSafeHive, we're dedicated to making safe, natural products accessible to everyone. Here's how we do it:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {missionPoints.map((point, index) => (
            <motion.article
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px 0px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 md:p-8 shadow-sm border border-green-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <point.icon className="w-6 h-6 md:w-7 md:h-7 text-white" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">{point.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{point.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
/** ---- End Mission component ---- */

const About = () => {
  // Original Cloudinary PNG (we'll serve AVIF/WebP/PNG automatically)
  const HERO_BASE =
    "https://res.cloudinary.com/dwmaznf4n/image/upload/v1752349834/20250712_2047_Harmonious_Nature_Bliss_simple_compose_01k002qpqyf9j8ypjrg10eabrk_tauyp9.png";
  const ref = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const futureRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);
  const [futureVisible, setFutureVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const processObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProcessVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const futureObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFutureVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    if (processRef.current) {
      processObserver.observe(processRef.current);
    }
    if (futureRef.current) {
      futureObserver.observe(futureRef.current);
    }

    return () => {
      observer.disconnect();
      processObserver.disconnect();
      futureObserver.disconnect();
    };
  }, []);

  const futurePlans = [
    {
      icon: Building,
      title: "Brand Collaboration",
      description: "Collaborating directly with brands to gain deeper transparency in sourcing and manufacturing.",
    },
    {
      icon: Microscope,
      title: "Third-Party Lab Testing",
      description: "Introducing third-party lab testing to scientifically verify product safety and purity.",
    },
    {
      icon: TrendingUp,
      title: "Supplier Audits",
      description: "Conducting supplier audits to ensure ethical and sustainable practices.",
    },
  ];

  return (
    <div className="pt-16">
      {/* JSON-LD Organization schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "TheSafeHive",
            url: "https://thesafehive.example", // update
            logo: "https://thesafehive.example/logo.png",
            sameAs: ["https://instagram.com/thesafehive", "https://www.youtube.com/@thesafehive"], // update
          }),
        }}
      />

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-green-50 to-white overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="relative" role="banner" aria-labelledby="hero-heading">
          <picture>
            <source
              type="image/avif"
              srcSet={`${cld(HERO_BASE, 640)} 640w, ${cld(HERO_BASE, 960)} 960w, ${cld(
                HERO_BASE,
                1280
              )} 1280w, ${cld(HERO_BASE, 1600)} 1600w, ${cld(HERO_BASE, 1920)} 1920w`}
            />
            <source
              type="image/webp"
              srcSet={`${cld(HERO_BASE, 640)} 640w, ${cld(HERO_BASE, 960)} 960w, ${cld(
                HERO_BASE,
                1280
              )} 1280w, ${cld(HERO_BASE, 1600)} 1600w, ${cld(HERO_BASE, 1920)} 1920w`}
            />
            <img
              src={cld(HERO_BASE, 1280)}
              srcSet={`${cld(HERO_BASE, 640)} 640w, ${cld(HERO_BASE, 960)} 960w, ${cld(
                HERO_BASE,
                1280
              )} 1280w, ${cld(HERO_BASE, 1600)} 1600w, ${cld(HERO_BASE, 1920)} 1920w`}
              sizes="(min-width: 1024px) 100vw, 100vw"
              alt="Healthy eco-friendly joyful nature scene for families"
              className="w-full h-80 sm:h-[32rem] md:h-[40rem] object-cover brightness-95"
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              aria-hidden="true"
            />
          </picture>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

          {/* Quote content */}
          <div
            className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 py-16 sm:py-24"
            role="region"
            aria-label="Founder's Quote"
          >
            <motion.div
              className="max-w-3xl mx-auto text-center text-white"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.8,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  stiffness: 100,
                  restDelta: 0.001,
                },
              }}
              role="article"
              aria-labelledby="quote-text"
            >
              <blockquote className="space-y-8">
                <p
                  id="quote-text"
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed"
                >
                  "We didn't just want to sell products—we wanted to rebuild trust in everyday choices. Safe Hive is our
                  way of helping families feel safe, empowered, and informed."
                </p>
                <motion.footer
                  className="text-lg sm:text-xl font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  aria-label="Quote attribution"
                >
                  — TheSafeHive Team
                </motion.footer>
              </blockquote>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 pt-24 pb-12 md:pt-32 md:pb-24 relative z-10 text-center">
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-4"
          >
            About <span className="text-green-600">TheSafeHive</span>
          </h1>

          {/* Removed HeroVideo */}

          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mt-4">
            We're on a mission to help individuals and families choose harm-free, natural alternatives for everyday
            life—safe for people, animals, and our planet.
          </p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex justify-center">
              <div className="flex items-center gap-4 text-gray-400">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300" />
                <Leaf className="w-6 h-6 text-[#4CAF50]" aria-hidden="true" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Mission />

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50 ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Our <span className="text-green-600">Values</span>
            </h2>
            <p className="text-lg text-gray-700">These core principles guide everything we do at Safe Hive</p>
          </div>
          <CoreValuesGrid values={coreValues} />
        </div>
      </section>

      {/* How We Hand-Pick Products Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-green-50 to-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-heading">
              How We <span className="text-green-600">Hand-Pick </span>Products
            </h2>

            <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                At The SafeHive, our mission is to bring you products that are truly safe, natural, and reliable.
                That's why every product goes through a careful initial independent review process before it reaches
                you.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Process Section */}
      <section ref={processRef} className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-[#4CAF50]/8 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 bg-[#66BB6A]/6 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Process Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">Our Current Independent Process</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] rounded-full mx-auto"></div>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Central Timeline Line - Dotted */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 top-0 bottom-0 md:block hidden">
              <div
                className="w-full bg-[#4CAF50] opacity-30"
                style={{
                  height: "100%",
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, #4CAF50 0, #4CAF50 8px, transparent 8px, transparent 16px)",
                }}
              ></div>
            </div>

            {/* Mobile Timeline Line - Left side */}
            <div className="absolute left-8 top-0 bottom-0 w-1 md:hidden block">
              <div
                className="w-full bg-[#4CAF50] opacity-30"
                style={{
                  height: "100%",
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, #4CAF50 0, #4CAF50 8px, transparent 8px, transparent 16px)",
                }}
              ></div>
            </div>

            {/* Process Steps */}
            <div className="space-y-16 md:space-y-20">
              {[
                {
                  title: "Company Research",
                  description:
                    "We review the company's background, ethics, sustainability record, and reputation using publicly available information such as websites, reports, press coverage, and recall histories.",
                  icon: Building,
                  image:
                    "https://images.unsplash.com/photo-1758876020300-76a782ca51c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHJlc2VhcmNoJTIwb2ZmaWNlJTIwYW5hbHlzaXN8ZW58MXx8fHwxNzU5MTQ3NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
                },
                {
                  title: "Ingredient List Check",
                  description:
                    "We examine ingredient lists from product packaging, official brand websites, and reliable databases (such as INCI and EWG's Skin Deep).",
                  icon: Search,
                  image:
                    "https://images.unsplash.com/photo-1748261347902-451fb437e8fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwaW5ncmVkaWVudHMlMjB0ZXN0aW5nfGVufDF8fHx8MTc1OTE0NzQ5NXww&ixlib=rb-4.1.0&q=80&w=1080",
                },
                {
                  title: "Safety Cross-Check",
                  description:
                    "Every ingredient is compared against authoritative safety sources like WHO, IARC, ECHA, and peer-reviewed research to ensure it is free from harmful or toxic substances.",
                  icon: Shield,
                  image:
                    "https://images.unsplash.com/photo-1702623945459-d2ebfec1ca31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBwcm90ZWN0aW9uJTIwc2hpZWxkfGVufDF8fHx8MTc1OTEyNzM1OXww&ixlib=rb-4.1.0&q=80&w=1080",
                },
                {
                  title: "Precautionary Principle",
                  description:
                    'If an ingredient is vague (like "fragrance") or under safety debate, we exclude the product rather than take risks.',
                  icon: AlertTriangle,
                  image:
                    "https://res.cloudinary.com/dwmaznf4n/image/upload/v1759964570/istockphoto-1484132234-612x612_ghckyg.webp",
                },
                {
                  title: "Certification Verification",
                  description:
                    "We verify visible third-party certifications (organic, cruelty-free, eco-friendly) shown on packaging or official product listings.",
                  icon: Award,
                  image:
                    "https://res.cloudinary.com/dwmaznf4n/image/upload/v1759964386/istockphoto-2191838165-612x612_nuw02j.webp",
                },
                {
                  title: "Ongoing Monitoring",
                  description:
                    "Even after approval, we track new studies, recalls, and consumer feedback. Products that no longer meet our standards are immediately removed.",
                  icon: Eye,
                  image:
                    "https://images.unsplash.com/photo-1758577515333-e71b713059f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25pdG9yaW5nJTIwdHJhY2tpbmclMjBkYXRhfGVufDF8fHx8MTc1OTE0NzUwOHww&ixlib=rb-4.1.0&q=80&w=1080",
                },
                {
                  title: "Customer Transparency",
                  description:
                    "We simplify all this research into clear, honest product information so you always know what's inside and why it's safe.",
                  icon: MessageSquare,
                  image:
                    "https://images.unsplash.com/photo-1654166602082-d18e7cd4bdac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc3BhcmVuY3klMjBjb21tdW5pY2F0aW9uJTIwY2xlYXJ8ZW58MXx8fHwxNzU5MTQ3NTExfDA&ixlib=rb-4.1.0&q=80&w=1080",
                },
              ].map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={processVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
                    className="relative"
                  >
                    {/* Desktop Layout - Alternating */}
                    <div className="hidden md:grid grid-cols-2 gap-8 items-center">
                      {/* Left Side */}
                      <motion.div
                        className={`flex justify-center`}
                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                        animate={processVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                      >
                        {isEven ? (
                          // Image for even steps (left side)
                          <div className="w-80 h-64 rounded-2xl overflow-hidden shadow-xl">
                            <img
                              src={step.image}
                              alt={step.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          // Content for odd steps (left side)
                          <div className="w-full max-w-md">
                            <div className="text-right">
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Step {index + 1}</h4>
                              <h5 className="text-xl font-semibold text-green-600 mb-3">{step.title}</h5>
                              <p className="text-gray-700 leading-relaxed text-base">{step.description}</p>
                            </div>
                          </div>
                        )}
                      </motion.div>

                      {/* Right Side */}
                      <motion.div
                        className={` flex justify-center`}
                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                        animate={processVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                      >
                        {isEven ? (
                          // Content for even steps (right side)
                          <div className="w-full max-w-md">
                            <div className="text-left">
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Step {index + 1}</h4>
                              <h5 className="text-xl font-semibold text-green-600 mb-3">{step.title}</h5>
                              <p className="text-gray-700 leading-relaxed text-base">{step.description}</p>
                            </div>
                          </div>
                        ) : (
                          // Image for odd steps (right side)
                          <div className="w-80 h-64 rounded-2xl overflow-hidden shadow-xl">
                            <img
                              src={step.image}
                              alt={step.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Mobile Layout - Both on right side */}
                    <div className="md:hidden flex items-start gap-6 pl-16">
                      <motion.div
                        className="flex-1 space-y-4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={processVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                      >
                        {/* Image */}
                        <div className="w-full h-48 rounded-2xl overflow-hidden shadow-lg">
                          <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Content */}
                        <div>
                          <h4 className="mb-2 text-gray-900">Step {index + 1}</h4>
                          <h5 className="mb-3 text-green-600 inline-block relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-[-2px] after:left-0 after:bg-green-600 after:rounded-full">
                            {step.title}
                          </h5>
                          <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Timeline Node */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={processVisible ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.15 }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:block hidden"
                    >
                      <div className="w-4 h-4 bg-[#4CAF50] rounded-full shadow-lg border-4 border-white"></div>
                    </motion.div>

                    {/* Mobile Timeline Node */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={processVisible ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.15 }}
                      className="absolute top-6 left-8 transform -translate-x-1/2 md:hidden block"
                    >
                      <div className="w-4 h-4 bg-[#4CAF50] rounded-full shadow-lg border-4 border-white"></div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px 0px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center gap-4 text-gray-400">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300" />
            <Leaf className="w-6 h-6 text-[#4CAF50]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300" />
          </div>
        </motion.div>
      </section>

      {/* Future Plans Section */}
      <section
        ref={futureRef}
        className="py-24 px-6 bg-gradient-to-br from-[#f8fff8] to-white relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-[#4CAF50]/5 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 bg-[#66BB6A]/3 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={futureVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading">Our Future Plans</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              As SafeHive grows, we aim to go beyond independent research by:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {futurePlans.map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 30 }}
                animate={futureVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                className="text-center p-8 bg-white rounded-3xl shadow-lg border border-[#4CAF50]/10 hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.03, y: -8 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{plan.title}</h4>
                <p className="text-gray-700 leading-relaxed text-base">{plan.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center font-heading">TheSafeHive's Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-justify text-lg leading-relaxed mb-6">
                When I first arrived in the UK, I was struck by exploring the endless number of products claiming to be
                “eco”, “green”, or “safe”. But the more I looked, the more overwhelming it became. Labels were
                confusing, ingredient lists full of jargon, and marketing often designed to mislead rather than inform.
                What should have been a simple choice for my health and my loved ones felt like navigating a chemistry
                lab.
              </p>
              <p className="text-justify">
                And I realised I wasn’t alone. Many people face the same frustration every day, wanting to make healthier choices but 
                getting lost in a maze of misleading claims, vague descriptions, and messy labels. Back home, the problem was even worse. 
                Products that looked trustworthy were still being sold and used despite containing harmful chemicals, 
                leaving families unknowingly exposed to real risks.
              </p>
              <p className="text-justify">
                That’s when I thought: why isn’t there one trusted platform where people can discover products that are genuinely safe, 
                clearly labelled, toxin-free, and backed by transparency? From that question, TheSafeHive was born. 
                More than a marketplace, it’s a movement to cut through the noise, restore trust, and make healthier living 
                simple and accessible for everyone, for ourselves, our families, and even our pets.
              </p>
            </div>
            {/* Founder Quote */}
            <div className="mt-10 p-6 bg-white border-l-4 border-green-500 rounded-lg shadow-md">
              <blockquote className="italic text-gray-800 text-lg">
                "We didn't just want to sell products—we wanted to rebuild trust in everyday choices. Safe Hive is our
                way of helping families feel safe, empowered, and informed."
              </blockquote>
              <p className="mt-2 text-sm text-gray-600 text-right">— TheSafeHive Team</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
