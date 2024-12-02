import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available for Line Chart</p>;
  }
  const chartData = {
    labels: data.map((item) => item.price),
    datasets: [
      {
        label: 'Volume',
        data: data.map((item) => item.volume),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineChart;
