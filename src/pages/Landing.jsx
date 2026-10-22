import { Link } from 'react-router-dom';
import Brand from '../components/Brand';

export default function Landing() {
  return (
    <div className="page public-page">
      <header className="public-header"><Brand /></header>
      <main className="landing-main">
        <div className="eyebrow">CAPACITACIÓN EN CIBERSEGURIDAD</div>
        <h1>Capacitación de ciberseguridad para empleados públicos de Santa Fe</h1>
        <p className="hero-copy">Un espacio de aprendizaje para incorporar hábitos digitales seguros mediante contenidos claros, ejemplos cotidianos y recursos prácticos.</p>

        <section className="hero-card">
          <div className="hero-copy-panel">
            <div className="section-kicker">PROPUESTA FORMATIVA</div>
            <p className="lead">Una plataforma de capacitación pensada para agentes públicos que quieran incorporar conocimientos básicos de ciberseguridad de manera simple y a su propio ritmo.</p>
            <p>Los contenidos abordan buenas prácticas digitales, phishing e ingeniería social, protección de cuentas, navegación segura y respuesta inicial ante posibles incidentes.</p>
            <div className="pill">✓ No necesitás conocimientos técnicos previos.</div>
            <div className="chip-row"><span className="chip">◷ Modalidad asincrónica</span><span className="chip">▣ Recorrido autogestionado</span></div>
          </div>
          <div className="hero-visual-panel">
            <div className="illustration-placeholder">
              <span className="material-symbols-outlined big-icon">security</span>
              <strong>Aprendizaje aplicado a situaciones laborales</strong>
              <span>Reconocé riesgos y practicá decisiones seguras.</span>
            </div>
          </div>
        </section>

        <div className="landing-actions">
          <Link className="btn btn-primary" to="/login">🔑 Iniciar sesión</Link>
          <Link className="btn btn-outline" to="/registro">♙ Registrarse</Link>
        </div>

        <section className="feature-grid">
          <article className="feature-card"><span className="material-symbols-outlined">shield_lock</span><h3>Buenas prácticas digitales</h3><p>Contenidos claros para proteger cuentas, información y dispositivos durante el trabajo cotidiano.</p></article>
          <article className="feature-card"><span className="material-symbols-outlined">mail</span><h3>Detección de fraudes</h3><p>Ejemplos y actividades para reconocer correos, enlaces y archivos potencialmente sospechosos.</p></article>
          <article className="feature-card"><span className="material-symbols-outlined">workspace_premium</span><h3>Certificado de finalización</h3><p>La plataforma habilitará la descarga del certificado cuando se cumplan los requisitos definidos para completar la capacitación.</p></article>
        </section>
      </main>
    </div>
  );
}
