import React from "react";

export const Filter = ({ filters, setFilters, setTimeframe, setSearchTerm }) => {
  const handleFilterChange = (chartType) => {
    setFilters((prevFilters) =>
      prevFilters.includes(chartType)
        ? prevFilters.filter((type) => type !== chartType)
        : [...prevFilters, chartType]
    );
  };

  const handleTimeframeChange = (time) => {
    setTimeframe(time);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-xl p-6 mb-6 max-w-md mx-auto sm:max-w-full"
      data-testid="filter-component"
    >
      <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">Filters</h3>

      {/* Chart Type Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Chart Type</h4>
        <div className="flex flex-wrap gap-4">
          {["line", "bar", "pie"].map((type) => (
            <label
              key={type}
              className="flex items-center space-x-2 text-sm w-full sm:w-auto"
            >
              <input
                type="checkbox"
                checked={filters.includes(type)}
                onChange={() => handleFilterChange(type)}
                className="w-4 h-4"
              />
              <span className="capitalize">{type} Chart</span>
            </label>
          ))}
        </div>
      </div>

      {/* Timeframe Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Time Filter</h4>
        <div className="flex flex-wrap gap-4">
          {["lastHour", "lastDay", "lastWeek"].map((time) => (
            <label
              key={time}
              className="flex items-center space-x-2 text-sm w-full sm:w-auto"
            >
              <input
                type="radio"
                name="timeframe"
                value={time}
                onChange={() => handleTimeframeChange(time)}
                className="w-4 h-4"
              />
              <span className="capitalize">{time.replace("last", "")}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Search Filter */}
      <div>
        <h4 className="text-sm font-medium mb-2">Search</h4>
        <input
          type="text"
          placeholder="Search by Order ID..."
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
    </div>
  );
};
