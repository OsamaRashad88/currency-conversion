import React, { useContext } from "react";
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
import { currencyContext } from "../context/Context";

export default function Charts() {
  const { historicalRatesArray, lastDays } = useContext(currencyContext);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: " historical monthly rate",
      },
    },
  };
  const data = {
    labels: lastDays,
    datasets: [
      {
        label: "historical rate",
        data: historicalRatesArray,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="chart">
      <Line options={options} data={data} />
    </div>
  );
}
