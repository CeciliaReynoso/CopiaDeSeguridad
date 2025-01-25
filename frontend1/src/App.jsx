import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import RegisterClient from './views/RegisterClient';
import Login from './views/Login';
import Profile from './views/Profile';
import RegisterPersonal from './views/RegisterPersonal';
import NoAutorizado from './views/NoAutorizado';
import MainLayout from './layouts/MainLayout';
import AdministratorLayout from './layouts/AdministratorLayout';
import PrivateRoute from './components/PrivateRoute';
import { RolesProvider } from './contexts/RolesContext';

const App = () => {
  return (
    <RolesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/registrarse' element={<RegisterClient />} />
            <Route path='/login' element={<Login />} />
            <Route path='/perfil' element={<Profile />} />
            <Route path='/no-autorizado' element={<NoAutorizado />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['Administrador']} />}>
            <Route element={<AdministratorLayout />}>
              <Route path='/register-personal' element={<RegisterPersonal />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RolesProvider>
  );
};

export default App;