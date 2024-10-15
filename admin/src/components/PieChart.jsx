import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register the required components with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

/**
 * A React component that renders a pie chart. The chart is responsive and
 * scales when the component is hovered.
 *
 * @param {Object} data - The data for the chart, as expected by the
 *   `react-chartjs-2` library.
 * @param {string} title - The title of the chart.
 */

const PieChart = ({ data, title }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 transition-all duration-300 transform hover:scale-105 max-w-full mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
      <h3 className="text-lg font-medium text-gray-700 text-center mb-4">
        {title}
      </h3>
      <div className="flex justify-center items-center h-64 sm:h-72 md:h-80 lg:h-96">
        <Pie data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default PieChart;
