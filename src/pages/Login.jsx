import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import { loginUser } from '../auth';

export default function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password) return setError('Completá usuario y contraseña.');
    setLoading(true);
    try {
      await loginUser(username, password);
      nav('/inicio');
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  return (
    <div className="page public-page">
      <PublicHeader backTo="/" backLabel="Volver a la presentación" />
      <main className="auth-main">
        <form className="auth-card" onSubmit={submit}>
          <div className="auth-icon"><span className="material-symbols-outlined">lock_person</span></div>
          <h1>Iniciar sesión</h1>
          <p>Ingresá tus datos para continuar con tu capacitación.</p>
          <label>Usuario <b>*</b><input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Ej: usuario.apellido" /></label>
          <div className="info-box">ⓘ El usuario corresponde a la parte de tu correo institucional anterior a <strong>@santafe.gov.ar</strong>.</div>
          <label>Contraseña <b>*</b><div className="password-wrap"><input type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Ingresá tu contraseña"/><button type="button" onClick={()=>setShowPassword(v=>!v)} aria-label="Mostrar u ocultar contraseña"><span className="material-symbols-outlined">visibility</span></button></div></label>
          {error && <div className="error-box">{error}</div>}
          <button className="btn btn-primary full" disabled={loading}>{loading?'Validando...':'Ingresar →'}</button>
          <div className="auth-separator" />
          <div className="auth-bottom">¿Todavía no tenés una cuenta? <Link to="/registro">Registrate</Link></div>
        </form>
      </main>
    </div>
  );
}
