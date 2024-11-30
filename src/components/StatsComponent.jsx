import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Filler,
  Legend,
  Tooltip,
  LineElement,
  PointElement,
  RadialLinearScale,
  Chart as ChartJS,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const StatsComponent = ({ pokemon }) => {
  const baseStats = pokemon?.stats || [];
  const mappedStats = baseStats?.map((p) => {
    return {
      stat: p?.stat?.name,
      percentage: p?.base_stat,
    };
  });

  const data = {
    labels: mappedStats?.map((p) => p?.stat),
    datasets: [
      {
        borderWidth: 2,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        data: mappedStats?.map((p) => p?.percentage),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: "500px", height: "500px" }}>
      <Radar data={data} options={options} />;
    </div>
  );
};
