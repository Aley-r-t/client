import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';
import Navbar from '../components/Navbar';  // Asegúrate de importar el Navbar

const FacturaCrear = () => {
  const [cliente, setCliente] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [monto, setMonto] = useState('');
  const [productos, setProductos] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/facturas/', {
        cliente,
        fecha_vencimiento: fechaVencimiento,
        monto,
        productos
      });
      navigate('/facturas');
    } catch (error) {
      console.error('Error al crear factura:', error);
    }
  };

  // Exportar factura a PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Factura para: ${cliente}`, 10, 10);
    doc.text(`Fecha de vencimiento: ${fechaVencimiento}`, 10, 20);
    doc.text(`Monto: $${monto}`, 10, 30);
    doc.text(`Productos: ${productos}`, 10, 40);
    doc.save(`factura_${cliente}.pdf`);
  };

  // Exportar factura a Excel
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet([{ cliente, fechaVencimiento, monto, productos }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Factura");
    XLSX.writeFile(wb, `factura_${cliente}.xlsx`);
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto mt-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Crear Factura</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium">Cliente</label>
            <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} className="border p-2 w-full" required />
          </div>
          <div>
            <label className="block font-medium">Fecha de Vencimiento</label>
            <input type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} className="border p-2 w-full" required />
          </div>
          <div>
            <label className="block font-medium">Monto</label>
            <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} className="border p-2 w-full" required />
          </div>
          <div>
            <label className="block font-medium">Productos</label>
            <input type="text" value={productos} onChange={(e) => setProductos(e.target.value)} className="border p-2 w-full" required />
          </div>

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600">Crear Factura</button>
        </form>

        <div className="mt-6 flex justify-between">
          <button onClick={handleExportPDF} className="bg-green-500 text-white py-2 px-4 rounded mr-2 hover:bg-green-600">Exportar a PDF</button>
          <button onClick={handleExportExcel} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Exportar a Excel</button>
        </div>
      </div>
    </div>
  );
};

export default FacturaCrear;
