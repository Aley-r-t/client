import { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';  // Importa el Navbar aquí
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from 'chart.js';

// Registrar todos los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
);

export default function Dashboard() {
  const [chartInstance, setChartInstance] = useState(null);
  const chartRef = useRef(null);  // Usamos useRef para el canvas

  // Datos de métricas y notificaciones
  const metrics = {
    total_por_cobrar: 12000,
    total_por_pagar: 8000,
    total_vencido: 3000,
    facturas_por_mes: [
      { issue_date__month: 1, total: 2000 },
      { issue_date__month: 2, total: 1800 },
      { issue_date__month: 3, total: 2200 },
      { issue_date__month: 4, total: 2500 },
      { issue_date__month: 5, total: 1900 },
    ],
  };

  const notifications = {
    proximas_a_vencer: [
      { number: 'F123', client__name: 'Cliente A', due_date: '2024-12-15' },
      { number: 'F124', client__name: 'Cliente B', due_date: '2024-12-20' },
    ],
    vencidas: [
      { number: 'F125', client__name: 'Cliente C', due_date: '2024-11-15' },
      { number: 'F126', client__name: 'Cliente D', due_date: '2024-11-10' },
    ],
  };

  // Datos para el gráfico de barras
  const barChartData = {
    labels: metrics.facturas_por_mes.map((data) => `Mes ${data.issue_date__month}`),
    datasets: [
      {
        label: 'Total por mes',
        data: metrics.facturas_por_mes.map((data) => data.total),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Función para calcular las proyecciones de flujo de caja
  const calculateCashFlowProjections = () => {
    return metrics.facturas_por_mes.map((data) => ({
      month: `Mes ${data.issue_date__month}`,
      projected: data.total * 1.1,
    }));
  };

  // Efecto para crear y destruir el gráfico cuando cambien los datos
  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new ChartJS(chartRef.current, {
      type: 'bar',
      data: barChartData,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Facturas por mes' },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChartInstance(newChartInstance);

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [barChartData]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Navbar */}
      <Navbar />

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Contable</h1>

      {/* Sección de métricas */}
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

      {/* Gráfico de Facturas por Mes */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gráfico de Facturas por Mes</h2>
        <div className="w-full h-80 md:h-96 lg:h-[400px]"> {/* Ajuste dinámico del tamaño */}
          <canvas ref={chartRef} className="w-full h-full"></canvas> {/* Asegurarse de que el canvas tenga el tamaño adecuado */}
        </div>
      </div>

      {/* Proyecciones de flujo de caja */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Proyecciones de Flujo de Caja</h2>
        <ul className="space-y-2">
          {calculateCashFlowProjections().map((projection) => (
            <li key={projection.month} className="flex justify-between text-gray-600">
              <span>{projection.month}</span>
              <span className="font-semibold text-indigo-600">${projection.projected.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notificaciones */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notificaciones</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700">Próximas a Vencer</h3>
            <ul>
              {notifications.proximas_a_vencer.map((item) => (
                <li key={item.number} className="text-gray-600">
                  Factura {item.number} - {item.client__name} - Vencimiento: {item.due_date}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Vencidas</h3>
            <ul>
              {notifications.vencidas.map((item) => (
                <li key={item.number} className="text-gray-600">
                  Factura {item.number} - {item.client__name} - Vencimiento: {item.due_date}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
