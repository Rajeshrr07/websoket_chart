import { Server } from 'mock-socket';

const startMockServer = () => {
  const mockServer = new Server('ws://localhost:8080');

  mockServer.on('connection', (socket) => {
    console.log('Mock WebSocket server connected.');

    let timeFilter = 'lastHour'; 

   
    socket.on('setTimeFilter', (newFilter) => {
      timeFilter = newFilter;
      console.log(`Time filter set to: ${timeFilter}`);
    });

    const sendMockData = () => {
      const mockData = generateMockData(timeFilter);  

      socket.send(JSON.stringify(mockData));
    };

    const intervalId = setInterval(sendMockData, 1000);

    socket.on('close', () => {
      console.log('Mock WebSocket server disconnected.');
      clearInterval(intervalId);
    });
  });

  console.log('Mock WebSocket server started at ws://localhost:8080');
};

const generateMockData = (timeFilter) => {
  const data = {
    bids: Array.from({ length: 10 }, (_, i) => ({
      price: (50000 - i * 10).toFixed(2),
      volume: (Math.random() * 10).toFixed(2),
      orderId: `BID-${i + 1}`,
      side: 'buy',
    })),
    asks: Array.from({ length: 10 }, (_, i) => ({
      price: (50010 + i * 10).toFixed(2),
      volume: (Math.random() * 10).toFixed(2),
      orderId: `ASK-${i + 1}`,
      side: 'sell',
    })),
    buyDetails: {
      totalVolume: Array.from({ length: 10 }, (_, i) => (Math.random() * 100).toFixed(2)),
      totalOrders: Array.from({ length: 10 }, (_, i) => i + 1),
    },
    sellDetails: {
      totalVolume: Array.from({ length: 10 }, (_, i) => (Math.random() * 100).toFixed(2)),
      totalOrders: Array.from({ length: 10 }, (_, i) => i + 1),
    },
  };

  return data;
};

export default startMockServer;
