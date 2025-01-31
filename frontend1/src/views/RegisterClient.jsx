import React, { useState, useContext } from 'react';
import axios from '../config/axiosConfig'; // Asegúrate de usar la configuración correcta de axios
import RolesContext from '../contexts/RolesContext';
import { useNavigate } from 'react-router-dom';

const RegisterClient = () => {
  const [user, setUser] = useState({ email: '', password: '', nombre: '', direccion: '' });
  
  const { setCargo } = useContext(RolesContext);
  const navigate = useNavigate();

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', user);
      console.log('Cliente registrado con éxito:', response.data);
      setCargo(response.data.rol); // Ajusta esto según la estructura de roles en tu respuesta
      window.alert('Cliente registrado con éxito 😀.');
      navigate('/'); // Navegar a la página de inicio o a otra página después del registro
    } catch (error) {
      console.error('Error al registrar el cliente:', error.response.data);
      window.alert(`Error al registrar el cliente: ${error.response.data.message} 🙁.`);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className='form-group mt-1'>
          <label>Email address</label>
          <input
            value={user.email}
            onChange={handleUser}
            type='email'
            name='email'
            className='form-control'
            placeholder='Enter email'
          />
        </div>
        <div className='form-group mt-1'>
          <label>Password</label>
          <input
            value={user.password}
            onChange={handleUser}
            type='password'
            name='password'
            className='form-control'
            placeholder='Enter password'
          />
        </div>
        <div className='form-group mt-1'>
          <label>Nombre</label>
          <input
            value={user.nombre}
            onChange={handleUser}
            type='text'
            name='nombre'
            className='form-control'
            placeholder='Enter name'
          />
        </div>
        <div className='form-group mt-1'>
          <label>Dirección</label>
          <input
            value={user.direccion}
            onChange={handleUser}
            type='text'
            name='direccion'
            className='form-control'
            placeholder='Enter address'
          />
        </div>
        <button type='submit' className='btn btn-primary mt-2'>Register</button>
      </form>
    </div>
  );
};

export default RegisterClient;
