import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = { email: 'Ingrese su email', password: 'Ingrese su password' };

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialForm);
  const { login } = useAuth();

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value });

  const handleForm = async (event) => {
    event.preventDefault();

    if (!user.email.trim() || !user.password.trim()) {
      return window.alert('Email y password obligatorias.');
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!');
    }

    try {
      const loggedInUser = await login(user.email, user.password);
      window.alert('Usuario identificado con éxito 😀.');
      setUser(initialForm); // Restablecer el formulario

      // Navegar según el rol del usuario
      if (loggedInUser.rol === 'Administrador') {
        navigate('/register-personal'); // Navegar a la vista RegisterPersonal para Administradores
      } else {
        navigate('/'); // Navegar a la página de inicio para otros usuarios
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      window.alert(`${error.response?.data?.message || error.message} 🙁.`);
    }
  };

  return (
    <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5'>
      <h1>Iniciar Sesión</h1>
      <hr />
      <div className='form-group mt-1 '>
        <label>Email address</label>
        <input
          placeholder='Enter email'
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control'
        />
      </div>
      <div className='form-group mt-1 '>
        <label>Password</label>
        <input
          placeholder='Password'
          value={user.password}
          onChange={handleUser}
          type='password'
          name='password'
          className='form-control' 
        />
      </div>
      <button type='submit' className='btn btn-light mt-3'>Iniciar Sesión</button>
    </form>
  );
};

export default Login;