// filepath: /C:/Users/Lenovo/OneDrive/Documentos/_36_Curso_Full_Stack/_06_Backend/S6_Autenticacion_Autorizacion_JWT/Desafío - PWellness/frontend/src/utils/cryptoUtils.js
import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_SECRET_KEY; // Leer la clave secreta desde la variable de entorno

if (!secretKey) {
  throw new Error('VITE_SECRET_KEY no está definida en las variables de entorno');
}

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};