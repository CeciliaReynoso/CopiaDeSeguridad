import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import { ENDPOINT } from '../config/constans';
import useAuth from '../hooks/useAuth';
import Context from '../contexts/RolesContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { setCargo } = useContext(Context);

  const getCargoData = () => {
    const token = window.sessionStorage.getItem('token');
    axios.get(ENDPOINT.user, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        setUser(data);
        setCargo(data.rol);
      })
      .catch(({ response: { data } }) => {
        console.error(data);
        window.sessionStorage.removeItem('token');
        setUser(null);
        setCargo(null);
        navigate('/login');
      });
  };

  useEffect(getCargoData, []);

  if (!user) {
    return null; // O muestra un mensaje de carga
  }

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{user.email}</span>
      </h1>
      <h3>
        {user.rol}
      </h3>
    </div>
  );
};

export default Profile;