export default function Brand({ compact = false }) {
  return (
    <div className="brand">
      <div className={`brand-shield ${compact ? 'compact' : ''}`}><span className="material-symbols-outlined">shield</span></div>
      <div>
        <div className="brand-title">Santa Fe Capacita</div>
        <div className="brand-subtitle">Gobierno de la Provincia de Santa Fe</div>
      </div>
    </div>
  );
}
