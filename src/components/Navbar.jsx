import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaChartBar, FaFileInvoice, FaSignOutAlt } from 'react-icons/fa'; // Iconos

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
    };

    return (
        <nav className="bg-blue-500 text-white p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-xl font-bold">
                        <FaHome className="inline-block mr-2" />
                        Mi App
                    </Link>
                    <Link to="/dasboard" className="hover:bg-blue-600 px-3 py-2 rounded-md">
                        <FaChartBar className="inline-block mr-2" />
                        Dashboard
                    </Link>
                    <Link to="/facturas" className="hover:bg-blue-600 px-3 py-2 rounded-md">
                        <FaFileInvoice className="inline-block mr-2" />
                        Facturas
                    </Link>
                </div>

                <div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md flex items-center"
                    >
                        <FaSignOutAlt className="mr-2" />
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
