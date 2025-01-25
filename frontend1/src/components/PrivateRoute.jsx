import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = () => {
  const { user } = useAuth();

  if (!user) {
    // Si no hay usuario autenticado, redirigir al login
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;