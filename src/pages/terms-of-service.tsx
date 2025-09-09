// src/pages/TermsOfService.tsx
import React from "react";

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-2xl font-semibold mb-6 text-center">Terms of Service – The SafeHive</h1>

      <section className="mb-5">
        <h2 className="text-lg font-medium mb-1">1. Use of Website</h2>
        <p>
          The SafeHive provides a platform for sharing content related to healthy, natural, and harm-free living.
          You agree to use the site for personal, lawful, and non-commercial purposes. You must not misuse,
          disrupt, or attempt to interfere with the functionality or security of the site. Use of this website must
          comply with all applicable laws and these Terms.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-lg font-medium mb-1">2. No Commercial Transactions</h2>
        <p>
          The SafeHive does not sell or promote any products or services. This website is purely informational and
          offers general awareness content with a contact form for inquiries. No financial transactions or commercial
          activities take place through this site.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-lg font-medium mb-1">3. Contact Form Usage</h2>
        <p>
          You may voluntarily submit your name, email, subject, and message through our contact form. You agree not to
          submit spam, offensive, illegal, or malicious content. Submissions are subject to moderation and may be
          deleted if inappropriate.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-lg font-medium mb-1">4. Intellectual Property</h2>
        <p>
          All original content on this site—including text, branding, blog posts, and certain AI-generated visuals—is
          the property of The SafeHive or used under proper license. You may share content for personal or educational
          purposes with credit, but you may not reuse it commercially, misrepresent it, or modify it without permission.
          The SafeHive is not responsible for how its content is used or misused outside of this website.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-lg font-medium mb-1">5. Prohibited Use</h2>
        <p>
          You must not engage in activities that harm the website or its users. This includes spamming, hacking,
          attempting unauthorized access, impersonation, or posting unlawful, hateful, or misleading content.
          Violations may result in access restrictions and legal action.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-lg font-medium mb-1">6. Jurisdiction and Legal Framework</h2>
        <p className="mb-2">These Terms are governed by the laws of the following jurisdictions based on user location:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>United Kingdom:</strong> Consumer Rights Act 2015, UK GDPR</li>
          <li><strong>European Union:</strong> General Data Protection Regulation (EU GDPR)</li>
          <li><strong>India:</strong> Information Technology Act, 2000 and Digital Personal Data Protection Act (DPDPA) 2023</li>
        </ul>
      </section>

      <section className="mb-5">
        <h2 className="text-lg font-medium mb-1">7. Consent and Agreement</h2>
        <p>
          By using this website and submitting the contact form, you confirm that you have read and agreed to these
          Terms of Service and our{" "}
          <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a>. Continued use of the site
          after updates to these terms implies acceptance of the changes.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-1">8. Contact</h2>
        <p>
          For any questions regarding these Terms of Service, please contact us.<br />
        </p>
      </section>
    </div>
  );
}
