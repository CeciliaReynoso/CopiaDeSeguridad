import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Context from '../contexts/RolesContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cargo, setCargo } = useContext(Context);

  const handleLogout = () => {
    logout();
    setCargo(null);
    navigate('/');
  };

  const isLogin = () => {
    if (!user) {
      return (
        <>
          <Link to='/registrarse' className='btn m-1 register-btn'>Registrarse</Link>
          <Link to='/login' className='btn login-btn'>Iniciar Sesión</Link>
        </>
      );
    }

    return (
      <>
        <Link to='/perfil' className='btn m-1 btn-light'>Mi Perfil</Link>
        <button onClick={handleLogout} className='btn btn-danger'>Salir</button>
      </>
    );
  };

  return (
    <nav className='navbar'>
      <span className='logo'>SJ</span>
      <div className='opciones'>
        <span className='me-3'>
          <Link to='/'>Inicio<i className='fa-solid fa-house ms-2' /></Link>
        </span>
        {isLogin()}
      </div>
    </nav>
  );
};

export default Navigation;