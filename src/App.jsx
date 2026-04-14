import { useState, useRef, useEffect, useCallback, Fragment } from 'react'
import { PiHeartStraightFill } from 'react-icons/pi'
import styles from './App.module.css'

/* ─── Scroll reveal ─── */
function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px', ...options })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

function Reveal({ children, delay = 0, className = '', ...rest }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.revealIn : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </div>
  )
}

/* ─── Parallax hook (RAF-based, passive scroll) ─── */
function useParallax(speed = 0.18) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        el.style.transform = `translateY(${window.scrollY * speed}px)`
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])
  return ref
}

/* ─── Mode config ─── */
const MODE = {
  corporate: {
    hero: {
      eyebrow: 'Enterprise AI Solutions',
      title: (s, ref) => <>Your AI investments<br /><span className={s} ref={ref}>aren't paying off yet.</span></>,
      sub: 'Most enterprises have the tools. Few have the workflows. Mutual Aid builds the operational layer that turns AI capability into measurable business outcomes.',
      cta: 'Request a Briefing',
      cta2: 'See the Framework →',
    },
    trust: ['Fortune 500', 'Financial Services', 'Healthcare Systems', 'Technology', 'Manufacturing'],
    features: [
      { number: '01', title: 'Workflow Architecture',  description: "Solow said it in 1987 — computers everywhere, productivity nowhere. The gains came when workflows caught up. We build those workflows for AI." },
      { number: '02', title: 'Enterprise Integration', description: "Connect AI to your CRM, ERP, data warehouse, and systems of record — without rebuilding your stack or disrupting your teams." },
      { number: '03', title: 'ROI-Driven Deployment',  description: "Every workflow we build is measured against business outcomes. Efficiency, cost reduction, and revenue impact — tracked and reported." },
      { number: '04', title: 'Organisational Change',  description: "Technology is half the equation. We align leadership and teams around the operational shift that makes AI investment compound." },
      { number: '05', title: 'Support Without Equal',  description: "We don't hand off a product and walk away. We stay — as your operational partner through every phase, every obstacle, every board review." },
      { number: '06', title: 'Compounding Returns',    description: "AI capability compounds. Each workflow improvement creates the foundation for the next. We plan for that from day one." },
    ],
    steps: [
      { num: '1', title: 'Diagnose',  description: "We map where AI tools exist and where business outcomes stall. The bottleneck is always in the operational layer — the workflows your people actually run." },
      { num: '2', title: 'Architect', description: "We design ROI-focused workflows integrated with your existing stack, built around your commercial objectives and built to scale." },
      { num: '3', title: 'Partner',   description: "We stay. Evolving your workflows through every product cycle, acquisition, and strategic shift. This is where our support stands apart." },
    ],
    cta: {
      tag: 'THE PRODUCTIVITY GAP',
      title: 'Stop waiting for\nAI to pay off.',
      sub: "It won't — until the workflows are right. Let's build them.",
      btn: 'Request a Briefing',
    },
  },
  government: {
    hero: {
      eyebrow: 'Government AI Solutions',
      title: (s, ref) => <>AI that serves<br /><span className={s} ref={ref}>the public mission.</span></>,
      sub: 'Government agencies face unique complexity — procurement mandates, compliance requirements, legacy infrastructure, and public accountability. Mutual Aid navigates all of it.',
      cta: 'Schedule a Consultation',
      cta2: 'See the Framework →',
    },
    trust: ['Federal Agencies', 'State Government', 'Public Health', 'Defence', 'Municipal Services'],
    features: [
      { number: '01', title: 'Workflow Architecture',   description: "Solow said it in 1987 — computers everywhere, productivity nowhere. The gains came when agencies rebuilt their processes around the technology. We do the same for AI." },
      { number: '02', title: 'Procurement Navigation',  description: "We understand government buying cycles, framework agreements, and procurement rules. We work inside them — so your projects don't stall at the first compliance hurdle." },
      { number: '03', title: 'Compliance-First Design', description: "Every workflow is designed to your regulatory framework from the outset — GDPR, security classifications, FOI obligations, and sector-specific mandates." },
      { number: '04', title: 'Departmental Change',     description: "Bringing civil servants, senior leaders, and elected officials through AI transformation requires a different approach to change. We've built it." },
      { number: '05', title: 'Support Without Equal',   description: "We don't hand off a product and walk away. We stay — through budget cycles, administration changes, and the long work of improving public services." },
      { number: '06', title: 'Mission Evolution',       description: "Public sector priorities shift with each administration and spending review. Your workflows evolve with new mandates without rebuilding from scratch." },
    ],
    steps: [
      { num: '1', title: 'Assess', description: "We audit your department's AI readiness — mapping tools, data assets, policies, and the workflows your civil servants actually depend on." },
      { num: '2', title: 'Design', description: "We build procurement-compliant workflows around your mission constraints, legacy systems, and the practical realities of public sector delivery." },
      { num: '3', title: 'Embed',  description: "We become part of your team — through budget rounds, machinery of government changes, and the sustained work of public service improvement." },
    ],
    cta: {
      tag: 'THE MISSION GAP',
      title: 'AI that serves.\nNot just promises.',
      sub: "Real productivity for real public service — when the workflows are right.",
      btn: 'Schedule a Consultation',
    },
  },
}

