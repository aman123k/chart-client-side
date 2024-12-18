import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import classifySWOT from "../Function/classifySWOT";

function SwotChart({ chartData }) {
  const [selectedSWOT, setSelectedSWOT] = useState("All Swot");

  // SWOT Processing Function
  const processSWOTData = (chartData) => {
    const swotCounts = chartData.reduce((acc, item) => {
      const swotCategory = classifySWOT(item);
      acc[swotCategory] = (acc[swotCategory] || 0) + 1;
      return acc;
    }, {});
    return swotCounts;
  };

  // Color schemes
  const swotColors = {
    Strengths: "rgba(75, 192, 192, 0.6)",
    Weaknesses: "rgba(255, 99, 132, 0.6)",
    Opportunities: "rgba(54, 162, 235, 0.6)",
    Threats: "rgba(255, 206, 86, 0.6)",
    Unclassified: "rgba(153, 102, 255, 0.6)",
  };

  // Create chart data with custom colors
  const createChartData = (processedData, colorMap = swotColors) => {
    // Ensure processedData is an object and has keys
    const labels = Object.keys(processedData);
    const dataValues = Object.values(processedData);

    return {
      labels: labels.length > 0 ? labels : ["No Data"], // Default label if no data
      datasets: [
        {
          label: "Count",
          data: dataValues.length > 0 ? dataValues : [0], // Default data if no data
          backgroundColor: labels.map(
            (key) => colorMap[key] || "rgba(201, 203, 207, 0.6)"
          ),
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "SWOT Analysis",
      },
    },
  };

  // Processed data
  const swotData = processSWOTData(chartData);

  // Filtered SWOT data
  const filteredSWOTData =
    selectedSWOT === "All Swot"
      ? swotData
      : { [selectedSWOT]: swotData[selectedSWOT] || 0 };

  return (
    <section className=" px-4 mt-6 flex flex-col gap-4">
      <div className=" flex gap-1.5 flex-col px-6 bg-[#ffff] border-[#f0f0f1] border-2 rounded-xl  py-2">
        <h1 className=" font-roboto py-2.5 text-lg font-medium text-[#434050]">
          SWOT Classification Details
        </h1>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 font-roboto text-[#434050] font-medium text-center">
              <th className="border p-2">SWOT Category</th>
              <th className="border p-2">Count</th>
              <th className="border p-2">Key Characteristics</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(filteredSWOTData).map(([category, count]) => (
              <tr key={category}>
                <td className="border p-2 font-medium text-center">
                  {category}
                </td>
                <td className="border p-2 text-center">{count}</td>
                <td className="border p-2 text-center">
                  {category === "Strengths" &&
                    "High relevance, positive outlook, energy sector"}
                  {category === "Weaknesses" &&
                    "Low relevance, uncertain impact, incomplete data"}
                  {category === "Opportunities" &&
                    "Technological advances, market expansion, emerging sectors"}
                  {category === "Threats" &&
                    "Political risks, war-related topics, potential economic challenges"}
                  {category === "Unclassified" &&
                    "data points not clearly fitting other categories"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className=" flex gap-4">
        <div className="border p-4 rounded-lg w-[50%]">
          <header className=" px-4 flex justify-between items-center">
            <h1 className=" font-roboto py-2.5 text-lg font-medium text-[#434050]">
              SWOT Distribution
            </h1>
            <select
              value={selectedSWOT}
              onChange={(e) => setSelectedSWOT(e.target.value)}
              className="p-2 border rounded text-sm appearance-none outline-none cursor-pointer"
            >
              <option value="All Swot">All</option>
              <option value="Strengths">Strengths</option>
              <option value="Weaknesses">Weaknesses</option>
              <option value="Opportunities">Opportunities</option>
              <option value="Threats">Threats</option>
              <option value="Unclassified">Unclassified</option>
            </select>
          </header>

          <Pie
            data={createChartData(filteredSWOTData)}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: "SWOT Distribution",
                },
              },
            }}
          />
        </div>

        <div className="border p-4 rounded-lg w-[50%]">
          <h1 className=" font-roboto py-2.5 text-lg font-medium text-[#434050]">
            Detailed SWOT Breakdown
          </h1>
          <Bar
            data={createChartData(filteredSWOTData)}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: "SWOT Detailed Analysis",
                },
              },
            }}
          />
        </div>
      </section>
    </section>
  );
}

export default SwotChart;
