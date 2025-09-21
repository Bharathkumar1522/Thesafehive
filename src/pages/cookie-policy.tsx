import LegalPage from "../components/LegalPage";

export default function CookiePolicy() {
  return (
    <LegalPage
      title="Cookie Policy – The SafeHive"
      toc={[
        { label: "1. Purpose and Scope", href: "#purpose-and-scope" },
        { label: "2. Consent Requirements", href: "#consent-requirements" },
        { label: "3. Cookie Banner & Access", href: "#cookie-banner-and-access" },
        { label: "4. What We Collect via Cookies", href: "#what-we-collect" },
        { label: "5. Managing Cookies", href: "#managing-cookies" },
        { label: "6. Record-Keeping and Compliance", href: "#record-keeping" },
        { label: "7. India-Specific Compliance (DPDPA 2023)", href: "#india-specific" },
      ]}
    >
      <section className="mb-8">
        <h2 id="purpose-and-scope" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">1. Purpose and Scope</h2>
        <p>
          The SafeHive uses cookies and similar technologies to ensure a smooth and secure browsing experience,
          understand how visitors interact with our content, and make ongoing improvements to our website. Cookies are
          small files stored on your device that may be essential to site operation or optional depending on their use.
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li><strong>Essential Cookies</strong> – Necessary for core site functionality and security.</li>
          <li><strong>Non-Essential Cookies</strong> – Used for analytics, preferences, and performance insights. These require your consent.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 id="consent-requirements" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">2. Consent Requirements</h2>
        <p>We follow a consent-first approach in line with GDPR and DPDPA compliance.</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Non-essential cookies are only set after you provide explicit opt-in consent.</li>
          <li>You may choose to accept all, reject all, or manage preferences by category.</li>
          <li>No pre-selected options are used—your consent must be freely given.</li>
          <li>You can update or withdraw consent at any time via the <strong>Cookie Settings</strong> link in the website footer.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 id="cookie-banner-and-access" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">3. Cookie Banner & Access</h2>
        <p>
          On your first visit, a cookie banner will appear to inform you about our cookie usage. It links directly to
          this Cookie Policy and our {" "}
          <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a>. The banner allows you to
          make informed choices about your cookie preferences.
        </p>
      </section>

      <section className="mb-8">
        <h2 id="what-we-collect" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">4. What We Collect via Cookies</h2>
        <p>Depending on your consent, the following data may be collected:</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li><strong>Essential Cookies</strong> – Session state, form security, load balancing, and preference storage (e.g., your cookie choice).</li>
          <li><strong>Functional Cookies</strong> – Language preferences, region selection, and accessibility settings.</li>
          <li><strong>Analytics Cookies</strong> – Anonymized usage statistics such as page views, bounce rates, and traffic sources (e.g., via Google Analytics).</li>
        </ul>
        <p className="mt-3">
          If you decline non-essential cookies, essential cookies will still function to support website safety and accessibility,
          but no tracking or analytics will be performed.
        </p>
      </section>

      <section className="mb-8">
        <h2 id="managing-cookies" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">5. Managing Cookies</h2>
        <p>You have full control over your cookie preferences:</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Adjust settings anytime via the on-site <strong>Cookie Settings</strong> link.</li>
          <li>Use your browser’s settings to block, delete, or restrict cookies.</li>
          <li>Note: Disabling certain cookies may impact site performance or accessibility.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 id="record-keeping" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">6. Record-Keeping and Compliance</h2>
        <p>
          To comply with UK GDPR, EU GDPR, and India’s DPDPA 2023, we securely log and retain your cookie consent
          choices. This includes:
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Consent status (accepted, rejected, customized)</li>
          <li>Timestamp of action</li>
          <li>Browser and device type</li>
          <li>IP address (anonymized where applicable)</li>
        </ul>
        <p className="mt-3">These records are used solely for legal compliance and not for tracking or profiling.</p>
      </section>

      <section>
        <h2 id="india-specific" className="scroll-mt-24 text-xl font-semibold text-gray-900 mb-2">7. India-Specific Compliance (DPDPA 2023)</h2>
        <p>
          As per the Digital Personal Data Protection Act 2023, any cookies that process personal data for Indian users—
          such as IP addresses, device IDs, or behavioral data—require informed user consent. We ensure that:
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Such data is not collected unless explicitly permitted.</li>
          <li>All processing is limited to the purpose shared at the time of consent.</li>
          <li>Users can withdraw cookie consent and request erasure of collected data at any time.</li>
        </ul>
      </section>
    </LegalPage>
  );
}
