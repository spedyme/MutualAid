import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Mutual Aid</h1>
        <p className={styles.subtitle}>
          Community support, resource sharing, and solidarity.
        </p>
        <a href="#get-involved" className={styles.cta}>
          Get Involved
        </a>
      </header>

      <main>
        <section className={styles.section} id="get-involved">
          <div className={styles.grid}>
            <Card
              icon="🤝"
              title="Give Help"
              description="Offer your skills, time, or resources to neighbours who need them."
            />
            <Card
              icon="🙋"
              title="Get Help"
              description="Request support from your community — no strings attached."
            />
            <Card
              icon="📢"
              title="Spread the Word"
              description="Share this network with friends, family, and local organisations."
            />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Built with care for the community &middot; {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

function Card({ icon, title, description }) {
  return (
    <div className={styles.card}>
      <span className={styles.cardIcon}>{icon}</span>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardDesc}>{description}</p>
    </div>
  )
}
