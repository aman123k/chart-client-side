import React from "react";
import Sidebar from "../components/Sidebar";
import ChartContainer from "../components/ChartContainer";

function Dashboard() {
  return (
    <div className=" h-[100dvh] overflow-scroll flex ">
      <Sidebar />
      <ChartContainer />
    </div>
  );
}

export default Dashboard;
