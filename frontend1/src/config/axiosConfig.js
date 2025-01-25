import axios from 'axios';

// Configuración global de Axios
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['Authorization'] = `Bearer ${window.sessionStorage.getItem('token')}`;

export default axios;