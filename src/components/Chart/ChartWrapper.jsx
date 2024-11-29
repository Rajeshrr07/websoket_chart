import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const ChartWrapper = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    <LineChart />
    <BarChart />
    <PieChart />
  </div>
);

export default ChartWrapper;
