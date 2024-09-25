import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { div } from 'framer-motion/client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const [year, setYear] = useState<number>(2024);

  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Order Count',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 10, 50, 0, 0],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Total Price',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 1000000, 4500000, 0, 0],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Client Count',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 5, 20, 0, 0],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Yearly Data for ${year}`,
      },
    },
  };

  return (
    <div>
        <div className="flex justify-end m-4">
            <label className="mr-2 text-lg font-bold">Enter Year:</label>
            <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="border rounded px-2 py-1 bg-[#f1f3f5]"
            />
        </div>
        <div className="m-[30px] p-8 bg-[#f1f3f5] rounded-[15px]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Order Count</h2>
                <Line data={{...data, datasets: [data.datasets[0]]}} options={options} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Total Price</h2>
                <Line data={{...data, datasets: [data.datasets[1]]}} options={options} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Client Count</h2>
                <Line data={{...data, datasets: [data.datasets[2]]}} options={options} />
            </div>
        </div>
        </div>

    </div>
  );
};

export default Dashboard;


