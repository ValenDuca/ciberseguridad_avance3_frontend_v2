import { Navigate, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ModulePage from './pages/ModulePage';
import ResourcePage from './pages/ResourcePage';
import { getCurrentUser } from './auth';

function Protected({children}){return getCurrentUser()?children:<Navigate to="/login" replace/>}

export default function App(){
  return <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/registro" element={<Register/>}/>
    <Route path="/inicio" element={<Protected><Dashboard/></Protected>}/>
    <Route path="/modulos/:id" element={<Protected><ModulePage/></Protected>}/>
    <Route path="/modulos/:id/:resource" element={<Protected><ResourcePage/></Protected>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>
}
