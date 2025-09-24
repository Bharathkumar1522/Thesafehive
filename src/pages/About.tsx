import { motion } from "framer-motion";
import { CoreValuesGrid } from "../components/ui/CoreValueCard";
import { Mission } from "../components/layout/Mission";
import HeroVideo from "../components/HeroVideo";
import { coreValues } from "../data/values";
import { Leaf } from "lucide-react";

/** Cloudinary helper: build responsive URLs with f_auto,q_auto and width */
const cld = (publicUrl: string, w: number) => {
  // turns .../upload/... into .../upload/f_auto,q_auto,w_{w}/...
  return publicUrl.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
};

const About = () => {
  // Original Cloudinary PNG (we'll serve AVIF/WebP/PNG automatically)
  const HERO_BASE =
    "https://res.cloudinary.com/dwmaznf4n/image/upload/v1752349834/20250712_2047_Harmonious_Nature_Bliss_simple_compose_01k002qpqyf9j8ypjrg10eabrk_tauyp9.png";

  return (
    <div className="pt-16">
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
          <div
            className="absolute inset-0 bg-black/40"
            aria-hidden="true"
          />

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
                duration: 1.5,
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
                  "We didn't just want to sell products—we wanted to rebuild trust in
                  everyday choices. Safe Hive is our way of helping families feel
                  safe, empowered, and informed."
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
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-4">
            About TheSafeHive
          </h1>

          {/* Video below the H1 so it doesn't interfere with LCP */}
          <HeroVideo src="https://youtu.be/BfHYMjNLj1o" />

          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mt-4">
            We're on a mission to help individuals and families choose harm‑free,
            natural alternatives for everyday life—safe for people, animals, and our
            planet.
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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-700">
              These core principles guide everything we do at Safe Hive
            </p>
          </div>
          <CoreValuesGrid values={coreValues} />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-justify">
                The Safe Hive began with three friends who shared a common
                frustration: shopping for everyday products shouldn't feel like
                navigating a chemistry lab. Tired of misleading labels, hidden
                toxins, and greenwashing, they asked a simple question—why isn't it
                easier to find safe, trustworthy products for our homes and
                families?
              </p>
              <p className="text-justify">
                What started as casual conversations over coffee turned into a
                bigger mission. Combining their shared passions for health,
                sustainability, and ethical living, they envisioned a platform
                where transparency was the norm, not the exception—and where
                conscious shopping could be effortless, empowering, and even
                joyful.
              </p>
              <p className="text-justify">
                Together, they built Safe Hive: an online marketplace dedicated to
                natural, harm‑free products with clear labeling, ethical sourcing,
                and zero compromise. From carefully selected brands to helpful
                guides and customer support, every element was designed with trust,
                safety, and simplicity at its core. What began as a personal
                mission became something bigger: a place where people could shop
                confidently, protect their loved ones, and support a healthier
                planet—all in one hive.
              </p>
            </div>

            {/* Founder Quote */}
            {/* <div className="mt-10 p-6 bg-white border-l-4 border-green-500 rounded-lg shadow-md">
              <blockquote className="italic text-gray-800 text-lg">
                "We didn't just want to sell products—we wanted to rebuild trust in
                everyday choices. Safe Hive is our way of helping families feel
                safe, empowered, and informed."
              </blockquote>
              <p className="mt-2 text-sm text-gray-600 text-right">
                — TheSafeHive Team
              </p>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
