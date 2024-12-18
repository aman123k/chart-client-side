import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function Relevance({ chartData, filterOptions }) {
  const [filters, setFilters] = useState({
    pestle: "",
  });

  const [filteredData, setFilteredData] = useState(chartData);

  // Relevance by Pestle Pie Chart
  const relevanceByPestleData = {
    labels: filterOptions.pestles,
    datasets: [
      {
        data: filterOptions.pestles.map((pestle) => {
          const relevantItems = filteredData.filter(
            (item) => item.pestle === pestle
          );
          const sum = relevantItems.reduce(
            (sum, item) => sum + item.relevance,
            0
          );
          const average = relevantItems.length ? sum / relevantItems.length : 0; // Avoid division by zero
          return average;
        }),
        label: filters?.pestle ? filters?.pestle : "All Pestle",
      },
    ],
  };

  // Filter data based on selected criteria
  useEffect(() => {
    const filtered = chartData.filter(
      (item) =>
        (!filters.pestle || item.pestle === filters.pestle) &&
        (!filters.end_year ||
          !item.end_year ||
          item.end_year <= filters.end_year)
    );
    setFilteredData(filtered);
  }, [chartData, filters]);

  return (
    <section className=" flex flex-col gap-1.5 bg-[#ffff] mx-4 mt-6 border-[#f0f0f1] border-2 rounded-xl overflow-hidden flex-shrink-0 py-2">
      <header className=" px-4 flex justify-between items-center">
        <h1 className=" font-roboto py-2.5 text-lg font-medium text-[#434050]">
          Relevance by PESTLE
        </h1>
        <section className=" flex items-center gap-4">
          <select
            value={filters.pestle}
            onChange={(e) => setFilters({ ...filters, pestle: e.target.value })}
            className="p-2 border rounded text-sm appearance-none outline-none cursor-pointer"
          >
            <option value="">All PESTLE</option>
            {filterOptions.pestles.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
          <select
            value={filters.end_year}
            onChange={(e) =>
              setFilters({ ...filters, end_year: e.target.value })
            }
            className="p-2 border rounded text-sm appearance-none outline-none cursor-pointer"
          >
            <option value="">End Year</option>
            {filterOptions.end_year.sort().map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </section>
      </header>
      <div className="mx-16">
        <Line
          data={relevanceByPestleData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
            },
            borderColor: "rgb(75, 192, 192)",
          }}
        />
      </div>
    </section>
  );
}

export default Relevance;
