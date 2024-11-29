import React from "react";
import { useDashboardStore } from "../store/dashboardStore";

const Filters = () => {
  const { setMetrics } = useDashboardStore();

  const handleFilter = async (filter) => {
    // Add filtering logic here
  };

  return (
    <div className="flex space-x-2 mb-4">
      <button className="btn" onClick={() => handleFilter("hour")}>
        Last Hour
      </button>
      <button className="btn" onClick={() => handleFilter("day")}>
        Last Day
      </button>
      <button className="btn" onClick={() => handleFilter("week")}>
        Last Week
      </button>
    </div>
  );
};

export default Filters;
