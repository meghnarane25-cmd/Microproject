import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PopulationChart({ countries }) {

  // Sort countries by population (highest first)
  const topCountries = [...countries]
    .filter(country => country.population !== "N/A")
    .sort((a, b) => Number(b.population) - Number(a.population))
    .slice(0, 10);

  const data = {
    labels: topCountries.map(country => country.name),

    datasets: [
      {
        label: "Population",
        data: topCountries.map(country => Number(country.population)),
        backgroundColor: [
          "#4285F4",
          "#EA4335",
          "#FBBC05",
          "#34A853",
          "#9C27B0",
          "#FF9800",
          "#00ACC1",
          "#E91E63",
          "#795548",
          "#607D8B"
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      title: {
        display: true,
        text: "Top 10 Most Populated Countries",
        font: {
          size: 20,
        },
      },

      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container my-4">
      <div className="card shadow p-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default PopulationChart;
