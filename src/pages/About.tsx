// src/pages/About.tsx
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  ShieldCheck,
  Leaf,
  ArrowRight,
  BookOpen,
  HeartHandshake,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";

/** Cloudinary helper: build responsive URLs with f_auto,q_auto and width */
const cld = (publicUrl: string, w: number) => {
  // turns .../upload/... into .../upload/f_auto,q_auto,w_{w}/...
  return publicUrl.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
};

// Responsive, looping, smart video player
const HeroVideo = ({ src }: { src: string }) => {
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  const isDrive = src.includes("drive.google.com");
  const isDirectVideo =
    src.endsWith(".mp4") || src.endsWith(".webm") || src.includes("cloudinary");

  if (isYouTube) {
    const videoId = src.includes("embed")
      ? src.split("/embed/")[1]
      : src.split("youtu.be/")[1]?.split("?")[0] || "";

    return (
      <div className="mt-6 w-full max-w-3xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&playsinline=1&loop=1&playlist=${videoId}`}
          title="YouTube Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }

  if (isDrive) {
    const fileId = src.match(/[-\w]{25,}/)?.[0];
    return (
      <div className="mt-6 w-full max-w-3xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
        <iframe
          className="w-full h-full"
          src={`https://drive.google.com/file/d/${fileId}/preview`}
          allow="autoplay"
          allowFullScreen
          title="Drive Video"
        />
      </div>
    );
  }

  if (isDirectVideo) {
    return (
      <div className="mt-6 w-full max-w-3xl mx-auto">
        <video
          className="w-full h-auto rounded-xl shadow-lg"
          autoPlay
          muted
          controls
          loop
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return null;
};

const About = () => {
  // Original Cloudinary PNG (we’ll serve AVIF/WebP/PNG automatically)
  const HERO_BASE =
    "https://res.cloudinary.com/dwmaznf4n/image/upload/v1752349834/20250712_2047_Harmonious_Nature_Bliss_simple_compose_01k002qpqyf9j8ypjrg10eabrk_tauyp9.png";

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-white overflow-hidden">
        {/* Optimized responsive hero image; not LCP‑critical (H1 is LCP) */}
        <div className="relative">
          <picture>
            {/* AVIF / WebP will be auto via f_auto, but picture keeps old Safari happy if needed */}
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
              className="w-full h-64 sm:h-80 md:h-96 object-cover brightness-95"
              width={1920}
              height={768}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </picture>

          {/* Soft white gradient overlay to improve text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white" />
        </div>

        <div className="container mx-auto px-4 pt-12 pb-6 md:pt-16 md:pb-12 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-4">
            About TheSafeHive
          </h1>

          {/* Video below the H1 so it doesn't interfere with LCP */}
          <HeroVideo src="https://youtu.be/BfHYMjNLj1o" />

          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mt-4">
            We're on a mission to help individuals and families choose harm‑free,
            natural alternatives for everyday life—safe for people, animals, and our planet.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 text-justify">
                At Safe Hive, our mission is to connect consumers with{" "}
                <strong>trusted, natural, and safe chemical products</strong>. We
                understand that in today’s market, it’s not easy to find products you
                can truly trust—labels can be misleading, and harmful ingredients often
                go unnoticed. That’s why we set out with a simple but powerful goal:
                to make it easier for people to choose products that are at least
                somewhat harm‑less, if not entirely safe.
              </p>
              <p className="text-lg text-gray-700 mb-6 text-justify">
                By partnering with ethical brands that prioritize transparency,
                sustainability, and well‑being, we promote health and conscious living
                in everyday life. Our platform offers effortless shopping—label‑clear,
                vibrant choices with zero compromise, just a click away.
              </p>
              <p className="text-lg text-gray-700 text-justify mb-8">
                Beyond products, we’re here to support and educate. Through helpful
                resources, guides, and responsive customer support, we empower shoppers
                to better understand product safety and usage, so they can make
                confident, informed decisions for themselves and their families.
              </p>
              <Link
                to="/blog"
                className="inline-block mt-4 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
              >
                <span className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Learn More in Our Blog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
            </div>

            {/* Values Cards */}
            <div className="bg-yellow-50 p-8 rounded-2xl shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Users className="h-10 w-10 text-green-600 mb-4" />,
                    title: "Community",
                    text:
                      "Building a supportive network of like‑minded individuals committed to chemical‑free living.",
                  },
                  {
                    icon: <Award className="h-10 w-10 text-yellow-600 mb-4" />,
                    title: "Quality & Safety",
                    text:
                      "Setting the highest standards for safety, purity, and effectiveness.",
                  },
                  {
                    icon: <ShieldCheck className="h-10 w-10 text-blue-600 mb-4" />,
                    title: "Transparency",
                    text:
                      "Clear, honest information about every product, ingredient, and process.",
                  },
                  {
                    icon: <Leaf className="h-10 w-10 text-green-600 mb-4" />,
                    title: "Sustainability",
                    text:
                      "Minimizing environmental impact through eco‑friendly practices.",
                  },
                  {
                    icon: <HeartHandshake className="h-10 w-10 text-purple-600 mb-4" />,
                    title: "Trust",
                    text:
                      "Building lasting relationships with customers and partners.",
                  },
                  {
                    icon: <ShoppingCart className="h-10 w-10 text-pink-600 mb-4" />,
                    title: "Accessibility",
                    text:
                      "Making safe, natural products easy to discover and buy.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    {item.icon}
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-700">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
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
                The Safe Hive began with three friends who shared a common frustration:
                shopping for everyday products shouldn't feel like navigating a
                chemistry lab. Tired of misleading labels, hidden toxins, and
                greenwashing, they asked a simple question—why isn't it easier to find
                safe, trustworthy products for our homes and families?
              </p>
              <p className="text-justify">
                What started as casual conversations over coffee turned into a bigger
                mission. Combining their shared passions for health, sustainability,
                and ethical living, they envisioned a platform where transparency was
                the norm, not the exception—and where conscious shopping could be
                effortless, empowering, and even joyful.
              </p>
              <p className="text-justify">
                Together, they built Safe Hive: an online marketplace dedicated to
                natural, harm‑free products with clear labeling, ethical sourcing, and
                zero compromise. From carefully selected brands to helpful guides and
                customer support, every element was designed with trust, safety, and
                simplicity at its core. What began as a personal mission became
                something bigger: a place where people could shop confidently, protect
                their loved ones, and support a healthier planet—all in one hive.
              </p>
            </div>

            {/* Founder Quote */}
            <div className="mt-10 p-6 bg-white border-l-4 border-green-500 rounded-lg shadow-md">
              <blockquote className="italic text-gray-800 text-lg">
                “We didn’t just want to sell products—we wanted to rebuild trust in
                everyday choices. Safe Hive is our way of helping families feel safe,
                empowered, and informed.”
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
