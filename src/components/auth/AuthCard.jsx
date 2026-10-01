export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <section className="auth-card">
      <div className="auth-brand">
        <span className="brand-mark" aria-hidden="true">
          T
        </span>
        <strong>Trader</strong>
      </div>
      <header className="auth-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>
      {children}
      <p className="auth-footer">{footer}</p>
    </section>
  )
}
