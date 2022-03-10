import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ chartData }) => {
  const options = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 50
      },
    },
  };
  return <Radar data={chartData} options={options} />;
};

export default RadarChart;
