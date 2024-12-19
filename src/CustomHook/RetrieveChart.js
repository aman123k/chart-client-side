import { useEffect, useState } from "react";

const useRetrieveChart = (filters) => {
  const [chartData, setChartData] = useState([]);
  const [filterOption, setFilterOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const retrieveChart = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://chart-server-side.onrender.com/reciveChart"
      );
      const json = await response.json();
      setChartData(json.data);
      setFilterOptions(json.filter);
      setLoading(false);
      return json;
    } catch (err) {
      setLoading(false);
      console.log("Error while fetching chart", err);
    }
  };

  useEffect(() => {
    retrieveChart();
  }, []);

  return { chartData, filterOption, loading };
};
export default useRetrieveChart;
