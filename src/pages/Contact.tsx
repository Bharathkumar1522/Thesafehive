/**
 * Contact.tsx — Redesigned to match Home styling.
 * Vanilla/terracotta palette · font-display headlines · ScrollReveal · honest FAQ
 */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { MessageSquare, Send, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { FAQItem } from '../components/ui/FAQItem';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import { TornPaper } from '../components/ui/OrganicSectionDividers';

// ─── Paper texture (replaced with index.css pattern) ────────
const VANILLA = '#FAF5E4';
const SOFT_SAGE = '#C7EABB';
const SOFT_SAND = '#F0E7DB';
const TERRACOTTA = '#B85C38';
const CHARCOAL = '#22211F';
const paperStyle: React.CSSProperties = {};

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_OWNER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_OWNER;
const TEMPLATE_ID_USER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_USER;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ─── FAQ data (verified, aligned with brand) ───────────────────────────────────
const FAQS = [
  {
    question: `When will the SVA-1 verification tool be available?`,
    answer: `TheSafeHive's SVA-1 product verifier is currently in development. You can join the waitlist via this contact form and we will notify you when early access opens.`,
  },
  {
    question: `What does TheSafeHive mean by "lower-risk" products?`,
    answer: `No product is truly "chemical-free" — everything is made of chemicals. TheSafeHive identifies products whose ingredients are not flagged as substances of concern under EU REACH, EWG Skin Deep, or IARC classifications. We say lower-risk, not risk-free.`,
  },
  {
    question: `Is TheSafeHive medical advice?`,
    answer: `No. TheSafeHive is strictly informational. Our assessments are based on publicly available scientific and regulatory sources and are not medical advice, diagnosis, or treatment recommendations. Always consult a qualified health professional.`,
  },
  {
    question: `Can I contribute to your blog?`,
    answer: `Yes — if you have expertise in chemical safety, toxicology, or sustainable living and would like to contribute, please reach out via this form with a short pitch and any relevant writing samples.`,
  },
];

// ─── Field styles (shared) ────────────────────────────────────────────────────
const fieldStyle: React.CSSProperties = {
  background: 'white',
  border: '1px solid rgba(34,33,31,0.10)',
  borderRadius: '0.75rem',
  padding: '0.875rem 1.25rem',
  color: '#22211F',
  fontSize: '0.875rem',
  fontFamily: 'inherit',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s',
};

// ═════════════════════════════════════════════════════════════════════════════
const Contact = () => {
  const [searchParams] = useSearchParams();
  const productQuery = searchParams.get('product');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: productQuery ? 'Waitlist Request' : '',
    message: productQuery ? `I'd like to verify this product: ${productQuery}\n\nPlease add me to the early access waitlist.` : ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID_OWNER, {
        user_name: formData.name, email: formData.email,
        subject: formData.subject, message: formData.message,
      }, PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID_USER, {
        user_name: formData.name, email: formData.email,
      }, PUBLIC_KEY);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="pt-16" style={{ backgroundColor: VANILLA }}>

      {/* ══════════════════ HERO ══════════════════ */}
      <section
        className="relative min-h-[55vh] flex flex-col justify-center items-center overflow-hidden"
        style={{ backgroundColor: VANILLA }}
        aria-label="Contact hero"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(184,92,56,0.05) 0%, transparent 60%)' }}
        />

        <div className="container mx-auto px-6 pt-24 pb-16 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-mono text-[10px] tracking-[0.28em] uppercase mb-6"
            style={{ color: 'rgba(184,92,56,0.5)' }}
          >
            Reach Out
          </motion.p>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: '0%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display leading-none tracking-widest text-charcoal"
              style={{ fontSize: 'clamp(3.5rem,10vw,10rem)' }}
            >
              LET'S <span className="text-terracotta">CONNECT</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="max-w-lg mx-auto font-light leading-relaxed text-lg"
            style={{ color: 'rgba(34,33,31,0.46)' }}
          >
            Have a question about our methodology, a collaboration idea, or simply want to
            learn more about TheSafeHive? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* ── TornPaper: VANILLA → SOFT_SAND ────────── */}
      <TornPaper from={VANILLA} to={SOFT_SAND} height={72} />

      {/* ══════════════════ FORM SECTION ══════════════════ */}
      <section
        id="contact-form"
        className="relative py-24"
        style={{ backgroundColor: SOFT_SAND }}
        aria-label="Contact form"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />

        <div className="container mx-auto px-6 mb-16">
          <div className="flex items-center gap-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.07)' }} />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(184,92,56,0.5)' }}>Contact</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.07)' }} />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Left: info */}
            <ScrollReveal variant="slide-right" className="lg:col-span-2">
              <div className="pt-4">
                <h2
                  className="font-display text-charcoal tracking-widest leading-none mb-6"
                  style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}
                >
                  DROP US<br />A LINE
                </h2>
                <p className="font-light leading-relaxed text-lg mb-12" style={{ color: 'rgba(34,33,31,0.50)' }}>
                  Whether you are seeking clarity on an ingredient, interested in database access,
                  or simply want to say hello — our team is ready to assist.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(34,33,31,0.06)' }}
                    >
                      <MessageSquare className="h-5 w-5 text-charcoal" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-heading text-charcoal text-lg mb-1">Response Time</h3>
                      <p className="font-light text-sm leading-relaxed" style={{ color: 'rgba(34,33,31,0.50)' }}>
                        We aim to reply to all editorial and user inquiries within 24–48 hours on business days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(34,33,31,0.06)' }}
                    >
                      <Instagram className="h-5 w-5 text-charcoal" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-heading text-charcoal text-lg mb-1">Follow the Journey</h3>
                      <a
                        href="https://www.instagram.com/thesafehive"
                        target="_blank" rel="noopener noreferrer"
                        className="font-mono text-sm no-underline transition-colors duration-200"
                        style={{ color: TERRACOTTA }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#A34E2F')}
                        onMouseLeave={e => (e.currentTarget.style.color = TERRACOTTA)}
                      >
                        @thesafehive ↗
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(34,33,31,0.06)' }}
                    >
                      <Linkedin className="h-5 w-5 text-charcoal" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-heading text-charcoal text-lg mb-1">LinkedIn</h3>
                      <a
                        href="https://www.linkedin.com/company/thesafehive"
                        target="_blank" rel="noopener noreferrer"
                        className="font-mono text-sm no-underline transition-colors duration-200"
                        style={{ color: TERRACOTTA }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#A34E2F')}
                        onMouseLeave={e => (e.currentTarget.style.color = TERRACOTTA)}
                      >
                        TheSafeHive ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: form */}
            <ScrollReveal variant="scale" delay={0.1} className="lg:col-span-3">
              <div
                className="bg-white rounded-2xl p-8 md:p-12 border"
                style={{ boxShadow: '0 6px 36px rgba(0,0,0,0.05)', borderColor: 'rgba(34,33,31,0.07)' }}
              >
                <h2
                  className="font-display tracking-widest text-charcoal mb-8"
                  style={{ fontSize: 'clamp(1.5rem,3vw,2.4rem)' }}
                >
                  SEND A MESSAGE
                </h2>

                {submitted && (
                  <div
                    className="rounded-xl px-6 py-4 mb-8 border"
                    style={{ background: 'rgba(184,92,56,0.06)', borderColor: 'rgba(184,92,56,0.18)' }}
                  >
                    <p className="font-mono text-sm" style={{ color: TERRACOTTA }}>✓ Message received — we'll be in touch shortly.</p>
                  </div>
                )}
                {error && (
                  <div className="rounded-xl px-6 py-4 mb-8 border border-red-200 bg-red-50">
                    <p className="text-sm text-red-700 font-light">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                        style={{ color: 'rgba(34,33,31,0.40)' }}
                      >Your Name</label>
                      <input
                        type="text" id="name" name="name"
                        value={formData.name} onChange={handleChange}
                        required style={fieldStyle}
                        onFocus={e => (e.target.style.borderColor = TERRACOTTA)}
                        onBlur={e => (e.target.style.borderColor = 'rgba(34,33,31,0.10)')}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                        style={{ color: 'rgba(34,33,31,0.40)' }}
                      >Your Email</label>
                      <input
                        type="email" id="email" name="email"
                        value={formData.email} onChange={handleChange}
                        required style={fieldStyle}
                        onFocus={e => (e.target.style.borderColor = TERRACOTTA)}
                        onBlur={e => (e.target.style.borderColor = 'rgba(34,33,31,0.10)')}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                      style={{ color: 'rgba(34,33,31,0.40)' }}
                    >Subject</label>
                    <select
                      id="subject" name="subject"
                      value={formData.subject} onChange={handleChange}
                      required
                      style={{ ...fieldStyle, appearance: 'none', cursor: 'pointer' }}
                      onFocus={e => (e.target.style.borderColor = TERRACOTTA)}
                      onBlur={e => (e.target.style.borderColor = 'rgba(34,33,31,0.10)')}
                    >
                      <option value="">Please select a topic</option>
                      <option value="Product Inquiry">Database Inclusion</option>
                      <option value="Wellness Tips">General Inquiry</option>
                      <option value="Collaboration">Partnerships</option>
                      <option value="Other">Press / Media</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
                      style={{ color: 'rgba(34,33,31,0.40)' }}
                    >Message</label>
                    <textarea
                      id="message" name="message"
                      value={formData.message} onChange={handleChange}
                      required rows={5}
                      style={{ ...fieldStyle, resize: 'none', lineHeight: '1.6' }}
                      onFocus={e => (e.target.style.borderColor = TERRACOTTA)}
                      onBlur={e => (e.target.style.borderColor = 'rgba(34,33,31,0.10)')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 font-display tracking-widest text-base px-8 py-4 rounded-full transition-all duration-300 group"
                    style={{ background: TERRACOTTA, color: VANILLA, boxShadow: '0 6px 28px rgba(184,92,56,0.22)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#A34E2F')}
                    onMouseLeave={e => (e.currentTarget.style.background = TERRACOTTA)}
                  >
                    SEND MESSAGE
                    <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── TornPaper: SOFT_SAND → VANILLA ────────── */}
      <TornPaper from={SOFT_SAND} to={VANILLA} height={72} />

      {/* ══════════════════ FAQ SECTION ══════════════════ */}
      <section
        className="relative py-24"
        style={{ backgroundColor: VANILLA }}
        aria-label="Frequently asked questions"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        <div className="container mx-auto px-6 relative z-10">

          <div className="flex items-center gap-6 mb-16">
            <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.07)' }} />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(34,33,31,0.22)' }}>FAQ</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.07)' }} />
          </div>

          <ScrollReveal variant="slide-up">
            <div className="text-center mb-16">
              <h2
                className="font-display text-charcoal tracking-widest leading-none"
                style={{ fontSize: 'clamp(2.4rem,6vw,5rem)' }}
              >
                COMMON <span className="text-terracotta">QUESTIONS</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.08}>
            <div className="max-w-3xl mx-auto space-y-4">
              {FAQS.map((faq, index) => (
                <StaggerItem key={index} variant="slide-up">
                  <div
                    className="bg-white rounded-2xl border overflow-hidden"
                    style={{ borderColor: 'rgba(34,33,31,0.07)', boxShadow: '0 2px 14px rgba(0,0,0,0.03)' }}
                  >
                    <FAQItem
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={activeFaq === index}
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    />
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ── Torn paper: vanilla → soft sage ─────────────── */}
      <TornPaper from={VANILLA} to={SOFT_SAGE} height={72} />

      {/* ══════════════════ CTA ══════════════════ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ backgroundColor: SOFT_SAGE }}
        aria-label="Still have questions"
      >
        <div className="absolute inset-0 pointer-events-none" style={{ ...paperStyle, opacity: 0.5 }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(34,33,31,0.04) 0%, transparent 60%)' }}
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <ScrollReveal variant="fade">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-6"
              style={{ color: 'rgba(34,33,31,0.46)' }}>
              Still have questions?
            </p>
            <h2
              className="font-display tracking-widest leading-none mb-8"
              style={{ fontSize: 'clamp(2.8rem,7vw,6.5rem)', color: CHARCOAL }}
            >
              WE'RE<br /><span style={{ color: 'rgba(34,33,31,0.42)' }}>LISTENING.</span>
            </h2>
            <p className="max-w-md mx-auto font-light leading-relaxed text-lg mb-10"
              style={{ color: 'rgba(34,33,31,0.60)' }}>
              Reach out to us anytime — we're a real team that actually responds.
            </p>
            <a
              href="#contact-form"
              className="inline-flex items-center gap-3 font-display tracking-widest text-lg px-10 py-4 rounded-full border no-underline group transition-all duration-300"
              style={{ borderColor: 'rgba(34,33,31,0.12)', background: TERRACOTTA, color: VANILLA }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#A34E2F';
                e.currentTarget.style.borderColor = '#A34E2F';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = TERRACOTTA;
                e.currentTarget.style.borderColor = 'rgba(34,33,31,0.12)';
              }}
            >
              SEND A MESSAGE <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Torn paper: soft sage → soft sand (Footer transition) ─────────────── */}
      <TornPaper from={SOFT_SAGE} to={SOFT_SAND} height={72} />
    </div>
  );
};

export default Contact;
