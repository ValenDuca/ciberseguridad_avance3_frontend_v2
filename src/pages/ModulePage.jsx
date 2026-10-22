import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCurrentUser, logoutUser } from '../auth';
import { moduleStats } from '../progress';

const modules={
  1:{title:'Introducción a la Seguridad Digital',subtitle:'Ciberseguridad y buenas prácticas digitales en el trabajo cotidiano.'},
  2:{title:'Identificación de Riesgos',subtitle:'Reconocimiento de amenazas y situaciones potencialmente inseguras.'},
  3:{title:'Protocolos de Respuesta',subtitle:'Acciones iniciales frente a situaciones sospechosas o incidentes.'},
  4:{title:'Cierre y Verificación',subtitle:'Integración de buenas prácticas y hábitos digitales.'}
};

const resources=[
  {key:'teoria',step:1,icon:'menu_book',kind:'Documento de lectura',title:'Material teórico — Introducción a la Seguridad Digital',desc:'Contenido teórico correspondiente al Módulo 1.',meta:['Formato digital / PDF']},
  {key:'video',step:2,icon:'play_circle',kind:'Recurso audiovisual',title:'Video del módulo',desc:'Recurso audiovisual breve para reforzar los principales conceptos del módulo.',meta:['Duración máxima: 5 min']},
  {key:'actividad',step:3,icon:'assignment',kind:'Práctica interactiva',title:'Actividad práctica',desc:'Aplicá los conceptos del módulo mediante una situación guiada similar a las que pueden presentarse en el trabajo cotidiano.',meta:['Caso formativo','Situación guiada']},
  {key:'evaluacion',step:4,icon:'quiz',kind:'Evaluación',title:'Evaluación del módulo',desc:'Comprobá los principales conocimientos adquiridos durante el módulo.',meta:['Preguntas de opción múltiple']}
];

export default function ModulePage(){
  const {id}=useParams();
  const nav=useNavigate();
  const user=getCurrentUser();
  const mod=modules[id] || {title:'Módulo',subtitle:''};
  const [stats,setStats]=useState(()=>moduleStats(id));

  useEffect(()=>{
    const refresh=()=>setStats(moduleStats(id));
    refresh();
    window.addEventListener('sf-progress-updated', refresh);
    window.addEventListener('storage', refresh);
    return ()=>{window.removeEventListener('sf-progress-updated',refresh);window.removeEventListener('storage',refresh)};
  },[id]);

  function logout(){logoutUser();nav('/login');}

  if(String(id)!=='1'){
    return <div className="module-page">
      <Header user={user} onLogout={logout}/>
      <main className="module-content">
        <Link className="back-link" to="/inicio">← Volver a mis módulos</Link>
        <div className="module-badge">MÓDULO {id}</div>
        <h1>{mod.title}</h1>
        <p className="module-intro">{mod.subtitle}</p>
        <div className="module-notice">La estructura funcional de este módulo se incorporará en los próximos incrementos. El Módulo 1 se utiliza como primer recorrido implementado.</div>
      </main>
    </div>
  }

  return <div className="module-page">
    <Header user={user} onLogout={logout}/>
    <main className="module-content module1-content">
      <section className="module-summary-card">
        <div>
          <span className="module-badge">MÓDULO 1</span>
          <h1>{mod.title}</h1>
          <p className="module-intro">{mod.subtitle}</p>
        </div>
        <div className="module-progress-box">
          <div className="progress-heading"><span>◴ Progreso del módulo:</span><strong>{stats.percent}% completado</strong></div>
          <div className="progress-track"><div className="progress-fill" style={{width:`${stats.percent}%`}}/></div>
          <div className="progress-bottom"><span>Progreso guardado</span><strong>{stats.completed} de 4 completados</strong></div>
        </div>
      </section>

      <section className="module-content-card">
        <div className="module-content-heading">
          <div><h2>Contenido del módulo</h2><p>En este módulo encontrarás el material teórico, un recurso audiovisual, una actividad práctica y una evaluación para comprobar lo aprendido.</p></div>
          <div className="state-legend"><span><i className="dot pending"/>Pendiente</span><span><i className="dot progress"/>En progreso</span><span><i className="dot done"/>Completado</span></div>
        </div>
        <div className="step-row">
          {resources.map(r=>{
            const done=stats.progress[r.key];
            return <div key={r.key} className={`step-item ${done?'done':''}`}>
              <span className="step-icon">{done?'✓':'○'}</span><div><b>{r.step}. {r.key==='teoria'?'Material teórico':r.key==='video'?'Video':r.key==='actividad'?'Actividad':'Evaluación'}</b><small>{done?'Completado':'Pendiente'}</small></div>
            </div>
          })}
        </div>
      </section>

      <section className="resource-grid module1-grid">
        {resources.map(r=>{
          const done=stats.progress[r.key];
          return <article key={r.key} className={`resource-card module-resource-card ${done?'resource-done':''}`}>
            <div>
              <div className="resource-card-top">
                <div className="resource-icon"><span className="material-symbols-outlined">{r.icon}</span></div>
                <div className="resource-tags"><span>{r.kind}</span><span className={done?'tag-done':'tag-pending'}>{done?'✓ Completado':'○ Pendiente'}</span></div>
              </div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <div className="resource-meta">{r.meta.map(m=><span key={m}>{m}</span>)}</div>
            </div>
            <div className="resource-card-footer">
              <span>Paso {r.step}</span>
              <Link className={`btn ${r.step===1?'btn-primary':'btn-outline'}`} to={`/modulos/1/${r.key}`}>
                {r.key==='teoria'?'Ver material teórico':r.key==='video'?'Ver video':r.key==='actividad'?'Comenzar actividad':'Comenzar evaluación'} →
              </Link>
            </div>
          </article>
        })}
      </section>
    </main>
  </div>
}

function Header({user,onLogout}){
  const initials=user?.fullName?.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase() || 'US';
  return <header className="module-header">
    <div className="module-header-inner">
      <div className="module-header-left">
        <Link className="back-link header-back" to="/inicio">← Volver a mis módulos</Link>
        <div className="header-divider"/>
        <div className="mini-brand"><span className="mini-shield">◈</span><div><b>Santa Fe Capacita</b><small>Gobierno de la Provincia de Santa Fe</small></div></div>
      </div>
      <div className="header-user"><span>{user?.fullName || 'Usuario'}</span><span className="avatar small">{initials}</span><button onClick={onLogout}>↪ Cerrar sesión</button></div>
    </div>
  </header>
}
