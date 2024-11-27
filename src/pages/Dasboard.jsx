import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Bar } from 'react-chartjs-2';
import { FaSignOutAlt } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const generatePdf = async () => {
    const pdf = new jsPDF();
    const content = document.getElementById('dashboard-content');
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
    pdf.save('dashboard.pdf');
  };

  useEffect(() => {
    axiosInstance.get('/dashboard-metrics/')
      .then((response) => setMetrics(response.data))
      .catch((error) => console.error("Error al obtener las métricas:", error));

    axiosInstance.get('/notifications/')
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error("Error al obtener las notificaciones:", error));
  }, []);

  if (!metrics || !notifications) {
    return <div className="text-center text-gray-600">Cargando datos del dashboard...</div>;
  }

  const barChartData = {
    labels: metrics.facturas_por_mes.map((data) => `Mes ${data.issue_date__month}`),
    datasets: [
      {
        label: 'Total por mes',
        data: metrics.facturas_por_mes.map((data) => data.total),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
      <div id="dashboard-content" className="min-h-screen bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard Contable</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200"
          >
            <FaSignOutAlt className="mr-2 inline" />
            Cerrar Sesión
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-700">Total por Cobrar</h3>
            <p className="text-3xl font-semibold text-green-500">${metrics.total_por_cobrar}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-700">Total por Pagar</h3>
            <p className="text-3xl font-semibold text-red-500">${metrics.total_por_pagar}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-700">Total Vencido</h3>
            <p className="text-3xl font-semibold text-yellow-500">${metrics.total_vencido}</p>
          </div>
        </div>

        <button
          onClick={generatePdf}
          className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Generar PDF
        </button>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gráfico de Facturas por Mes</h2>
          <div className="w-full h-72">
            <Bar data={barChartData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notificaciones</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-700">Próximas a vencer:</h3>
              <ul className="list-disc pl-6 space-y-2">
                {notifications.proximas_a_vencer.map((factura) => (
                  <li key={factura.number} className="text-gray-600">
                    Factura {factura.number} - Cliente: {factura.client__name} - Vence el: {factura.due_date}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Vencidas:</h3>
              <ul className="list-disc pl-6 space-y-2">
                {notifications.vencidas.map((factura) => (
                  <li key={factura.number} className="text-gray-600">
                    Factura {factura.number} - Cliente: {factura.client__name} - Venció el: {factura.due_date}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;

