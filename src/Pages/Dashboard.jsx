import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from '../hooks/useWebSocket';
import useOrderBookStore from '../store/orderBookStore';
import LineChart from '../components/Charts/LineChart';
import BarChart from '../components/Charts/BarChart';
import PieChart from '../components/Charts/PieChart';
import WebSocketAlert from '../components/WebSocketAlert';
import { Filter } from '../components/Filters';
import '../App.css';

const Dashboard = () => {
  const { orderBook, buyDetails, sellDetails, connectionStatus, searchTerm, timeframe } = useOrderBookStore((state) => ({
    orderBook: state.orderBook,
    buyDetails: state.buyDetails,
    sellDetails: state.sellDetails,
    connectionStatus: state.connectionStatus,
    searchTerm: state.searchTerm,
    timeframe: state.timeframe,
  }));


  useWebSocket('ws://localhost:8080');
  const navigate = useNavigate();

  const handleChartClick = (chartType) => {
    navigate('/details', {
      state: {
        chartType,
        orderBook,
        buyDetails,
        sellDetails,
      },
    });
  };

  const filteredBids = orderBook.bids.filter((item) =>
    item.orderId.includes(searchTerm)
  );

  const filteredAsks = orderBook.asks.filter((item) =>
    item.orderId.includes(searchTerm)
  );

  const [filters, setFilters] = useState(['line', 'bar', 'pie']);

  return (
    <div className="p-8 bg-gray-100 min-h-screen" data-testid="dashboard">
      <WebSocketAlert status={connectionStatus}  />
      <Filter
        filters={filters}
        setFilters={setFilters}
        setTimeframe={useOrderBookStore((state) => state.setTimeframe)}
        setSearchTerm={useOrderBookStore((state) => state.setSearchTerm)}
        
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 cursor-pointer" data-testid="charts-container">
        <div className="transition-all transform hover:translate-y-1 hover:shadow-2xl" data-testid="bids-section">
          <h2 className="text-xl font-semibold text-red-500 mb-4">Order Book (Bids)</h2>
          {filters.includes('line') && (
            <div
              className="mb-6 bg-white shadow-lg rounded-xl p-6"
              onClick={() => handleChartClick('line')}
              data-testid="line-chart-bids"
            >
              <LineChart data={filteredBids || orderBook.bids} />
            </div>
          )}
          {filters.includes('bar') && (
            <div
              className="bg-white shadow-lg mb-6 rounded-xl p-6"
              onClick={() => handleChartClick('bar')}
              data-testid="bar-chart-bids"
            >
              <BarChart data={filteredBids || orderBook.bids} />
            </div>
          )}
          {filters.includes('pie') && (
            <div
              className="bg-white shadow-lg mb-6 rounded-xl p-6"
              onClick={() => handleChartClick('pie')}
              data-testid="pie-chart-bids"
            >
              <PieChart data={filteredBids || orderBook.bids} />
            </div>
          )}
        </div>

        <div className="hover:translate-y-1 hover:shadow-2xl cursor-pointer" data-testid="asks-section">
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Order Book (Asks)</h2>
          {filters.includes('line') && (
            <div
              className="mb-6 bg-white shadow-lg rounded-xl p-6 transition-all transform"
              onClick={() => handleChartClick('line')}
              data-testid="line-chart-asks"
            >
              <LineChart data={filteredAsks || orderBook.asks} />
            </div>
          )}
          {filters.includes('bar') && (
            <div
              className="mb-6 bg-white shadow-lg rounded-xl p-6 transition-all transform"
              onClick={() => handleChartClick('bar')}
              data-testid="bar-chart-asks"
            >
              <BarChart data={filteredAsks || orderBook.asks} />
            </div>
          )}
          {filters.includes('pie') && (
            <div
              className="bg-white shadow-lg rounded-xl p-6 transition-all transform"
              onClick={() => handleChartClick('pie')}
              data-testid="pie-chart-asks"
            >
              <PieChart data={filteredAsks || orderBook.asks} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
