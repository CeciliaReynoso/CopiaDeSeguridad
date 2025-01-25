import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  // useEffect(() => {
  //   // Aquí puedes realizar cualquier acción adicional cuando el usuario esté autenticado
  // }, [user]);

  return (
    <div className='py-5'>
      <h1>
        Bienvenido a <span className='fw-bold'>Pets Wellness</span>
      </h1>
      <h4>
        Expertos en bienestar para tus mascotas
      </h4>
      <div className='d-flex justify-content-center'>
        <img src='/cat_14401971.gif' style={{ width: '80px', height: '80px', borderRadius: '50%' }} alt='Pets Wellness' />
      </div>
    </div>
  );
};

export default Home;