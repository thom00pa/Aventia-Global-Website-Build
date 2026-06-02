import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Aventia Global',
  description:
    'Terms of Service for Aventia Global LLC and its divisions. ' +
    'Governs use of aventiaglobal.com and its subdomains. ' +
    'Governed by Texas law.',
  alternates: { canonical: 'https://aventiaglobal.com/terms' },
}

export default function TermsPage() {
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
            Terms of Service
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
            <strong>Note:</strong> These Terms should be reviewed by a qualified attorney before publication and reliance
            for legal compliance.
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
              ['#acceptance', '1. Acceptance of Terms'],
              ['#services', '2. Description of Services'],
              ['#enrollment', '3. Enrollment and Referrals'],
              ['#accuracy', '4. Accuracy of Information'],
              ['#conduct', '5. User Conduct'],
              ['#ip', '6. Intellectual Property'],
              ['#warranties', '7. Disclaimer of Warranties'],
              ['#liability', '8. Limitation of Liability'],
              ['#law', '9. Governing Law'],
              ['#changes-t', '10. Changes to Terms'],
              ['#contact-t', '11. Contact'],
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
          <section id="acceptance" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using any website operated by Aventia Global LLC — including aventiaglobal.com,
              energy.aventiaglobal.com, connect.aventiaglobal.com, store.aventiaglobal.com, ai.aventiaglobal.com, and
              drones.aventiaglobal.com (collectively, the &ldquo;Sites&rdquo;) — you agree to be bound by these Terms of
              Service (&ldquo;Terms&rdquo;). If you do not agree to all Terms, please do not use our Sites or submit any
              information through our forms.
            </p>
          </section>

          <section id="services" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              2. Description of Services
            </h2>
            <p style={{ marginBottom: '12px' }}>Aventia Global LLC operates the following divisions:</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <strong>Aventia Energy</strong> (energy.aventiaglobal.com): Aventia Energy acts as a retail electricity
                broker in Texas, helping residential and commercial customers compare and enroll in electricity plans
                offered by licensed retail electric providers (REPs). Aventia Energy does not generate or supply
                electricity directly. Electricity rates advertised are for illustrative reference and are subject to
                change. Actual rates depend on the selected REP, service zone, contract terms, and market conditions.
              </li>
              <li>
                <strong>Aventia Connect</strong> (connect.aventiaglobal.com): Currently in development. The site is
                provided for informational and waitlist-registration purposes only. No internet or WiFi services are
                currently offered or contracted through this site.
              </li>
              <li>
                <strong>Aventia Store</strong> (store.aventiaglobal.com): Currently in development. Product listings and
                descriptions are preview information only. No purchases can be made at this time.
              </li>
              <li>
                <strong>Aventia AI</strong> (ai.aventiaglobal.com): Currently in development. Project inquiry submissions
                are used to gather information about potential data annotation projects. Submitting an inquiry does not
                create a contract or commitment on either party&apos;s behalf.
              </li>
              <li>
                <strong>Aventia Drones</strong> (drones.aventiaglobal.com): Currently in development. The site is provided
                for informational and waitlist-registration purposes only. No aerial imaging services are currently
                available.
              </li>
            </ul>
          </section>

          <section id="enrollment" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              3. Enrollment and Referrals (Aventia Energy)
            </h2>
            <p style={{ marginBottom: '12px' }}>
              Submitting an enrollment form through Aventia Energy initiates a referral process — it does not guarantee
              enrollment, a specific electricity rate, or acceptance by any retail electric provider.
            </p>
            <p style={{ marginBottom: '12px' }}>
              Aventia Energy may receive a referral commission from retail electric providers for successful enrollments
              completed through our platform. This arrangement does not affect the rates or terms offered to you by the
              provider.
            </p>
            <p>
              All electricity service agreements are between you and the retail electric provider. Aventia Energy is not a
              party to your electricity service contract and bears no responsibility for service quality, billing, or
              outages.
            </p>
          </section>

          <section id="accuracy" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              4. Accuracy of Information
            </h2>
            <p>
              While we strive to keep content accurate and up to date, we make no warranty that information on our Sites —
              including electricity rates, product descriptions, service timelines, or technical specifications — is
              complete, current, or error-free. Electricity rates displayed are reference examples and may not represent
              available rates at the time of your inquiry. We reserve the right to correct errors and update information
              without notice.
            </p>
          </section>

          <section id="conduct" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              5. User Conduct
            </h2>
            <p style={{ marginBottom: '12px' }}>By using our Sites, you agree not to:</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Use our Sites for any unlawful purpose or in violation of applicable laws</li>
              <li>Submit false, inaccurate, or misleading information through any form</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Attempt to gain unauthorized access to our systems, servers, or databases</li>
              <li>Use automated tools (bots, scrapers, crawlers) to extract data from our Sites without permission</li>
              <li>Transmit malicious code, viruses, or any disruptive content</li>
              <li>Interfere with the proper operation of our Sites or infrastructure</li>
            </ul>
          </section>

          <section id="ip" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              6. Intellectual Property
            </h2>
            <p>
              All content on our Sites — including text, graphics, logos, design elements, code, and branding — is owned
              by or licensed to Aventia Global LLC and is protected by applicable intellectual property laws. You may not
              reproduce, distribute, modify, publicly display, or create derivative works from any content on our Sites
              without our express written permission. Limited personal, non-commercial use of content for reference
              purposes is permitted.
            </p>
          </section>

          <section id="warranties" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              7. Disclaimer of Warranties
            </h2>
            <p>
              <strong>
                OUR SITES AND SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY
                KIND
              </strong>
              , whether express or implied, including but not limited to implied warranties of merchantability, fitness
              for a particular purpose, accuracy, and non-infringement. We do not warrant that our Sites will be
              uninterrupted, secure, error-free, or free of viruses or other harmful components. Your use of our Sites is
              at your sole risk.
            </p>
          </section>

          <section id="liability" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              8. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Aventia Global LLC and its officers, directors, employees,
              agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages — including lost profits, lost data, or business interruption — arising from or related to your use
              of our Sites or services, even if we have been advised of the possibility of such damages. Our total
              liability for any claim shall not exceed $100 USD or the amount you paid to us in the preceding twelve
              months, whichever is greater.
            </p>
          </section>

          <section id="law" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              9. Governing Law and Dispute Resolution
            </h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of Texas, without regard
              to its conflict of law provisions. Any legal action or proceeding arising out of or related to these Terms
              or your use of our Sites shall be brought exclusively in the state or federal courts located in Harris
              County, Texas. You consent to the jurisdiction of those courts. Any claim must be brought within one (1)
              year of the event giving rise to the claim.
            </p>
          </section>

          <section id="changes-t" style={{ marginBottom: '40px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              10. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will indicate the updated date at the top of this
              page. Your continued use of our Sites after changes are posted constitutes your acceptance of the modified
              Terms. If you do not agree to the revised Terms, you must stop using our Sites.
            </p>
          </section>

          <section id="contact-t" style={{ marginBottom: '48px' }}>
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}
            >
              11. Contact
            </h2>
            <p>For questions about these Terms:</p>
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
              <a href="mailto:legal@aventiaglobal.com" style={{ color: '#2563EB' }}>
                legal@aventiaglobal.com
              </a>
              <br />
              Web:{' '}
              <a href="https://aventiaglobal.com" style={{ color: '#2563EB' }}>
                aventiaglobal.com
              </a>
            </div>
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
            <Link href="/privacy" className="font-sans" style={{ fontSize: '14px', color: '#2563EB', textDecoration: 'none' }}>
              ← Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
