import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

function BarChat({ chartData, filterOptions }) {
  const [filters, setFilters] = useState({
    end_year: "",
    sector: "",
  });

  const sectorColors = {
    Energy: "hsl(0, 70%, 70%)",
    Environment: "hsl(120, 70%, 70%)",
    Government: "hsl(240, 70%, 70%)",
    "Aerospace & defence": "hsl(60, 70%, 70%)",
    Manufacturing: "hsl(300, 70%, 70%)",
    Retail: "hsl(180, 70%, 70%)",
    "Financial services": "hsl(30, 70%, 70%)",
    "Support services": "hsl(150, 70%, 70%)",
    "Information Technology": "hsl(210, 70%, 70%)",
    Healthcare: "hsl(270, 70%, 70%)",
    "Food & agriculture": "hsl(90, 70%, 70%)",
    Automotive: "hsl(330, 70%, 70%)",
    "Tourism & hospitality": "hsl(15, 70%, 70%)",
    Construction: "hsl(45, 70%, 70%)",
    Security: "hsl(75, 70%, 70%)",
    Transport: "hsl(105, 70%, 70%)",
    Water: "hsl(195, 70%, 70%)",
    "Media & entertainment": "hsl(255, 70%, 70%)",
  };

  const [filteredData, setFilteredData] = useState(chartData);

  // Filter data based on selected criteria
  useEffect(() => {
    const filtered = chartData?.filter(
      (item) =>
        (!filters.sector || item.sector === filters.sector) &&
        (!filters.end_year ||
          !item.end_year ||
          item.end_year <= filters.end_year)
    );
    setFilteredData(filtered);
  }, [chartData, filters]);

  //   Intensity by Sector Chart
  const intensityBySectorData = (() => {
    // Filter labels and data based on the filter
    const filteredSectors = filterOptions.sector.filter((sector) =>
      filters.sector ? sector === filters.sector : true
    );

    const data = filteredSectors.map((sector) => {
      const sectorData = filteredData.filter((item) => item.sector === sector);

      // Calculate average intensity
      return sectorData.length > 0
        ? sectorData.reduce((sum, item) => sum + +item.intensity, 0) /
            sectorData.length
        : 0; // Default to 0 if no data
    });

    const colors = filteredSectors.map(
      (sector) => sectorColors[sector] || "hsl(0, 0%, 70%)"
    );

    return {
      labels: filteredSectors, // Dynamically filtered labels
      datasets: [
        {
          label: "Average Intensity",
          data: data,
          backgroundColor: colors, // Use the generated colors
        },
      ],
    };
  })();

  return (
    <section
      className="bg-[#fbfbfc] border-2 drop-shadow-sm  border-[#f0f0f1] mx-5 mt-8 rounded-xl py-1.5 px-1.5
flex gap-2"
    >
      <section className=" flex flex-col gap-1.5 w-[70%] bg-[#ffff] border-[#f0f0f1] border-2 rounded-xl overflow-hidden flex-shrink-0 py-2">
        <header className=" px-4 flex justify-between items-center">
          <h1 className=" font-roboto py-2.5 text-lg font-medium text-[#434050]">
            Intensity by Sector
          </h1>
          <section className=" flex items-center gap-4">
            <select
              value={filters.sector}
              onChange={(e) =>
                setFilters({ ...filters, sector: e.target.value })
              }
              className="p-2 border rounded text-sm appearance-none outline-none cursor-pointer"
            >
              <option value="">All Sectors</option>
              {filterOptions.sector.sort().map((sector) => (
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
        <div className="  px-4  py-5 ">
          <Bar
            data={intensityBySectorData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
      </section>
      <section className="w-[100%] border-2 py-2 px-4 rounded-lg border-[#f0f0f1] flex flex-col font-roboto">
        <h2 className="text-lg font-semibold mb-2 font-roboto">
          Average Intensity
        </h2>
        {filterOptions.sector.map((sector) => {
          const sectorData = filteredData.filter(
            (item) => item.sector === sector
          );
          const totalFields = sectorData.length;
          const averageIntensity =
            totalFields > 0
              ? sectorData.reduce((sum, item) => sum + +item.intensity, 0) /
                totalFields
              : 0; // Default to 0 if no data

          const color = sectorColors[sector] || "hsl(0, 0%, 70%)"; // Use defined color or default

          return (
            <div key={sector} className="flex justify-between">
              <span>{sector}</span>
              <span style={{ color }}> {averageIntensity.toFixed(2)}</span>
            </div>
          );
        })}
      </section>
    </section>
  );
}

export default BarChat;
