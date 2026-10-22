import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import { registerUser } from '../auth';

export default function Register() {
  const [form, setForm] = useState({ fullName:'', dni:'', email:'', password:'', confirm:'' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState(null);
  const username = useMemo(()=>form.email.trim().toLowerCase().endsWith('@santafe.gov.ar') ? form.email.trim().toLowerCase().split('@')[0] : '', [form.email]);
  const set = (k,v)=>setForm(f=>({...f,[k]:v}));

  async function submit(e){
    e.preventDefault(); setError(''); setCreated(null);
    if (!form.fullName.trim() || !form.dni.trim() || !form.email.trim() || !form.password || !form.confirm) return setError('Completá todos los campos obligatorios.');
    if (!/^\d+$/.test(form.dni.trim())) return setError('El DNI debe contener solo números.');
    if (!form.email.trim().toLowerCase().endsWith('@santafe.gov.ar')) return setError('Ingresá un correo institucional terminado en @santafe.gov.ar.');
    if (form.password !== form.confirm) return setError('Las contraseñas no coinciden.');
    try { const user = await registerUser(form); setCreated(user); }
    catch(err){ setError(err.message); }
  }

  return (
    <div className="page public-page">
      <PublicHeader backTo="/" backLabel="Volver a la presentación" />
      <main className="auth-main register-main">
        <form className="auth-card register-card" onSubmit={submit}>
          <div className="eyebrow left">PORTAL DEL SERVIDOR PÚBLICO</div>
          <h1>Crear una cuenta</h1><p>Completá tus datos para registrarte en la plataforma.</p>
          <label>Nombre completo <b>*</b><input value={form.fullName} onChange={e=>set('fullName',e.target.value)} placeholder="Nombre y apellido" /></label>
          <label>DNI <b>*</b><input inputMode="numeric" value={form.dni} onChange={e=>set('dni',e.target.value.replace(/\D/g,''))} placeholder="Solo números" /></label>
          <label>Correo electrónico institucional <b>*</b><input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="nombre.apellido@santafe.gov.ar" /></label>
          {username && <div className="success-lite"><strong>Asignación de credencial</strong><span>Tu usuario será: <b>{username}</b></span><small>Se genera automáticamente a partir de tu correo institucional.</small></div>}
          <label>Contraseña <b>*</b><div className="password-wrap"><input type={showPassword?'text':'password'} value={form.password} onChange={e=>set('password',e.target.value)} placeholder="Elegí una contraseña"/><button type="button" onClick={()=>setShowPassword(v=>!v)}><span className="material-symbols-outlined">visibility</span></button></div></label>
          <label>Confirmar contraseña <b>*</b><input type="password" value={form.confirm} onChange={e=>set('confirm',e.target.value)} placeholder="Repetí la contraseña" /></label>
          {error && <div className="error-box">{error}</div>}
          {created && <div className="success-box"><strong>Registro realizado correctamente.</strong><span>Tu usuario es <b>{created.username}</b>. Ahora iniciá sesión con la contraseña que elegiste.</span><Link className="btn btn-primary full" to="/login">Ir a iniciar sesión</Link></div>}
          {!created && <button className="btn btn-primary full">Registrarme →</button>}
          <div className="auth-bottom">¿Ya tenés una cuenta? <Link to="/login">Iniciar sesión</Link></div>
        </form>
      </main>
    </div>
  );
}
