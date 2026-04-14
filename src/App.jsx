import { useState } from 'react'
import styles from './App.module.css'

const HERO = {
  corporate: {
    eyebrow: 'Enterprise AI Solutions',
    title: (accent) => (
      <>Your AI investments<br /><span className={accent}>aren't paying off yet.</span></>
    ),
    sub: `Most enterprises have the tools. Few have the workflows. Mutual Aid builds
the operational layer that turns AI capability into measurable business outcomes.`,
    cta: 'Request a Briefing',
    cta2: 'See the Framework →',
  },
  government: {
    eyebrow: 'Government AI Solutions',
    title: (accent) => (
      <>AI that serves<br /><span className={accent}>the public mission.</span></>
    ),
    sub: `Government agencies face unique complexity — procurement mandates, compliance
requirements, legacy infrastructure, and public accountability. Mutual Aid navigates all of it.`,
    cta: 'Schedule a Consultation',
    cta2: 'See the Framework →',
  },
}

const NODES = [
  { label: 'Intake',   type: 'trigger' },
  { label: 'Assess',   type: 'ai'      },
  { label: 'Classify', type: 'ai'      },
  { label: 'Review',   type: 'logic'   },
  { label: 'Deploy',   type: 'action'  },
]

export default function App() {
  const [mode, setMode] = useState('corporate')
  const hero = HERO[mode]

  return (
    <div className={styles.root}>

      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <span className={styles.logo}>MUTUAL AID</span>
          <div className={styles.navLinks}>
            <a href="#how"      className={styles.navLink}>Approach</a>
            <a href="#features" className={styles.navLink}>Solutions</a>
            <a href="#start"    className={styles.navLink}>Contact</a>
          </div>
          <a href="#start" className={styles.navCta}>Work With Us</a>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>

        {/* Mode switcher */}
        <div className={styles.switcher} role="group" aria-label="Select audience">
          <button
            className={mode === 'corporate' ? styles.switcherTabActive : styles.switcherTab}
            onClick={() => setMode('corporate')}
          >
            For Enterprise
          </button>
          <button
            className={mode === 'government' ? styles.switcherTabActive : styles.switcherTab}
            onClick={() => setMode('government')}
          >
            For Government
          </button>
        </div>

        <div className={styles.heroBadge}>
          <span className={styles.badgeDot} />
          {hero.eyebrow}
        </div>

        <h1 className={styles.heroTitle} key={mode}>
          {hero.title(styles.heroAccent)}
        </h1>

        <p className={styles.heroSub} key={mode + '-sub'}>
          {hero.sub}
        </p>

        <div className={styles.heroActions}>
          <a href="#start" className={styles.btnPrimary}>{hero.cta}</a>
          <a href="#how"   className={styles.btnGhost}>{hero.cta2}</a>
        </div>

        <div className={styles.workflowPreview}>
          <WorkflowDiagram />
        </div>
      </section>

      {/* Trust bar */}
      <div className={styles.trustBar}>
        <span className={styles.trustLabel}>Deployed across</span>
        {['Federal Agencies', 'State Government', 'Healthcare Systems', 'Financial Services', 'Enterprise'].map(name => (
          <span key={name} className={styles.trustName}>{name}</span>
        ))}
      </div>

      {/* Backed by */}
      <section className={styles.backedBy}>
        <span className={styles.backedLabel}>BACKED BY</span>
        <div className={styles.backedLogos}>
          <UniQuestLogo />
          <div className={styles.backedDivider} aria-hidden="true" />
          <UQLogo />
        </div>
      </section>

      {/* Features */}
      <section className={styles.section} id="features">
        <div className={styles.sectionLabel}>WHAT WE DO</div>
        <h2 className={styles.sectionTitle}>
          AI solutions engineered for organisations<br />that can't afford to get it wrong
        </h2>
        <div className={styles.featureGrid}>
          <FeatureCard
            number="01"
            title="Workflow Architecture"
            description="Solow said it in 1987 — computers everywhere, productivity nowhere. The gains came when workflows caught up. We build those workflows for AI."
          />
          <FeatureCard
            number="02"
            title="Government Integration"
            description="Navigate procurement rules, compliance mandates, legacy infrastructure, and inter-agency complexity — without compromising mission."
          />
          <FeatureCard
            number="03"
            title="Enterprise Deployment"
            description="Purpose-built AI solutions that integrate with your existing stack, your security posture, and your people."
          />
          <FeatureCard
            number="04"
            title="Change Management"
            description="Technology is half the equation. We guide your organisation through the cultural and operational transition that makes AI actually stick."
          />
          <FeatureCard
            number="05"
            title="Support Without Equal"
            description="We don't hand off a product and walk away. We stay — as your operational partner through every phase, every obstacle, every iteration. No other firm matches this."
          />
          <FeatureCard
            number="06"
            title="Continuous Evolution"
            description="AI capability compounds. Your workflows evolve alongside it, with Mutual Aid at your side as both the technology and your needs change."
          />
        </div>
      </section>

      {/* How it works */}
      <section className={styles.howSection} id="how">
        <div className={styles.howInner}>
          <div className={styles.sectionLabel}>THE APPROACH</div>
          <h2 className={styles.sectionTitle}>
            How we close<br />the productivity gap
          </h2>
          <div className={styles.steps}>
            <Step
              num="1"
              title="Diagnose"
              description="We map where AI tools exist and where productivity stalls. The bottleneck is always in the operational layer — the workflows your people actually run."
            />
            <div className={styles.stepConnector} aria-hidden="true">→</div>
            <Step
              num="2"
              title="Architect"
              description="We design the systems that make your AI investments deliver — built around your mission, your constraints, your compliance requirements, and your people."
            />
            <div className={styles.stepConnector} aria-hidden="true">→</div>
            <Step
              num="3"
              title="Partner"
              description="We stay. Deploying, iterating, and evolving your workflows as the technology matures and your organisation grows. This is where our support stands apart."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection} id="start">
        <HeartWatermark />
        <div className={styles.ctaInner}>
          <div className={styles.ctaTag}>THE PRODUCTIVITY GAP</div>
          <h2 className={styles.ctaTitle}>
            Stop waiting for<br />AI to pay off.
          </h2>
          <p className={styles.ctaSub}>It won't — until the workflows are right. Let's build them.</p>
          <a href="mailto:hello@mutual-aid.ai" className={styles.btnPrimary}>
            Start the Conversation
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footerOuter}>
        <div className={styles.footer}>
          <span className={styles.logo}>MUTUAL AID</span>
          <span className={styles.footerText}>
            © {new Date().getFullYear()} Mutual Aid · Backed by UniQuest &amp; The University of Queensland
          </span>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Privacy</a>
            <a href="#" className={styles.footerLink}>Terms</a>
            <a href="#" className={styles.footerLink}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ─── Sub-components ─── */

