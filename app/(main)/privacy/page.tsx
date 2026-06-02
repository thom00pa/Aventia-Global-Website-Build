import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Aventia Global',
  description:
    'Privacy Policy for Aventia Global LLC and its divisions: ' +
    'Aventia Energy, Connect, Store, AI, and Drones. ' +
    'Last updated June 2026.',
  alternates: { canonical: 'https://aventiaglobal.com/privacy' },
}

export default function PrivacyPage() {
  return (
    <div
      style={{
        background: '#FFFFFF',
        minHeight: '100vh',
        paddingTop: '48px',
        paddingBottom: '80px',
      }}
    >
      <div
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <Link
          href="/"
          className="font-sans"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            color: '#2563EB',
            textDecoration: 'none',
            marginBottom: '32px',
            fontWeight: 500,
          }}
        >
          ← Back to Aventia Global
        </Link>

        <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #E2E8F0' }}>
          <p
            className="font-sans"
            style={{
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#2563EB',
              fontWeight: 600,
              marginBottom: '10px',
            }}
          >
            Legal
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 800,
              color: '#0F172A',
              lineHeight: 1.15,
              marginBottom: '12px',
            }}
          >
            Privacy Policy
          </h1>
          <p className="font-sans" style={{ fontSize: '14px', color: '#64748B' }}>
            Last Updated: June 2, 2026 &nbsp;·&nbsp; Aventia Global LLC &nbsp;·&nbsp; Houston, Texas
          </p>
          <div
            className="font-sans"
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: '#FFF7ED',
              border: '1px solid #FED7AA',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#92400E',
            }}
          >
            <strong>Note:</strong> This policy is provided as a starting point and should be reviewed by a qualified
            attorney before relying on it for legal compliance.
          </div>
        </div>

        <div
          style={{
            marginBottom: '40px',
            padding: '20px 24px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
          }}
        >
          <p
            className="font-sans"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              marginBottom: '10px',
            }}
          >
            Contents
          </p>
          <ol
            style={{
              margin: 0,
              padding: '0 0 0 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {[
              ['#intro', '1. Introduction'],
              ['#collect', '2. Information We Collect'],
              ['#use', '3. How We Use Your Information'],
              ['#sharing', '4. Information Sharing'],
              ['#security', '5. Data Security'],
              ['#rights', '6. Your Rights'],
              ['#cookies', '7. Cookies and Local Storage'],
              ['#children', "8. Children's Privacy"],
              ['#texas', '9. Texas Residents'],
              ['#contact', '10. Contact Us'],
              ['#changes', '11. Changes to This Policy'],
            ].map(([href, label]) => (
              <li key={href} className="font-sans" style={{ fontSize: '14px' }}>
                <a href={href} style={{ color: '#2563EB', textDecoration: 'none' }}>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div
          className="font-sans"
          style={{
            fontSize: '16px',
            lineHeight: '1.75',
            color: '#334155',
          }}
        >
          <section id="intro" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              1. Introduction
            </h2>
            <p style={{ marginBottom: '12px' }}>
              Aventia Global LLC (&ldquo;Aventia Global,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is a
              Texas-based technology and services company operating five divisions: Aventia Energy, Aventia Connect,
              Aventia Store, Aventia AI, and Aventia Drones. This Privacy Policy explains how we collect, use,
              disclose, and protect personal information you provide through our websites at aventiaglobal.com and
              its subdomains (energy, connect, store, ai, drones).
            </p>
            <p>
              By using our websites or submitting information through our forms, you agree to the practices described
              in this Privacy Policy.
            </p>
          </section>

          <section id="collect" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              2. Information We Collect
            </h2>
            <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>
              Information You Provide Directly
            </h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>Electricity enrollment (Aventia Energy):</strong> First and last name, email address, phone
                number, Texas ZIP code, service type (residential or commercial), electricity plan preference, and how
                you heard about us.
              </li>
              <li>
                <strong>Commercial quote requests (Aventia Energy):</strong> Business name, contact name, email
                address, phone number, number of electric meters, estimated monthly kWh usage, and project notes.
              </li>
              <li>
                <strong>Project inquiries (Aventia AI):</strong> Company name, contact name, email address, phone
                number, annotation project type, primary language, estimated sample volume, and project description.
              </li>
              <li>
                <strong>Waitlist registrations (Aventia Connect, Store, AI, Drones):</strong> Email address and,
                optionally, your name.
              </li>
            </ul>
            <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>
              Information Collected Automatically
            </h3>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>Language preference:</strong> Stored in a browser cookie and localStorage to remember whether
                you prefer English or Spanish. No personal data is included.
              </li>
              <li>
                <strong>Usage data:</strong> Vercel Analytics collects anonymized page view and performance metrics.
                This data does not include personally identifiable information.
              </li>
            </ul>
          </section>

          <section id="use" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              3. How We Use Your Information
            </h2>
            <p style={{ marginBottom: '12px' }}>We use your personal information to:</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Process and respond to electricity enrollment and service inquiries</li>
              <li>Contact you regarding your submitted requests via email or phone</li>
              <li>Send waitlist updates and launch announcements for coming-soon divisions</li>
              <li>Operate, maintain, and improve our websites and services</li>
              <li>Comply with applicable laws and legal obligations</li>
            </ul>
            <p style={{ marginTop: '16px' }}>
              We do not use your information for automated profiling, targeted advertising, or the sale of data.
            </p>
          </section>

          <section id="sharing" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              4. Information Sharing
            </h2>
            <p style={{ marginBottom: '12px' }}>
              <strong>We do not sell, trade, or rent your personal information.</strong> We may share your information
              only in the following circumstances:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>Service providers:</strong> We use Resend (resend.com) to deliver transactional emails on our
                behalf. Resend receives your email address solely to send messages you initiated.
              </li>
              <li>
                <strong>Electricity providers:</strong> If you complete an electricity enrollment, your contact and
                service information may be shared with the relevant Texas retail electric provider (REP) to process
                your enrollment.
              </li>
              <li>
                <strong>Legal requirements:</strong> We may disclose information when required by law, court order, or
                governmental authority.
              </li>
              <li>
                <strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of all or part of
                our business, your information may be transferred as part of that transaction.
              </li>
            </ul>
          </section>

          <section id="security" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              5. Data Security
            </h2>
            <p>
              We implement industry-standard security measures, including HTTPS/TLS encryption for all data
              transmission and secure server infrastructure provided by Vercel. While we take reasonable precautions to
              protect your information, no method of internet transmission is completely secure. We cannot guarantee
              absolute security of your data.
            </p>
          </section>

          <section id="rights" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              6. Your Rights
            </h2>
            <p style={{ marginBottom: '12px' }}>You have the right to:</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>Access:</strong> Request a copy of the personal information we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or incomplete information.
              </li>
              <li>
                <strong>Deletion:</strong> Request that we delete your personal information, subject to legal
                requirements.
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing emails at any time using the unsubscribe link in
                any email or by contacting us directly.
              </li>
            </ul>
            <p style={{ marginTop: '16px' }}>
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:privacy@aventiaglobal.com" style={{ color: '#2563EB' }}>
                privacy@aventiaglobal.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section id="cookies" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              7. Cookies and Local Storage
            </h2>
            <p style={{ marginBottom: '12px' }}>
              We use a single session cookie and browser localStorage to store your language preference (English or
              Spanish) across pages. This stores only a locale value (&ldquo;en&rdquo; or &ldquo;es&rdquo;) — no personal data.
            </p>
            <p>
              We do not use advertising, tracking, or third-party analytics cookies that collect personally identifiable
              information. You can clear cookies and localStorage at any time through your browser settings without
              affecting site functionality beyond language preference.
            </p>
          </section>

          <section id="children" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              8. Children&apos;s Privacy
            </h2>
            <p>
              Our websites and services are not directed to individuals under the age of 18. We do not knowingly collect
              personal information from children. If you believe a child has submitted personal information to us, please
              contact us at{' '}
              <a href="mailto:privacy@aventiaglobal.com" style={{ color: '#2563EB' }}>
                privacy@aventiaglobal.com
              </a>{' '}
              and we will delete it promptly.
            </p>
          </section>

          <section id="texas" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              9. Texas Residents
            </h2>
            <p>
              Aventia Global LLC is incorporated in and operates from Texas. Your personal information is collected,
              processed, and stored in the United States. Texas residents may have additional rights under the Texas
              Data Privacy and Security Act (TDPSA) and related state regulations. To submit a request under applicable
              Texas privacy law, contact us at{' '}
              <a href="mailto:privacy@aventiaglobal.com" style={{ color: '#2563EB' }}>
                privacy@aventiaglobal.com
              </a>
              .
            </p>
          </section>

          <section id="contact" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              10. Contact Us
            </h2>
            <p>For privacy-related questions, requests, or concerns:</p>
            <div
              style={{
                marginTop: '16px',
                padding: '20px 24px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                lineHeight: '2',
              }}
            >
              <strong>Aventia Global LLC</strong>
              <br />
              Houston, Texas, USA
              <br />
              Email:{' '}
              <a href="mailto:privacy@aventiaglobal.com" style={{ color: '#2563EB' }}>
                privacy@aventiaglobal.com
              </a>
              <br />
              Web:{' '}
              <a href="https://aventiaglobal.com" style={{ color: '#2563EB' }}>
                aventiaglobal.com
              </a>
            </div>
            <p style={{ marginTop: '16px', fontSize: '14px', color: '#64748B' }}>
              Bilingual support available — respondemos en inglés y español.
            </p>
          </section>

          <section id="changes" style={{ marginBottom: '48px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              11. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices, services, or applicable
              law. We will indicate the revision date at the top of this page. We encourage you to review this policy
              whenever you use our services. Continued use of our services after changes are posted constitutes acceptance
              of the updated policy.
            </p>
          </section>

          <div
            style={{
              paddingTop: '32px',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <Link href="/" className="font-sans" style={{ fontSize: '14px', color: '#2563EB', textDecoration: 'none' }}>
              ← Back to Aventia Global
            </Link>
            <Link href="/terms" className="font-sans" style={{ fontSize: '14px', color: '#2563EB', textDecoration: 'none' }}>
              Terms of Service →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
