import { useEffect, useState } from "react";

const useRetrieveChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const retrieveChart = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://chart-server-side.onrender.com/reciveChart"
      );
      const json = await response.json();
      setChartData(json.data);
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

  return { chartData, loading };
};
export default useRetrieveChart;
