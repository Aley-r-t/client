import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import Navbar from '../components/Navbar';  // Asegúrate de importar el Navbar

const FacturaHistorial = () => {
  const [facturas, setFacturas] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/facturas/')
      .then((response) => setFacturas(response.data))
      .catch((error) => console.error("Error al cargar las facturas", error));
  }, []);

  // Exportar historial de facturas a PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    facturas.forEach((factura, index) => {
      doc.text(`Factura #${factura.id} - Cliente: ${factura.cliente} - Monto: $${factura.monto_total}`, 10, 10 + index * 10);
    });
    doc.save('facturas_historico.pdf');
  };

  // Exportar historial de facturas a Excel
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(facturas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Historial de Facturas");
    XLSX.writeFile(wb, 'facturas_historico.xlsx');
  };

  // Importar archivo Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);
        console.log(json);  // Aquí puedes agregar lógica para procesar los datos importados
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-5xl mx-auto mt-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Historial de Facturas</h2>

        <table className="min-w-full table-auto mb-6">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Cliente</th>
              <th className="py-2 px-4 border-b">Monto</th>
              <th className="py-2 px-4 border-b">Estado</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.id}>
                <td className="py-2 px-4 border-b">{factura.id}</td>
                <td className="py-2 px-4 border-b">{factura.cliente}</td>
                <td className="py-2 px-4 border-b">${factura.monto_total}</td>
                <td className="py-2 px-4 border-b">{factura.estado}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                    onClick={() => window.location.href = `/facturas/${factura.id}`}
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between">
          <button onClick={handleExportPDF} className="bg-green-500 text-white py-2 px-4 rounded mr-2 hover:bg-green-600">
            Exportar a PDF
          </button>
          <button onClick={handleExportExcel} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
            Exportar a Excel
          </button>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="bg-gray-300 text-black py-2 px-4 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default FacturaHistorial;
