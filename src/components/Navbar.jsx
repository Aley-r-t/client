import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaChartBar, FaFileInvoice, FaSignOutAlt, FaUsers } from 'react-icons/fa'; // Importa el icono de usuarios

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Elimina los tokens de sesión
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Redirige al inicio
        navigate('/');
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo y Links */}
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-2xl font-bold flex items-center" aria-label="Ir al inicio">
                        <FaHome className="inline-block mr-2 text-3xl" />
                        <span>Mi App</span>
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        <Link to="/dashboard" className="hover:bg-blue-700 px-4 py-2 rounded-md transition-colors" aria-label="Ir al Dashboard">
                            <FaChartBar className="inline-block mr-2 text-lg" />
                            Dashboard
                        </Link>
                        <Link to="/facturas" className="hover:bg-blue-700 px-4 py-2 rounded-md transition-colors" aria-label="Ir a las Facturas">
                            <FaFileInvoice className="inline-block mr-2 text-lg" />
                            Facturas
                        </Link>
                        {/* Enlace Clientes */}
                        <Link to="/clientes" className="hover:bg-blue-700 px-4 py-2 rounded-md transition-colors" aria-label="Ir a Clientes">
                            <FaUsers className="inline-block mr-2 text-lg" />
                            Clientes
                        </Link>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-md flex items-center text-white font-semibold transition duration-200"
                        aria-label="Cerrar sesión"
                    >
                        <FaSignOutAlt className="mr-2 text-lg" />
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
