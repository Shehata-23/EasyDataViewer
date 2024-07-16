/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CustomersGraph({ data }) {
  const chartData = {
    labels: data.dates || [],
    datasets: data.dataSets || [],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Transaction total Amounts per Day",
      },
    },
  };
  return (
    <div className="bg-slate-200 w-full min-w-96 min-h-96 flex flex-col gap-4 justify-center items-center rounded-lg p-3 my-3 overflow-x-auto">
      <div className="w-full p-2">
        <Line className="w-full m-auto" data={chartData} options={options} />
      </div>
    </div>
  );
}
