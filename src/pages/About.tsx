import { useEffect, useMemo, useRef, useState } from "react";
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
  ScanText,
  FileSearch,
  Activity,
  Scale,
  ShieldAlert,
  Fingerprint,
  CheckCircle2,
  Users,
  HeartHandshake,
  ClipboardCheck,
  BadgeCheck,
} from "lucide-react";
import { CoreValuesGrid } from "../components/ui/CoreValueCard";

/** Cloudinary helper: build responsive URLs with f_auto,q_auto and width */
const cld = (publicUrl: string, w: number) =>
  publicUrl.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);

type LucideIcon = React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const SectionHeader = ({
  title,
  highlight,
  subtitle,
}: {
  title: string;
  highlight?: string;
  subtitle?: string;
}) => (
  <div className="text-center mb-12 md:mb-16">
    <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
      {title} {highlight ? <span className="text-green-600">{highlight}</span> : null}
    </h2>
    {subtitle ? (
      <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">{subtitle}</p>
    ) : null}
  </div>
);

/** ---- Mission/Vision (inlined) ---- */
const Mission = () => {
  const missionPoints: Array<{ icon: LucideIcon; title: string; description: string }> = [
    {
      icon: Target,
      title: "Clear Safety Decisions",
      description:
        "TheSafeHive translates complex chemical and ingredient data into clear, structured signals that help people make safer everyday choices with confidence.",
    },
    {
      icon: ShieldCheck,
      title: "Evidence-Led Verification",
      description:
        "TheSafeHive assesses ingredients using publicly available scientific and regulatory sources, prioritising evidence over marketing claims.",
    },
    {
      icon: ShoppingBag,
      title: "Practical Application",
      description:
        "TheSafeHive demonstrates how safety intelligence can be applied in real purchasing decisions, reducing confusion and decision fatigue.",
    },
    {
      icon: GraduationCap,
      title: "Education and Transparency",
      description:
        "TheSafeHive helps people understand what’s inside products, why ingredients matter, and where scientific certainty or uncertainty exists.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="mission-heading">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeader
            title="Discover Our"
            highlight="Vision"
            subtitle="TheSafeHive exists to bridge the gap between complex chemical safety data and everyday consumer decisions."
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {missionPoints.map((point, index) => (
            <motion.article
              key={point.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 md:p-8 border border-green-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
                  <point.icon className="w-6 h-6 md:w-7 md:h-7 text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{point.title}</h3>
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
/** ---- End Mission/Vision ---- */

const About = () => {
  const HERO_BASE =
    "https://res.cloudinary.com/dwmaznf4n/image/upload/v1752349834/20250712_2047_Harmonious_Nature_Bliss_simple_compose_01k002qpqyf9j8ypjrg10eabrk_tauyp9.png";

  const svaRef = useRef<HTMLElement>(null);
  const customerRef = useRef<HTMLElement>(null);
  const futureRef = useRef<HTMLElement>(null);

  const [svaVisible, setSvaVisible] = useState(false);
  const [customerVisible, setCustomerVisible] = useState(false);
  const [futureVisible, setFutureVisible] = useState(false);

  useEffect(() => {
    const makeObserver = (setter: (v: boolean) => void) =>
      new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setter(true),
        { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
      );

    const sObs = makeObserver(setSvaVisible);
    const cObs = makeObserver(setCustomerVisible);
    const fObs = makeObserver(setFutureVisible);

    if (svaRef.current) sObs.observe(svaRef.current);
    if (customerRef.current) cObs.observe(customerRef.current);
    if (futureRef.current) fObs.observe(futureRef.current);

    return () => {
      sObs.disconnect();
      cObs.disconnect();
      fObs.disconnect();
    };
  }, []);

  const futurePlans = useMemo(
    () => [
      {
        icon: Building,
        title: "Brand-Level Collaboration",
        description:
          "TheSafeHive works with transparent brands to improve ingredient disclosure and formulation accountability.",
      },
      {
        icon: Microscope,
        title: "Selective Lab Validation",
        description:
          "TheSafeHive introduces targeted third-party testing to calibrate and strengthen verification logic.",
      },
      {
        icon: TrendingUp,
        title: "Compliance Infrastructure",
        description:
          "TheSafeHive supports safety and regulatory workflows in a tightening chemical compliance environment.",
      },
    ],
    []
  );

  const svaArchitecture = useMemo(
    () => [
      {
        step: "1",
        icon: ScanText,
        title: "Ingredient Intelligence",
        description:
          "Product labels and supplier information are complex and inconsistent. TheSafeHive transforms raw ingredient data into a clean, standardised format so every product is evaluated on the same basis, without relying on marketing claims.",
      },
      {
        step: "2",
        icon: FileSearch,
        title: "Evidence-Backed Safety Signals",
        description:
          "Safety claims should be backed by science. TheSafeHive references authoritative regulatory and scientific sources to identify known safety concerns, emerging risks, and areas where evidence is limited. Every insight is grounded in traceable public data, not opinions.",
      },
      {
        step: "3",
        icon: Scale,
        title: "Safety Scoring You Can Rely On",
        description:
          "Using TheSafeHive’s proprietary evaluation framework, each product is assessed for potential concern levels based on current scientific and regulatory understanding. Where data is incomplete, uncertainty is clearly highlighted rather than hidden.",
      },
      {
        step: "4",
        icon: Activity,
        title: "Always Up to Date",
        description:
          "Safety information changes over time. When new research or regulatory updates emerge, relevant products are automatically reviewed so assessments stay current.",
      },
      {
        step: "5",
        icon: Fingerprint,
        title: "Personalised, Informational Clarity",
        description:
          "Everyone’s needs are different. TheSafeHive allows you to view safety information through your own preferences, such as avoiding specific ingredient groups - while remaining strictly informational and non-medical.",
      },
    ],
    []
  );

  const customerPromise = useMemo(
    () => [
      {
        icon: CheckCircle2,
        title: "The End of Decision Fatigue",
        description:
          "You shouldn't need a PhD in Toxicology to buy shampoo. TheSafeHive SVA-1 algorithm does the heavy lifting by scanning thousands of ingredients against 50+ databases, so you get a simple Yes or No.",
      },
      {
        icon: ClipboardCheck,
        title: "Physical Integrity Audit",
        description:
          "An algorithm can detect toxins, but it cannot verify product quality. That is why every product that passes TheSafeHive digital screening undergoes a physical Golden Sample check. TheSafeHive verifies the product in the box matches the safety data on the screen, reducing formulation mismatch risk.",
      },
      {
        icon: BadgeCheck,
        title: "No Fear Mongering, Just Facts",
        description:
          "TheSafeHive does not use scary marketing like Chemical-Free (which is impossible). TheSafeHive uses data. TheSafeHive tells you what is in a product, why it is safe, and where the evidence comes from. Transparency is the ultimate trust.",
      },
      {
        icon: Users,
        title: "Community-Led Validation",
        description:
          "TheSafeHive Verified Marketplace is not just an algorithm output. It is a community choice. TheSafeHive listens to feedback from families, parents, and eco-conscious shoppers to continuously refine what Safe means in the real world.",
      },
    ],
    []
  );

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-50 to-white overflow-hidden" aria-labelledby="hero-heading">
        <div className="relative">
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
              sizes="100vw"
              alt="Nature inspired calm background"
              className="w-full h-80 sm:h-[32rem] md:h-[40rem] object-cover brightness-95"
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
            />
          </picture>

          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="max-w-3xl text-center text-white"
            >
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed font-medium">
                “We didn’t just want to sell products - we wanted to make chemical safety understandable, usable, and trustworthy.”
              </p>
              <footer className="mt-6 text-base sm:text-lg">- TheSafeHive team</footer>
            </motion.blockquote>
          </div>
        </div>

        {/* Intro */}
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-gray-900">
            About <span className="text-green-600">TheSafeHive</span>
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-gray-700">
            TheSafeHive is a compliance-first technology platform building the digital infrastructure for the post-PFAS era.
          </p>
          <p className="mt-3 max-w-3xl mx-auto text-sm text-gray-600">
            Note: TheSafeHive content and assessments are educational and not medical advice.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-4 text-gray-400">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300" />
              <Leaf className="w-6 h-6 text-green-600" aria-hidden="true" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <Mission />

      {/* Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <SectionHeader
            title="Our"
            highlight="Values"
            subtitle="Principles that guide TheSafeHive verification-first approach."
          />
          <CoreValuesGrid values={coreValues} />
        </div>
      </section>

      {/* How We Compute Safety: The SVA-1 Architecture */}
      <section ref={svaRef} className="py-16 md:py-24 px-4 bg-white" aria-labelledby="sva-heading">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={svaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              title="How We Compute Safety"
              highlight="The SVA-1 Architecture"
              subtitle="TTheSafeHive runs an automated, auditable compliance pipeline. SVA-1 combines AI-assisted processing with defined evaluation rules to assess product safety consistently."
            />
          </motion.div>

          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {svaArchitecture.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                animate={svaVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.12 + i * 0.08 }}
                className="bg-gray-50 p-6 md:p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1">
                    Stage {item.step}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-700 leading-relaxed">{item.description}</p>
              </motion.article>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-10 bg-green-50 border border-green-100 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-green-600 mt-0.5" aria-hidden="true" />
              <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <p className="font-semibold text-gray-900">Non-medical boundary</p>
                <p className="mt-1">
                  TheSafeHive scoring and personalisation are strictly informational. TheSafeHive does not provide medical advice, diagnosis, or treatment.
                  Where evidence is incomplete, TheSafeHive highlights uncertainty and applies precautionary logic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What This Means For You */}
      <section
        ref={customerRef}
        className="py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 to-white"
        aria-labelledby="customer-heading"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={customerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              title="What This Means For You"
              highlight="The Customer View"
              subtitle="Technology is our engine, but safety is our destination. We built TheSafeHive because we were tired of being confused in the supermarket aisle."
            />
          </motion.div>

          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6 md:gap-8">
            {customerPromise.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                animate={customerVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.12 + i * 0.08 }}
                className="bg-white p-6 md:p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-700 leading-relaxed">{item.description}</p>
              </motion.article>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-10 bg-green-50 border border-green-100 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <HeartHandshake className="w-6 h-6 text-green-600 mt-0.5" aria-hidden="true" />
              <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <p className="font-semibold text-gray-900">TheSafeHive promise</p>
                <p className="mt-1">
                  TheSafeHive is building a verified marketplace grounded in evidence, transparency, and community feedback. TheSafeHive is not here to scare you.
                  TheSafeHive is here to give you clarity you can trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Plans */}
      <section ref={futureRef} className="py-16 md:py-24 px-4 bg-white" aria-labelledby="future-heading">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={futureVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              title="Looking"
              highlight="Ahead"
              subtitle="As TheSafeHive evolves, TheSafeHive aims to expand safety intelligence capabilities through:"
            />
          </motion.div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
            {futurePlans.map((plan, i) => (
              <motion.article
                key={plan.title}
                initial={{ opacity: 0, y: 16 }}
                animate={futureVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                className="bg-gray-50 p-7 md:p-8 rounded-3xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-green-600 rounded-2xl flex items-center justify-center">
                  <plan.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">{plan.title}</h3>
                <p className="text-gray-700 leading-relaxed">{plan.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* TheSafeHive story (below Looking Ahead) */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="TheSafeHive" highlight="story" />

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-justify">
                The SafeHive was born to solve a data problem. The £14B personal care market lacks a unified safety standard.
                We built the SafeHive Protocol to bridge the gap between complex chemical data and consumer buying decisions.
              </p>

              <p className="text-justify">
                When I first arrived in the UK, I was struck by the sheer number of products claiming to be “eco”, “green”,
                or “safe”. But the more I looked, the more overwhelming it became. Labels were confusing, ingredient lists
                were full of jargon, and marketing was often designed to reassure without evidence.
              </p>

              <p className="text-justify">
                I realised I wasn’t alone. Many people want to make healthier choices, but they get stuck in a maze of
                vague claims, inconsistent ingredient disclosures, and decision fatigue. TheSafeHive exists to cut through the noise
                and make chemical safety easier to understand, easier to compare, and easier to act on.
              </p>
            </div>

            <div className="mt-10 p-6 bg-white border-l-4 border-green-600 rounded-xl shadow-sm">
              <blockquote className="italic text-gray-900 text-base sm:text-lg">
                "TheSafeHive turns chemical safety into clear, usable decisions."
              </blockquote>
              <p className="mt-2 text-sm text-gray-600 text-right">- TheSafeHive team</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
