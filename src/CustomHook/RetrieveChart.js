import { useEffect, useState } from "react";

const useRetrieveChart = (filters) => {
  const [chartData, setChartData] = useState([]);
  const [filterOption, setFilterOptions] = useState([]);

  const retrieveChart = async () => {
    try {
      const response = await fetch(
        // `http://localhost:8000/reciveChart?year=${end_year}&topics=${topics}&sector=${sector}&region=${region}&Source=${source}&SWOT=${swot}&PEST=${pest}&Country=${country}`
        "http://localhost:8000/reciveChart"
      );
      const json = await response.json();
      setChartData(json.data);
      setFilterOptions(json.filter);
      return json;
    } catch (err) {
      console.log("Error while fetching chart", err);
    }
  };

  useEffect(() => {
    retrieveChart();
  }, []);

  return { chartData, filterOption };
};
export default useRetrieveChart;
