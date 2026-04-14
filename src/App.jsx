import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.root}>
      <div className={styles.bgGrid} aria-hidden="true" />

      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <span className={styles.logo}>MUTUAL AID</span>
          <div className={styles.navLinks}>
            <a href="#how" className={styles.navLink}>Approach</a>
            <a href="#features" className={styles.navLink}>Solutions</a>
            <a href="#start" className={styles.navLink}>Contact</a>
          </div>
          <a href="#start" className={styles.navCta}>Work With Us</a>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.badgeDot} />
          AI Solutions · Enterprise &amp; Government
        </div>
        <h1 className={styles.heroTitle}>
          AI is everywhere.<br />
          <span className={styles.heroAccent}>Productivity isn't.</span>
        </h1>
        <p className={styles.heroSub}>
          Robert Solow observed in 1987: computers everywhere, productivity nowhere.
          The gains came only when organizations rebuilt their workflows around the
          technology. AI is at that same inflection point. Mutual Aid builds the
          workflows that close the gap — for enterprises and governments that
          can't afford to wait a decade.
        </p>
        <div className={styles.heroActions}>
          <a href="#start" className={styles.btnPrimary}>Start the Conversation</a>
          <a href="#how" className={styles.btnGhost}>See Our Approach →</a>
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

      {/* Features */}
      <section className={styles.section} id="features">
        <div className={styles.sectionLabel}>WHAT WE DO</div>
        <h2 className={styles.sectionTitle}>
          AI solutions engineered for organizations<br />that can't afford to get it wrong
        </h2>
        <div className={styles.featureGrid}>
          <FeatureCard
            number="01"
            title="Workflow Architecture"
            description="We design the operational layer where AI delivers outcomes, not just capability. The gap is always in the workflow — we close it."
          />
          <FeatureCard
            number="02"
            title="Government Integration"
            description="Navigate procurement rules, compliance requirements, legacy infrastructure, and inter-agency complexity — without compromising mission."
          />
          <FeatureCard
            number="03"
            title="Enterprise Deployment"
            description="Purpose-built AI solutions that integrate with your existing stack, your security posture, and your people."
          />
          <FeatureCard
            number="04"
            title="Change Management"
            description="Technology is half the equation. We guide your organization through the cultural and operational transition that makes AI actually stick."
          />
          <FeatureCard
            number="05"
            title="Support Without Equal"
            description="We don't hand off a product and walk away. We stay — as your operational partner through every phase, every obstacle, every iteration."
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
              description="We stay. Deploying, iterating, and evolving your workflows as the technology matures and your organization grows. This is where our support stands apart."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection} id="start">
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaInner}>
          <div className={styles.ctaTag}>THE PRODUCTIVITY GAP</div>
          <h2 className={styles.ctaTitle}>
            Stop waiting for<br />AI to pay off.
          </h2>
          <p className={styles.ctaSub}>It won't — until the workflows are right. Let's build them.</p>
          <a href="mailto:hello@mutual-aid.ai" className={styles.btnPrimary}>Start the Conversation</a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footerOuter}>
        <div className={styles.footer}>
          <span className={styles.logo}>MUTUAL AID</span>
          <span className={styles.footerText}>
            © {new Date().getFullYear()} Mutual Aid. AI solutions for enterprises and governments.
          </span>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Privacy</a>
            <a href="#" className={styles.footerLink}>Terms</a>
            <a href="#" className={styles.footerLink}>Status</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

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

const NODES = [
  { label: 'Intake',   type: 'trigger' },
  { label: 'Assess',   type: 'ai'      },
  { label: 'Classify', type: 'ai'      },
  { label: 'Review',   type: 'logic'   },
  { label: 'Deploy',   type: 'action'  },
]

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
