const KEY = 'sf-capacita-progress';

const emptyModule = () => ({ teoria:false, video:false, actividad:false, evaluacion:false });

export function getProgress(){
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    return {
      1: { ...emptyModule(), ...(raw[1] || {}) },
      2: { ...emptyModule(), ...(raw[2] || {}) },
      3: { ...emptyModule(), ...(raw[3] || {}) },
      4: { ...emptyModule(), ...(raw[4] || {}) }
    };
  } catch {
    return {1:emptyModule(),2:emptyModule(),3:emptyModule(),4:emptyModule()};
  }
}

export function getModuleProgress(moduleId){
  return getProgress()[moduleId] || emptyModule();
}

export function setResourceCompleted(moduleId, resource, completed=true){
  const all = getProgress();
  all[moduleId] = { ...emptyModule(), ...(all[moduleId] || {}), [resource]: completed };
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new Event('sf-progress-updated'));
  return all[moduleId];
}

export function moduleStats(moduleId){
  const p = getModuleProgress(moduleId);
  const resources = ['teoria','video','actividad','evaluacion'];
  const completed = resources.filter(r => p[r]).length;
  return { completed, total:4, percent:completed*25, progress:p };
}
