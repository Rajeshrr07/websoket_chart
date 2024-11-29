import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import ChartWrapper from "./components/Chart/ChartWrapper";
import Filters from "./components/Filters";
import MetricsCard from "./components/MetricsCard";
import { useDashboardStore}  from "./store/dashboardStore";

const App = () => {
  const { metrics, isLoading, error, fetchMetrics } = useDashboardStore();

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <div className="p-4 max-w-7xl mx-auto">
        <Filters />
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!isLoading && !error && (
          <>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {metrics.map((metric, index) => (
                <MetricsCard key={index} metric={metric} />
              ))}
            </div>
            <ChartWrapper />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
