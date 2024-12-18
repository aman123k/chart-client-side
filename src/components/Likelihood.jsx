import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register all necessary components
Chart.register(...registerables);

function Likelihood({ chartData, filterOptions }) {
  const [filteredData, setFilteredData] = useState(chartData);

  const [filters, setFilters] = useState({
    region: "",
    sources: "",
  });

  useEffect(() => {
    const filtered = chartData.filter(
      (item) =>
        (!filters.region || item.region === filters.region) &&
        (!filters.sources || item.source === filters.sources) &&
        (!filters.startYear ||
          !item.start_year ||
          item.start_year >= filters.startYear) &&
        (!filters.endYear || !item.end_year || item.end_year <= filters.endYear)
    );
    setFilteredData(filtered);
  }, [filters, chartData]);

  const likelihoodByRegionData = {
    labels: filterOptions.regions,
    datasets: [
      {
        label: "Likelihood",
        data: filterOptions.regions.map((topic) => {
          const topicData = filteredData.filter(
            (item) => item.region === topic
          );
          const totalLikelihood = topicData.reduce(
            (sum, item) => sum + +item.likelihood,
            0
          );
          return topicData.length > 0 ? totalLikelihood / topicData.length : 0; // Calculate average
        }),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return (
    <section
      className="bg-[#fbfbfc] border-2 drop-shadow-sm  border-[#f0f0f1] mx-5 mt-8 rounded-xl py-1.5 px-1.5
  flex gap-2"
    >
      <section className=" flex flex-col gap-1.5 w-[100%] bg-[#ffff] border-[#f0f0f1] border-2 rounded-xl overflow-hidden flex-shrink-0 py-2">
        <header className=" px-4 flex justify-between items-center">
          <h1 className=" font-roboto py-2.5 text-lg font-medium text-[#434050]">
            Likelihood by Region
          </h1>
          <section className=" flex items-center gap-4">
            <select
              value={filters.region}
              onChange={(e) =>
                setFilters({ ...filters, region: e.target.value })
              }
              className="p-2 border rounded text-sm appearance-none outline-none cursor-pointer"
            >
              <option value="">All Region</option>
              {filterOptions.regions.sort().map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <select
              value={filters.sources}
              onChange={(e) =>
                setFilters({ ...filters, sources: e.target.value })
              }
              className="p-2 border rounded text-sm appearance-none outline-none cursor-pointer w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <option value="">All Source</option>
              {filterOptions.sources.sort().map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </section>
        </header>
        <div className="  px-4  py-5 w-[75%] m-auto ">
          <Radar
            data={likelihoodByRegionData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
      </section>
    </section>
  );
}

export default Likelihood;
