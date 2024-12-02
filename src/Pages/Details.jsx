import React from "react";
import { useLocation } from "react-router-dom";
import LineChart from "../components/Charts/LineChart";
import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";
import useWebSocket from "../hooks/useWebSocket";
import WebSocketAlert from "../components/WebSocketAlert";
import useOrderBookStore from "../store/orderBookStore";

const DetailsPage = () => {
  const location = useLocation();
  const { chartType } = location.state || {};

  const { orderBook, buyDetails, sellDetails, connectionStatus } = useOrderBookStore((state) => ({
    orderBook: state.orderBook || { bids: [], asks: [] },
    buyDetails: state.buyDetails || { totalVolume: [], totalOrders: [] },
    sellDetails: state.sellDetails || { totalVolume: [], totalOrders: [] },
    connectionStatus: state.connectionStatus || "disconnected",
  }));

  useWebSocket("ws://localhost:8080");

  const mapToChartData = (volumes, orders) => {
    if (!volumes || !orders || volumes.length !== orders.length) return [];
    return volumes.map((volume, index) => ({
      price: orders[index],
      volume: parseFloat(volume),
    }));
  };

  const formattedBidData = Array.isArray(orderBook?.bids) ? orderBook.bids : [];
  const formattedAskData = Array.isArray(orderBook?.asks) ? orderBook.asks : [];
  const formattedBuyData = mapToChartData(
    buyDetails?.totalVolume || [],
    buyDetails?.totalOrders || []
  );
  const formattedSellData = mapToChartData(
    sellDetails?.totalVolume || [],
    sellDetails?.totalOrders || []
  );

  const renderChart = (data, ChartComponent) =>
    data.length > 0 ? <ChartComponent data={data} /> : <p className="text-gray-500">No data available</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <WebSocketAlert status={connectionStatus} />
      <h1 className="text-3xl font-bold mb-6 text-center">Order Book Visualizations</h1>
      <p className="text-center text-gray-600 mb-8">
        Explore bid, ask, buy, and sell data with interactive charts.
      </p>
      {!orderBook ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Bids Data</h2>
            {chartType === "bar" && renderChart(formattedBidData, BarChart)}
            {chartType === "line" && renderChart(formattedBidData, LineChart)}
            {chartType === "pie" && renderChart(formattedBidData, PieChart)}
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Asks Data</h2>
            {chartType === "bar" && renderChart(formattedAskData, BarChart)}
            {chartType === "line" && renderChart(formattedAskData, LineChart)}
            {chartType === "pie" && renderChart(formattedAskData, PieChart)}
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center text-green-500">Buy Details</h2>
            {chartType === "bar" && renderChart(formattedBuyData, BarChart)}
            {chartType === "line" && renderChart(formattedBuyData, LineChart)}
            {chartType === "pie" && renderChart(formattedBuyData, PieChart)}
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center text-red-500">Sell Details</h2>
            {chartType === "bar" && renderChart(formattedSellData, BarChart)}
            {chartType === "line" && renderChart(formattedSellData, LineChart)}
            {chartType === "pie" && renderChart(formattedSellData, PieChart)}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
