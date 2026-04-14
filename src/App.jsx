import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.root}>
      <div className={styles.bgGrid} aria-hidden="true" />

      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <span className={styles.logo}>FLUX</span>
          <div className={styles.navLinks}>
            <a href="#features" className={styles.navLink}>Workflows</a>
            <a href="#how" className={styles.navLink}>Platform</a>
            <a href="#start" className={styles.navLink}>Pricing</a>
          </div>
          <a href="#start" className={styles.navCta}>Start Building</a>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.badgeDot} />
          AI Workflow Automation
        </div>
        <h1 className={styles.heroTitle}>
          Build workflows<br />
          <span className={styles.heroAccent}>that think.</span>
        </h1>
        <p className={styles.heroSub}>
          Orchestrate AI agents, data pipelines, and business logic into
          seamless automated workflows — without writing a single line of glue code.
        </p>
        <div className={styles.heroActions}>
          <a href="#start" className={styles.btnPrimary}>Start Building Free</a>
          <a href="#how" className={styles.btnGhost}>Watch Demo →</a>
        </div>
        <div className={styles.workflowPreview}>
          <WorkflowDiagram />
        </div>
      </section>

      {/* Trust bar */}
      <div className={styles.trustBar}>
        <span className={styles.trustLabel}>Trusted by teams at</span>
        {['Stripe', 'Linear', 'Vercel', 'Supabase', 'Notion'].map(name => (
          <span key={name} className={styles.trustName}>{name}</span>
        ))}
      </div>

      {/* Features */}
      <section className={styles.section} id="features">
        <div className={styles.sectionLabel}>CAPABILITIES</div>
        <h2 className={styles.sectionTitle}>Everything your workflow needs</h2>
        <div className={styles.featureGrid}>
          <FeatureCard
            number="01"
            title="Visual Orchestration"
            description="Drag-and-drop workflow builder with real-time execution trace. See every decision your AI makes."
          />
          <FeatureCard
            number="02"
            title="Multi-Agent Coordination"
            description="Spawn, chain, and parallelize AI agents. Each one specialized, all of them working together."
          />
          <FeatureCard
            number="03"
            title="Adaptive Routing"
            description="Conditional logic that responds to AI output. Your workflow evolves as data changes."
          />
          <FeatureCard
            number="04"
            title="Integrations Built-in"
            description="200+ native connectors. Plug into your existing stack in minutes, not months."
          />
          <FeatureCard
            number="05"
            title="Observability First"
            description="Full audit logs, latency breakdowns, and cost tracking for every workflow run."
          />
          <FeatureCard
            number="06"
            title="Enterprise Ready"
            description="SOC 2 Type II, VPC isolation, SSO, and role-based access. Ship fast, stay compliant."
          />
        </div>
      </section>

      {/* How it works */}
      <section className={styles.howSection} id="how">
        <div className={styles.howInner}>
          <div className={styles.sectionLabel}>HOW IT WORKS</div>
          <h2 className={styles.sectionTitle}>
            From idea to automation<br />in three steps
          </h2>
          <div className={styles.steps}>
            <Step
              num="1"
              title="Design your workflow"
              description="Use the visual builder to map out your process. Connect triggers, AI steps, and actions."
            />
            <div className={styles.stepConnector} aria-hidden="true">→</div>
            <Step
              num="2"
              title="Connect your tools"
              description="Link your APIs, databases, and SaaS products. Flux handles auth and rate limiting."
            />
            <div className={styles.stepConnector} aria-hidden="true">→</div>
            <Step
              num="3"
              title="Deploy and iterate"
              description="Go live with one click. Monitor performance, fork versions, and improve continuously."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection} id="start">
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaInner}>
          <div className={styles.ctaTag}>GET STARTED</div>
          <h2 className={styles.ctaTitle}>
            Your workflows,<br />supercharged.
          </h2>
          <p className={styles.ctaSub}>Free tier. No credit card. Ship in minutes.</p>
          <a href="#signup" className={styles.btnPrimary}>Create Free Account</a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footerOuter}>
        <div className={styles.footer}>
          <span className={styles.logo}>FLUX</span>
          <span className={styles.footerText}>
            © {new Date().getFullYear()} Flux Technologies, Inc.
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
  { label: 'Trigger',  type: 'trigger' },
  { label: 'Extract',  type: 'ai'      },
  { label: 'Classify', type: 'ai'      },
  { label: 'Route',    type: 'logic'   },
  { label: 'Notify',   type: 'action'  },
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
