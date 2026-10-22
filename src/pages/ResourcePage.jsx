import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCurrentUser, logoutUser } from '../auth';
import { getModuleProgress, setResourceCompleted } from '../progress';

const labels={
  teoria:{title:'Material teórico',icon:'menu_book',description:'El contenido teórico definitivo del Módulo 1 se integrará en esta vista a partir del material aprobado del proyecto.'},
  video:{title:'Video del módulo',icon:'play_circle',description:'Esta ruta ya es funcional. La interfaz definitiva del reproductor se integrará con el próximo export de Stitch.'},
  actividad:{title:'Actividad práctica',icon:'assignment',description:'Esta ruta ya es funcional. La actividad interactiva y su retroalimentación se integrarán en el siguiente incremento.'},
  evaluacion:{title:'Evaluación del módulo',icon:'quiz',description:'Esta ruta ya es funcional. El banco de preguntas y el registro de resultados se incorporarán cuando integremos la evaluación.'}
};

export default function ResourcePage(){
  const {id,resource}=useParams();
  const nav=useNavigate();
  const user=getCurrentUser();
  const info=labels[resource] || labels.teoria;
  const [done,setDone]=useState(()=>!!getModuleProgress(id)[resource]);
  useEffect(()=>setDone(!!getModuleProgress(id)[resource]),[id,resource]);
  function logout(){logoutUser();nav('/login')}
  function toggle(){const next=!done; setResourceCompleted(id,resource,next); setDone(next)}
  return <div className="module-page">
    <header className="resource-topbar">
      <div className="mini-brand"><span className="mini-shield">◈</span><div><b>Santa Fe Capacita</b><small>Gobierno Provincial</small></div></div>
      <nav><Link to="/inicio">Inicio</Link><Link className="active" to="/inicio">Mis Cursos</Link><span>Evaluaciones</span></nav>
      <div className="resource-user"><span>{user?.fullName || 'Usuario'}</span><button onClick={logout}>Cerrar sesión</button></div>
    </header>
    <main className="resource-page-content">
      <Link className="back-link" to={`/modulos/${id}`}>← Volver al Módulo {id}</Link>
      <div className="resource-breadcrumb">Capacitación de ciberseguridad / Módulo {id}: Introducción a la Seguridad Digital / {info.title}</div>
      <span className="module-badge">Módulo {id} — Introducción a la Seguridad Digital</span>
      <h1>{info.title}</h1>
      <p className="module-intro">{resource==='teoria'?'Consultá el material correspondiente al módulo.':resource==='video'?'Reforzá los principales conceptos del módulo mediante un recurso audiovisual breve.':resource==='actividad'?'Aplicá los conceptos del módulo mediante una situación guiada.':'Comprobá los principales conocimientos adquiridos durante el módulo.'}</p>

      <section className="resource-placeholder-card">
        <span className="material-symbols-outlined placeholder-icon">{info.icon}</span>
        <h2>Ruta funcional preparada</h2>
        <p>{info.description}</p>
        <div className="implementation-note">Esta pantalla es provisional y se reemplazará por la interfaz exportada de Stitch correspondiente, sin cambiar la ruta ni la lógica de progreso.</div>
        <button className={`btn ${done?'btn-success':'btn-primary'}`} onClick={toggle}>{done?'✓ Marcar nuevamente como pendiente':'Marcar como completado para probar el progreso'}</button>
      </section>
    </main>
  </div>
}
