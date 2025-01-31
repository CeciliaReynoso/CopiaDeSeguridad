import { useState, useEffect } from 'react';
import axios from '../config/axiosConfig';
import { encrypt, decrypt } from '../utils/cryptoUtils';
import { ENDPOINT } from '../config/constans';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const encryptedToken = window.sessionStorage.getItem('token');
    const encryptedEmail = window.sessionStorage.getItem('email');

    if (encryptedToken && encryptedEmail) {
      const token = decrypt(encryptedToken);
      const email = decrypt(encryptedEmail);

      axios.get(ENDPOINT.user, {
        headers: { Authorization: `Bearer ${token}` },
        params: { email }
      })
        .then(response => setUser(response.data))
        .catch(error => {
          console.error('Error al obtener los datos del usuario:', error);
          window.sessionStorage.removeItem('token');
          window.sessionStorage.removeItem('email');
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(ENDPOINT.login, { email, password });
      const token = response.data.token;
      window.sessionStorage.setItem('token', encrypt(token));
      window.sessionStorage.setItem('email', encrypt(email));

      // Hacer una solicitud adicional para obtener los datos del usuario
      const userResponse = await axios.get(ENDPOINT.user, {
        headers: { Authorization: `Bearer ${token}` },
        params: { email }
      });

      setUser(userResponse.data);
      return userResponse.data;
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response.data);
      throw error;
    }
  };

  const logout = () => {
    window.sessionStorage.removeItem('token');
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;