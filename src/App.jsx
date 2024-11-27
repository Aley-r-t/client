import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Facturas from './pages/Facturas';
import Clientes from './pages/Clientes';
import FacturaCrear from './pages/FacturaCrear';
import FacturaDetalles from './pages/FacturaDetalles';
import FacturaHistorial from './pages/FacturaHistorial';
import Navbar from './components/Navbar';  // Importa el Navbar
import './App.css';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('access_token'));

  // Efecto para verificar si el usuario está autenticado
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setAuthToken(token);
  }, []);

  return (
    <Router>
      {/* Mostrar el Navbar solo si el usuario está autenticado */}
      {authToken && <Navbar />} {/* El Navbar solo se mostrará si hay un token */}

      <Routes>
        {/* Ruta Login: Si no hay token, redirige a login */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas, no se usa token por ahora */}
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/clientes" element={<Clientes />} />

        {/* Nuevas rutas para la gestión de facturas */}
        <Route path="/facturas/crear" element={<FacturaCrear />} />
        <Route path="/facturas/historial" element={<FacturaHistorial />} />
        <Route path="/facturas/:id" element={<FacturaDetalles />} />
      </Routes>
    </Router>
  );
}

export default App;
