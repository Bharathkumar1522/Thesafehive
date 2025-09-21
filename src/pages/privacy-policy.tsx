import LegalPage from "../components/layout/LegalPage";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy – The SafeHive"
      toc={[
        { label: "1. Introduction", href: "#introduction" },
        { label: "2. Data We Collect", href: "#data-we-collect" },
        { label: "3. Purpose of Collection", href: "#purpose-of-collection" },
        { label: "4. Legal Basis", href: "#legal-basis" },
        { label: "5. Storage & Security", href: "#storage-and-security" },
        { label: "6. Your Rights", href: "#your-rights" },
        { label: "7. Retention", href: "#retention" },
        { label: "8. Third Parties", href: "#third-parties" },
        { label: "9. Cross-Border Transfers", href: "#cross-border-transfers" },
        { label: "10. Breach Notification", href: "#breach-notification" },
        { label: "11. Region-Specific Rights", href: "#region-specific-rights" },
        { label: "12. Blog and Health Disclaimer", href: "#blog-and-health-disclaimer" },
        { label: "13. Contact", href: "#contact" },
      ]}
    >
      <section className="mb-8">
        <h2 id="introduction" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">1. Introduction</h2>
        <p>
          At The SafeHive, we take your privacy seriously. This Privacy Policy outlines how we collect, use, store, and protect your personal data when you use our website. We operate in compliance with the UK General Data Protection Regulation (UK GDPR), the EU General Data Protection Regulation (EU GDPR), and the Indian Digital Personal Data Protection Act (DPDPA) 2023.
        </p>
      </section>

      <section className="mb-8">
        <h2 id="data-we-collect" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">2. Data We Collect</h2>
        <p>
          We collect personal data when you interact with our contact form. This includes your name, email address, subject, and message. We may also collect non-identifiable data such as IP address and browser type through analytics tools for performance monitoring.
        </p>
      </section>

      <section className="mb-8">
        <h2 id="purpose-of-collection" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">3. Purpose of Collection</h2>
        <p>
          Your data is collected to respond to inquiries, improve communication, monitor website performance, and comply with legal requirements.
        </p>
      </section>

      <section className="mb-8">
        <h2 id="legal-basis" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">4. Legal Basis</h2>
        <p>
          We process your personal data under the following legal bases: Consent when you voluntarily submit your data, Legitimate Interests for communication and performance analysis, and Legal Obligation when required by law. These practices comply with UK GDPR, EU GDPR, and DPDPA 2023.
        </p>
      </section>

      <section className="mb-8">
        <h2 id="storage-and-security" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">5. Storage & Security</h2>
        <p>
          We apply security best practices to protect your data, including SSL encryption, access restrictions, and the use of secure third-party tools (e.g., FormSubmit, EmailJS). Access to your data is limited to authorized personnel only.
        </p>
      </section>

      <section className="mb-8">
        <h2 id="your-rights" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">6. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your data at any time. You can also withdraw your consent for data processing. We honor data rights as per applicable laws in your region.
        </p>
      </section>

      <section className="mb-8">
        <h2 id="retention" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">7. Retention</h2>
        <p>
          Contact form submissions are stored securely for up to 12 months unless deletion is requested earlier. Analytics data may be retained in anonymized form for up to 26 months.
        </p>
      </section>

      <section className="mb-8">
        <h2 id="third-parties" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">8. Third Parties</h2>
        <p>
          We do not sell or share your personal data. We use trusted, secure tools like FormSubmit and EmailJS to deliver contact form messages. These providers are compliant with data protection regulations.
        </p>
      </section>

      <section className="mb-8">
        <h2 id="cross-border-transfers" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">9. Cross-Border Transfers</h2>
        <p>
          Your data may be processed in countries outside your own. We use Standard Contractual Clauses (SCCs) for UK/EU data transfers and ensure compliance with DPDPA 2023 for Indian users. All transfers are done with appropriate safeguards.
        </p>
      </section>

      <section className="mb-8">
        <h2 id="breach-notification" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">10. Breach Notification</h2>
        <p>
          In the event of a data breach, we will notify affected users within 72 hours and report to the relevant authorities (ICO, EU data regulators, or India's Data Protection Board). We will also take immediate action to mitigate the breach.
        </p>
      </section>

      <section className="mb-8">
        <h2 id="region-specific-rights" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">11. Region-Specific Rights</h2>
        <p className="mb-2">
          <strong>UK & EU Residents:</strong> Under UK and EU GDPR, you have the right to access, correct, delete, restrict or object to processing of your data, withdraw consent, and lodge complaints with your local Data Protection Authority.
        </p>
        <p>
          <strong>Indian Residents:</strong> Under DPDPA 2023, you have the right to be informed about data use, to correct or erase your personal data, to withdraw consent, and to raise grievances with the Data Protection Board of India.
        </p>
      </section>

      <section className="mb-8">
        <h2 id="blog-and-health-disclaimer" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">12. Blog and Health Disclaimer</h2>
        <p>
          All content on The SafeHive blog is for informational purposes only. It is not a substitute for professional medical advice. Please consult a licensed healthcare provider before making health-related decisions.
        </p>
      </section>

      <section className="mt-8">
        <h2 id="contact" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">13. Contact</h2>
        <p>
          For any questions, concerns, or to exercise your privacy rights, please contact us at: <br />
          <strong>Email:</strong> thesafehive2025@gmail.com
        </p>
      </section>
    </LegalPage>
  );
}
