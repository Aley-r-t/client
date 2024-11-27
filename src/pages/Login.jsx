import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

const Login = ({ setAuthToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para manejar mensajes de error
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar mensajes de error antes de intentar el login

    // Validaciones básicas: campos vacíos
    if (!username || !password) {
      setErrorMessage('Por favor, ingrese su usuario y contraseña.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/usuarios/login/', {
        username,
        password,
      });

      const { access } = response.data;

      if (access) {
        localStorage.setItem('token', access); // Guarda el token en localStorage
        setAuthToken(access); // Actualiza el estado del token en el componente principal
        navigate('/dashboard'); // Redirige al dashboard
      } else {
        setErrorMessage('No se recibió un token. Intente nuevamente.');
      }
    } catch (error) {
      console.error('Error de autenticación:', error);

      // Manejar errores específicos del servidor
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage('Usuario o contraseña incorrectos.');
        } else {
          setErrorMessage('Error del servidor. Intente más tarde.');
        }
      } else {
        setErrorMessage('No se pudo conectar con el servidor.');
      }
    }
  };

  return (
    <MainLayout>
      <div
        className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/fondo.jpg')" }}
      >
        <div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
  
          {/* Mostrar mensaje de error si existe */}
          {errorMessage && (
            <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">
              {errorMessage}
            </div>
          )}
  
          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-lg"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">👤</span>
            </div>
            <div className="relative mb-6">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-lg"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">🔒</span>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white text-lg font-semibold rounded-md hover:bg-teal-700 transition-colors"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  ); 
};

export default Login;