const DEV_PROJECTS = [
  {
    id: 'ecoguide',
    name: 'EcoGuide',
    type: 'Visitor Management Software',
    desc: 'Smart visitor management with AI-powered check-in, compliance tracking, and environmental footprint reporting for facilities and managed sites.',
  },
  {
    id: 'mai',
    name: 'Mutual Aid Intelligence',
    type: 'Decentralised AI',
    desc: 'A decentralised AI infrastructure distributing intelligence across sovereign nodes — resilient, community-governed, and independent of centralised cloud providers.',
  },
]

const NODES = [
  { label: 'Intake',   type: 'trigger' },
  { label: 'Assess',   type: 'ai'      },
  { label: 'Classify', type: 'ai'      },
  { label: 'Review',   type: 'logic'   },
  { label: 'Deploy',   type: 'action'  },
]

/* ─── App ─── */
export default function App() {
  // 'splash' → user sees the entry screen
  // 'leaving' → splash is fading out, site is mounting
  // 'site' → site is fully visible
  const [phase, setPhase] = useState('splash')
  const [mode, setMode] = useState('corporate')
  const [contentVisible, setContentVisible] = useState(true)
  const pendingMode = useRef(null)
  const accentRef   = useRef(null)
  const parallaxRef = useParallax(0.14)

  // Re-trigger underline draw animation whenever hero content becomes visible
  useEffect(() => {
    if (!contentVisible) return
    const el = accentRef.current
    if (!el) return
    el.style.animation = 'none'
    void el.offsetHeight // force reflow
    el.style.animation = ''
  }, [contentVisible])

  function choose(selectedMode) {
    setMode(selectedMode)
    setPhase('leaving')
    setTimeout(() => setPhase('site'), 580)
  }

  const switchMode = useCallback((newMode) => {
    if (newMode === mode || pendingMode.current) return
    pendingMode.current = newMode
    setContentVisible(false)
    setTimeout(() => {
      setMode(newMode)
      setContentVisible(true)
      pendingMode.current = null
    }, 220)
  }, [mode])

  const cfg = MODE[mode]

  return (
    <div className={styles.root}>

      {/* ── Splash ── */}
      {phase !== 'site' && <SplashScreen phase={phase} onChoose={choose} />}

      {/* ── Site (renders under splash so fonts/images load) ── */}
      {phase !== 'splash' && (
        <div
          className={`${styles.siteInner} ${phase === 'site' ? styles.siteVisible : ''}`}
          data-mode={mode}
        >
          <ParticleCanvas />
          {/* Nav */}
          <nav className={styles.nav}>
            <div className={styles.navInner}>
              <span className={styles.logo}>
                <PiHeartStraightFill className={styles.logoHeart} aria-hidden="true" />
                MUTUAL AID
              </span>
              <div className={styles.navLinks}>
                <a href="#how"      className={styles.navLink}>Approach</a>
                <a href="#features" className={styles.navLink}>Solutions</a>
                <a href="#start"    className={styles.navLink}>Contact</a>
              </div>
              {/* Subtle in-nav mode toggle */}
              <div className={styles.modeToggle} role="group" aria-label="Switch audience">
                <button
                  className={mode === 'corporate' ? styles.modeActive : styles.modeBtn}
                  onClick={() => switchMode('corporate')}
                >Enterprise</button>
                <span className={styles.modeSep} aria-hidden="true">·</span>
                <button
                  className={mode === 'government' ? styles.modeActive : styles.modeBtn}
                  onClick={() => switchMode('government')}
                >Government</button>
              </div>
              <a href="#start" className={styles.navCta}>Work With Us</a>
            </div>
          </nav>

          {/* Hero */}
          <section className={styles.hero}>
            <div
              ref={parallaxRef}
              className={`${styles.heroContent} ${contentVisible ? styles.heroContentVisible : styles.heroContentHidden}`}
            >
              <div className={styles.heroBadge}>
                <span className={styles.badgeDot} />
                {cfg.hero.eyebrow}
              </div>
              <h1 className={styles.heroTitle}>{cfg.hero.title(styles.heroAccent, accentRef)}</h1>
              <p className={styles.heroSub}>{cfg.hero.sub}</p>
              <div className={styles.heroActions}>
                <a href="#start" className={styles.btnPrimary}>{cfg.hero.cta}</a>
                <a href="#how"   className={styles.btnGhost}>{cfg.hero.cta2}</a>
              </div>
            </div>
            <div className={styles.workflowOuter}>
              <div className={styles.workflowPreview}><WorkflowDiagram /></div>
            </div>
          </section>

          {/* Trust bar */}
          <div className={styles.trustBar}>
            <span className={styles.trustLabel}>Deployable across</span>
            {cfg.trust.map((name, i) => (
              <Reveal key={name} delay={i * 60} className={styles.trustNameReveal}>
                <span className={styles.trustName}>{name}</span>
              </Reveal>
            ))}
          </div>

          {/* Backed by */}
          <section className={styles.backedBy}>
            <Reveal><span className={styles.backedLabel}>BACKED BY</span></Reveal>
            <div className={styles.backedLogos}>
              <Reveal delay={100}><UniQuestLogo /></Reveal>
              <Reveal delay={200} className={styles.backedDividerReveal}>
                <div className={styles.backedDivider} />
              </Reveal>
              <Reveal delay={300}><UQLogo /></Reveal>
            </div>
          </section>

          {/* Features */}
          <section className={styles.section} id="features">
            <Reveal><div className={styles.sectionLabel}>WHAT WE DO</div></Reveal>
            <Reveal delay={80}>
              <h2 className={styles.sectionTitle}>
                AI solutions engineered for organisations<br />that can't afford to get it wrong
              </h2>
            </Reveal>
            <div className={styles.featureGrid}>
              {cfg.features.map((feat, i) => (
                <Reveal key={feat.number} delay={(i % 3) * 90} className={styles.featureReveal}>
                  <FeatureCard {...feat} />
                </Reveal>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className={styles.howSection} id="how">
            <div className={styles.howInner}>
              <Reveal><div className={styles.sectionLabel}>THE APPROACH</div></Reveal>
              <Reveal delay={80}>
                <h2 className={styles.sectionTitle}>
                  How we close<br />the productivity gap
                </h2>
              </Reveal>
              <div className={styles.steps}>
                {cfg.steps.map((step, i) => (
                  <Fragment key={step.num}>
                    {i > 0 && <div className={styles.stepConnector} aria-hidden="true">→</div>}
                    <Reveal delay={i * 120} className={styles.stepReveal}>
                      <Step {...step} />
                    </Reveal>
                  </Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* In Development */}
          <section className={styles.devSection}>
            <div className={styles.devInner}>
              <Reveal><div className={styles.sectionLabel}>CURRENTLY BUILDING</div></Reveal>
              <Reveal delay={80}>
                <h2 className={styles.sectionTitle}>Projects in development</h2>
              </Reveal>
              <div className={styles.devGrid}>
                <Reveal delay={120} className={styles.devIframeReveal}>
                  <div className={styles.iframeWrap}>
                    <div className={styles.iframeBar}>
                      <span className={styles.iframeDot} />
                      <span className={styles.iframeDot} />
                      <span className={styles.iframeDot} />
                      <span className={styles.iframeUrl}>tender-board-blond.vercel.app</span>
                    </div>
                    <iframe
                      src="https://tender-board-blond.vercel.app/"
                      className={styles.tenderFrame}
                      title="Current project board"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
                <div className={styles.devProjects}>
                  {DEV_PROJECTS.map((proj, i) => (
                    <Reveal key={proj.id} delay={180 + i * 100}>
                      <div className={styles.devCard}>
                        <div className={styles.devStatus}>
                          <span className={styles.devStatusDot} />
                          In Development
                        </div>
                        <div className={styles.devCardName}>{proj.name}</div>
                        <div className={styles.devCardType}>{proj.type}</div>
                        <p className={styles.devCardDesc}>{proj.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className={styles.ctaSection} id="start">
            <HeartWatermark />
            <Reveal className={styles.ctaInner}>
              <div className={styles.ctaTag}>{cfg.cta.tag}</div>
              <h2 className={styles.ctaTitle}>{cfg.cta.title}</h2>
              <p className={styles.ctaSub}>{cfg.cta.sub}</p>
              <a href="mailto:hello@mutual-aid.ai" className={styles.btnPrimary}>{cfg.cta.btn}</a>
            </Reveal>
          </section>

          {/* Footer */}
          <footer className={styles.footerOuter}>
            <div className={styles.footer}>
              <span className={styles.logo}>
                <PiHeartStraightFill className={styles.logoHeart} aria-hidden="true" />
                MUTUAL AID
              </span>
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
      )}
    </div>
  )
}

/* ─── Splash screen ─── */
function SplashScreen({ phase, onChoose }) {
  return (
    <div className={`${styles.splash} ${phase === 'leaving' ? styles.splashLeaving : ''}`}>
      <header className={styles.splashHeader}>
        <span className={styles.splashLogo}>
          <PiHeartStraightFill className={styles.splashLogoHeart} aria-hidden="true" />
          MUTUAL AID
        </span>
      </header>
      <div className={styles.splashTaglineWrap}>
        <p className={styles.splashTagline}>
          AI solutions for organisations<br />
          <em>ready to close the productivity gap.</em>
        </p>
      </div>
      <div className={styles.splashChoices}>
        <button className={styles.splashChoice} onClick={() => onChoose('corporate')}>
          <div className={styles.splashChoiceInner}>
            <span className={styles.splashChoiceEye}>Enterprise</span>
            <h2 className={styles.splashChoiceHead}>For businesses</h2>
            <p className={styles.splashChoiceDesc}>
              Measurable AI outcomes, operational efficiency,
              and ROI that satisfies the board.
            </p>
            <span className={styles.splashChoiceArrow}>Enter →</span>
          </div>
        </button>
        <div className={styles.splashDivider} aria-hidden="true" />
        <button className={styles.splashChoice} onClick={() => onChoose('government')}>
          <div className={styles.splashChoiceInner}>
            <span className={styles.splashChoiceEye}>Government</span>
            <h2 className={styles.splashChoiceHead}>For agencies</h2>
            <p className={styles.splashChoiceDesc}>
              Procurement-compliant AI workflows built around
              mission, compliance, and public service.
            </p>
            <span className={styles.splashChoiceArrow}>Enter →</span>
          </div>
        </button>
      </div>
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
        <div key={i} className={styles.diagramRow} style={{ '--delay': `${0.65 + i * 0.1}s` }}>
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
      <path d="M8 10 L8 32 Q8 44 20 44 Q32 44 32 32 L32 10" stroke="#005FAD" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      <text x="42" y="36" fontFamily="Georgia, serif" fontWeight="700" fontSize="22" fill="#005FAD" letterSpacing="0.5">UniQuest</text>
    </svg>
  )
}

function UQLogo() {
  return (
    <svg viewBox="0 0 240 52" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={styles.investorLogo} aria-label="University of Queensland">
      <path d="M10 8 L34 8 L34 34 Q34 46 22 50 Q10 46 10 34 Z" fill="#51247A" opacity="0.12"/>
      <path d="M10 8 L34 8 L34 34 Q34 46 22 50 Q10 46 10 34 Z" stroke="#51247A" strokeWidth="2" fill="none"/>
      <text x="13" y="35" fontFamily="Georgia, serif" fontWeight="700" fontSize="18" fill="#51247A">UQ</text>
      <text x="46" y="24" fontFamily="Georgia, serif" fontWeight="700" fontSize="15" fill="#51247A">University of</text>
      <text x="46" y="43" fontFamily="Georgia, serif" fontWeight="700" fontSize="15" fill="#51247A">Queensland</text>
    </svg>
  )
}

function HeartWatermark() {
  return <PiHeartStraightFill className={styles.heartWatermark} aria-hidden="true" />
}

/* ─── Particle canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const COUNT = 52
    const particles = []

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    const spawn = () => ({
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      r:       Math.random() * 1.7 + 0.4,
      vy:      -(Math.random() * 0.32 + 0.08),
      phase:   Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.07 + 0.025,
    })

    resize()
    for (let i = 0; i < COUNT; i++) particles.push(spawn())

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.y += p.vy
        p.x += Math.sin(t * 0.00055 + p.phase) * 0.28
        if (p.y < -12) {
          const fresh = spawn()
          Object.assign(p, fresh)
          p.y = canvas.height + 12
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(184, 50, 50, ${p.opacity})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize, { passive: true })
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.particleCanvas} />
}
