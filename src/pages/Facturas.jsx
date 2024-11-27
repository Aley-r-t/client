import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileInvoice, FaHistory, FaPlusCircle } from 'react-icons/fa';  // Iconos
import Navbar from '../components/Navbar';  // Asegúrate de importar el Navbar

const Facturas = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />



      {/* Contenido principal */}
      <div className="p-6 max-w-4xl mx-auto mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Crear Factura */}
          <Link 
            to="/facturas/crear" 
            className="flex items-center justify-center py-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaPlusCircle className="text-3xl mr-2" />
            <span className="text-lg">Crear Factura</span>
          </Link>

          {/* Historial de Facturas */}
          <Link 
            to="/facturas/historial" 
            className="flex items-center justify-center py-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaHistory className="text-3xl mr-2" />
            <span className="text-lg">Historial de Facturas</span>
          </Link>

          {/* Detalles de Factura */}
          <Link 
            to="/facturas/1" 
            className="flex items-center justify-center py-4 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaFileInvoice className="text-3xl mr-2" />
            <span className="text-lg">Detalles de Factura</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Facturas;
