import React, { useState, useContext } from 'react';
import axios from 'axios';
import RolesContext from '../contexts/RolesContext';
import { ENDPOINT } from '../config/constans';
import { decrypt } from '../utils/cryptoUtils';
import useAuth from '../hooks/useAuth';

const RegisterPersonal = () => {
  const [user, setUser] = useState({ email: '', password: '', rol: 'Empleado', nombre: '', direccion: '' });
  const { cargo } = useContext(RolesContext);
  const { user: authUser } = useAuth();

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const encryptedToken = window.sessionStorage.getItem('token');
    if (!encryptedToken) {
      console.error('No token found');
      return;
    }
    const token = decrypt(encryptedToken);

    axios.post(ENDPOINT.personal, user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('Personal registrado con éxito:', response.data);
        window.alert('Personal registrado con éxito 😀.');
      })
      .catch((error) => {
        console.error('Error al registrar el personal:', error);
        window.alert(`Error al registrar el personal: ${error.response?.data?.message || error.message} 🙁.`);
      });
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
        <div className='form-group mt-1'>
          <label>Rol</label>
          <select
            value={user.rol}
            onChange={handleUser}
            name='rol'
            className='form-select'
          >
            <option value='Empleado'>Empleado</option>
            <option value='Supervisor de Compras'>Supervisor de Compras</option>
            <option value='Supervisor de Inventarios'>Supervisor de Inventarios</option>
            <option value='Supervisor de Ventas'>Supervisor de Ventas</option>
            <option value='Administrador'>Administrador</option>
          </select>
        </div>
        <button type='submit' className='btn btn-primary mt-2'>Register</button>
      </form>
    </div>
  );
};

export default RegisterPersonal;