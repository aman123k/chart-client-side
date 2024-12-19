import React from "react";
import useRetrieveChart from "../CustomHook/RetrieveChart";
import BarChat from "./BarChat";
import SwotChart from "./SwotChart";
import Relevance from "./Relevance";
import CountryAndTopicChart from "./CountryAndTopicChart";
import Likelihood from "./Likelihood";

function ChartContainer() {
  const { chartData, loading } = useRetrieveChart();

  const filterOptions = {
    sector: [...new Set(chartData?.map((item) => item.sector).filter(Boolean))],
    end_year: [
      ...new Set(chartData.map((item) => item.end_year).filter(Boolean)),
    ],
    pestles: [...new Set(chartData.map((item) => item.pestle).filter(Boolean))],
    countries: [
      ...new Set(chartData.map((item) => item.country).filter(Boolean)),
    ],
    topics: [...new Set(chartData.map((item) => item.topic).filter(Boolean))],
    regions: [...new Set(chartData.map((item) => item.region).filter(Boolean))],
    sources: [...new Set(chartData.map((item) => item.source).filter(Boolean))],
  };

  return loading ? (
    <div className=" w-[100%] h-[100%] flex items-center justify-center">
      <span class="loader"></span>
    </div>
  ) : (
    <section className=" w-[100%] h-[100%] overflow-scroll ">
      <header className=" py-4 px-6 border-b">
        <h1 className=" text-2xl font-roboto text-[#000000] font-semibold">
          My Dashboard
        </h1>
      </header>

      <BarChat chartData={chartData} filterOptions={filterOptions} />
      <SwotChart chartData={chartData} />
      <Relevance chartData={chartData} filterOptions={filterOptions} />
      <CountryAndTopicChart
        chartData={chartData}
        filterOptions={filterOptions}
      />
      <Likelihood chartData={chartData} filterOptions={filterOptions} />
    </section>
  );
}

export default ChartContainer;
