import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available for Pie Chart</p>;
  }
  const chartData = {
    labels: data.map((item) => item.price), 
    datasets: [
      {
        label: 'Volume',
        data: data.map((item) => item.volume),
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)', 'rgba(255,159,64,0.6)'], 
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
