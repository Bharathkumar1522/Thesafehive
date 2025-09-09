import { useState } from 'react';
import emailjs from "@emailjs/browser";
import { Mail, MessageSquare, Send } from 'lucide-react';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_OWNER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_OWNER;
const TEMPLATE_ID_USER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_USER;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const templateParamsOwner = {
      user_name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    const templateParamsUser = {
      user_name: formData.name,
      email: formData.email,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID_OWNER, templateParamsOwner, PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID_USER, templateParamsUser, PUBLIC_KEY);

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Email sending failed:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-lg text-gray-700">
              Have a question or want to learn more about TheSafeHive? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
              {/* Contact Info */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                <p className="text-gray-700 mb-8">
                  We're here to answer any questions you might have about our mission, or chemical-free living in general, or anything about us.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Email Us</h3>
                      <p className="text-gray-700">thesafehive2025@gmail.com</p>
                      <p className="text-gray-600 text-sm mt-1">We'll respond within 24–48 hours. Thank you for your patience.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Follow Us</h3>
                      <div className="mt-2 space-y-1">
                        <a href="#" className="block text-green-600 hover:text-green-700 transition-colors">Instagram</a>
                       {/* <a href="#" className="block text-green-600 hover:text-green-700 transition-colors">Facebook</a> */}
                      {/*  <a href="#" className="block text-green-600 hover:text-green-700 transition-colors">Twitter</a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              {/* Contact Form */}
              <div className="md:col-span-3 bg-gray-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

                {submitted && (
                  <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
                    <p className="font-medium">Thank you for your message!</p>
                    <p>We'll get back to you as soon as possible.</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                    <p className="font-medium">Error</p>
                    <p>{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="">Please select</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Wellness Tips">Wellness Tips</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-xl text-gray-900 mb-2">When will your products be available?</h3>
                <p className="text-gray-700">
                  We're currently curating and testing products that meet our standards. Sign up for our newsletter to be the first to know when they launch!
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-xl text-gray-900 mb-2">What makes a product "chemical-free"?</h3>
                <p className="text-gray-700">
                  We use "chemical-free" to describe products free from synthetic, harmful chemicals like parabens, phthalates, and artificial fragrances.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Do you offer consultations?</h3>
                <p className="text-gray-700">
                  Not at the moment, but we may add personalized consultations soon. For now, check out our blog!
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Can I contribute to your blog?</h3>
                <p className="text-gray-700">
                  Absolutely! If you're passionate about clean living and have writing samples, reach out to us via this form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
