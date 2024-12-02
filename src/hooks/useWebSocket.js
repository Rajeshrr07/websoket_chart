import { useEffect } from 'react';
import useOrderBookStore from '../store/orderBookStore';

const useWebSocket = (url, timeframe) => {
  const updateOrderBook = useOrderBookStore((state) => state.updateOrderBook);
  const updateConnectionStatus = useOrderBookStore((state) => state.updateConnectionStatus);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      updateConnectionStatus('connected');
      ws.send(JSON.stringify({ type: 'setTimeFilter', data: timeframe }));  
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      updateOrderBook(data);
    };

    ws.onclose = () => updateConnectionStatus('disconnected');
    ws.onerror = () => updateConnectionStatus('disconnected');

    return () => {
      ws.close();
    };
  }, [url, updateOrderBook, updateConnectionStatus, timeframe]);
};

export default useWebSocket;
