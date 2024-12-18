import React, { useEffect, useState } from "react";
import { Bar, Pie, PolarArea } from "react-chartjs-2";

function CountryAndTopicChart({ chartData, filterOptions }) {
  const [filteredData, setFilteredData] = useState(chartData);

  const [filters, setFilters] = useState({
    country: "",
    region: "",
    topic: "",
  });

  // Color palette
  const COLORS = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(244, 67, 54, 0.6)",
    "rgba(33, 150, 243, 0.6)",
    "rgba(0, 188, 212, 0.6)",
    "rgba(139, 195, 74, 0.6)",
    "rgba(255, 235, 59, 0.6)",
    "rgba(121, 85, 72, 0.6)",
    "rgba(96, 125, 139, 0.6)",
    "rgba(233, 30, 99, 0.6)",
    "rgba(103, 58, 183, 0.6)",
    "rgba(0, 150, 136, 0.6)",
    "rgba(205, 220, 57, 0.6)",
    "rgba(3, 169, 244, 0.6)",
    "rgba(255, 87, 34, 0.6)",
    "rgba(63, 81, 181, 0.6)",
    "rgba(156, 39, 176, 0.6)",
    "rgba(0, 121, 107, 0.6)",
    "rgba(76, 175, 80, 0.6)",
    "rgba(255, 193, 7, 0.6)",
    "rgba(158, 158, 158, 0.6)",
    "rgba(0, 191, 255, 0.6)",
    "rgba(220, 20, 60, 0.6)",
    "rgba(50, 205, 50, 0.6)",
    "rgba(75, 0, 130, 0.6)",
    "rgba(244, 164, 96, 0.6)",
  ];

  // Filter data based on selected criteria
  useEffect(() => {
    const filtered = chartData.filter(
      (item) =>
        (!filters.country || item.country === filters.country) &&
        (!filters.topic || item.topic === filters.topic) &&
        (!filters.region || item.region === filters.region) &&
        (!filters.end_year || item.end_year <= filters.end_year)
    );
    setFilteredData(filtered);
  }, [filters, chartData]);

  // 1. Country-based Intensity Distribution
  const countryIntensityData = {
    labels: filterOptions.countries,
    datasets: [
      {
        label: "Average Intensity",
        data: filterOptions.countries.map(
          (country) =>
            filteredData
              .filter((item) => item.country === country)
              .reduce((sum, item) => sum + +item.intensity, 0) /
              filteredData.filter((item) => item.country === country).length ||
            0
        ),
        backgroundColor: COLORS,
      },
    ],
  };

  // 2. Topics Pie Chart
  const topicsDistributionData = {
    labels: filterOptions.topics.slice(0, 20),
    datasets: [
      {
        data: filterOptions.topics
          .slice(0, 20)
          .map(
            (topic) =>
              filteredData.filter((item) => item.topic === topic).length
          ),
        backgroundColor: COLORS,
      },
    ],
  };

  // 3. Region Line Chart (Intensity Trend)
  const regionIntensityTrendData = {
    labels: filterOptions.regions,
    datasets: [
      {
        label: "Average Intensity",
        data: filterOptions.regions.map(
          (region) =>
            filteredData
              .filter((item) => item.region === region)
              .reduce((sum, item) => sum + +item.intensity, 0) /
              filteredData.filter((item) => item.region === region).length || 0
        ),
        borderColor: COLORS,
        backgroundColor: COLORS,
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
            Country Intensity Distribution
          </h1>
          <section className="flex items-center gap-4">
            <select
              value={filters.country}
              onChange={(e) =>
                setFilters({ ...filters, country: e.target.value })
              }
              className="p-2 border rounded text-sm appearance-none outline-none cursor-pointer"
            >
              <option value="">All Countries </option>
              {filterOptions.countries.sort().map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <select
              value={filters.topic}
              onChange={(e) =>
                setFilters({ ...filters, topic: e.target.value })
              }
              className="p-2 border rounded text-sm appearance-none outline-none cursor-pointer"
            >
              <option value="">All Topic</option>
              {filterOptions.topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <select
              value={filters.region}
              onChange={(e) =>
                setFilters({ ...filters, region: e.target.value })
              }
              className="p-2 border rounded text-sm appearance-none outline-none cursor-pointer"
            >
              <option value="">All Regions</option>
              {filterOptions.regions.sort().map((region) => (
                <option key={region} value={region}>
                  {region}
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
        <div className="  px-4  py-5 ">
          <Bar
            data={countryIntensityData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
        <section className=" flex">
          <div className="  px-4  py-5 w-[50%]">
            <h1 className=" font-roboto py-2.5 text-lg font-medium text-[#434050]">
              Topics Distribution(Top 20)
            </h1>

            <Pie
              data={topicsDistributionData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "right" },
                },
              }}
            />
          </div>
          <div className="  px-4  py-5 w-[50%]">
            <h1 className=" font-roboto py-2.5 text-lg font-medium text-[#434050]">
              Region Intensity Trend
            </h1>

            <PolarArea
              data={regionIntensityTrendData}
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
    </section>
  );
}

export default CountryAndTopicChart;