function FeatureCard({ number, title, description }) {
  return (
    <div className={styles.featureCard}>
      <span className={styles.featureNum}>{number}</span>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{description}</p>
    </div>
  )
}

function Step({ num, title, description }) {
  return (
    <div className={styles.step}>
      <div className={styles.stepNum}>{num}</div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDesc}>{description}</p>
    </div>
  )
}

function WorkflowDiagram() {
  return (
    <div className={styles.diagram}>
      {NODES.map((node, i) => (
        <div key={i} className={styles.diagramRow} style={{ '--delay': `${0.6 + i * 0.1}s` }}>
          {i > 0 && <div className={styles.diagramEdge} />}
          <div className={`${styles.diagramNode} ${styles[`node_${node.type}`]}`}>
            <span className={styles.diagramLabel}>{node.label}</span>
            <span className={styles.diagramType}>{node.type}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function UniQuestLogo() {
  return (
    <svg viewBox="0 0 200 52" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={styles.investorLogo} aria-label="UniQuest">
      {/* Stylised "U" mark */}
      <path d="M8 10 L8 32 Q8 44 20 44 Q32 44 32 32 L32 10" stroke="#005FAD" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      {/* Wordmark */}
      <text x="42" y="36" fontFamily="Georgia, serif" fontWeight="700" fontSize="22" fill="#005FAD" letterSpacing="0.5">UniQuest</text>
    </svg>
  )
}

function UQLogo() {
  return (
    <svg viewBox="0 0 240 52" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={styles.investorLogo} aria-label="University of Queensland">
      {/* Shield outline */}
      <path d="M10 8 L34 8 L34 34 Q34 46 22 50 Q10 46 10 34 Z" fill="#51247A" opacity="0.12"/>
      <path d="M10 8 L34 8 L34 34 Q34 46 22 50 Q10 46 10 34 Z" stroke="#51247A" strokeWidth="2" fill="none"/>
      {/* UQ letters inside shield */}
      <text x="13" y="35" fontFamily="Georgia, serif" fontWeight="700" fontSize="18" fill="#51247A">UQ</text>
      {/* Wordmark */}
      <text x="46" y="24" fontFamily="Georgia, serif" fontWeight="700" fontSize="15" fill="#51247A">University of</text>
      <text x="46" y="43" fontFamily="Georgia, serif" fontWeight="700" fontSize="15" fill="#51247A">Queensland</text>
    </svg>
  )
}

function HeartWatermark() {
  return (
    <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={styles.heartWatermark} aria-hidden="true">
      <path
        d="M100 160 C60 130 20 105 20 70 C20 45 40 28 65 28 C80 28 92 36 100 46 C108 36 120 28 135 28 C160 28 180 45 180 70 C180 105 140 130 100 160Z"
        fill="currentColor"
      />
    </svg>
  )
}
