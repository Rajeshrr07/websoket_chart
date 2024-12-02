import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available for Bar Chart</p>;
  }
  const chartData = {
    labels: data.map((item) => item.price),
    datasets: [
      {
        label: 'Volume',
        data: data.map((item) => item.volume),
        backgroundColor: 'rgba(75,192,192,0.6)', 
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
