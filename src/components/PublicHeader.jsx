import { Link } from 'react-router-dom';
import Brand from './Brand';

export default function PublicHeader({ backTo, backLabel }) {
  return (
    <header className="public-header">
      <Brand />
      {backTo && <Link className="btn btn-outline btn-small" to={backTo}>← {backLabel || 'Volver'}</Link>}
    </header>
  );
}
