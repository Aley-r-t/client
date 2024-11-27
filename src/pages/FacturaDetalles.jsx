import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';  // Asegúrate de importar el Navbar

const FacturaDetalles = () => {
  const { id } = useParams();  // Obtener el ID de la factura desde la URL
  const [factura, setFactura] = useState(null);

  // Fetch de los detalles de la factura usando el ID
  useEffect(() => {
    axios.get(`http://localhost:8000/api/facturas/${id}`)
      .then((response) => setFactura(response.data))
      .catch((error) => console.error("Error al obtener los detalles de la factura", error));
  }, [id]);

  // Si la factura no está cargada, mostrar un mensaje de carga
  if (!factura) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Cargando detalles...</h2>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Detalles de la Factura #{factura.numero_factura}</h2>

        <div className="mb-4">
          <strong className="text-gray-700">Cliente:</strong> {factura.cliente ? factura.cliente.nombre : 'N/A'}
        </div>

        <div className="mb-4">
          <strong className="text-gray-700">Fecha de Vencimiento:</strong> {factura.fecha_vencimiento}
        </div>

        <div className="mb-4">
          <strong className="text-gray-700">Monto Total:</strong> ${factura.monto_total}
        </div>

        <div className="mb-4">
          <strong className="text-gray-700">Estado:</strong> {factura.estado}
        </div>

        <div className="mb-4">
          <strong className="text-gray-700">Tipo:</strong> {factura.tipo}
        </div>

        {/* Agregar más detalles si es necesario */}
        <div className="mt-4 text-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => window.history.back()} // Regresar a la página anterior
          >
            Volver al Historial
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacturaDetalles;
