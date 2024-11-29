import { useEffect } from "react";
import { useDashboardStore } from "../store/dashboardStore";

const useWebSocket = (url) => {
  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      useDashboardStore.getState().setMetrics(data);
    };

    ws.onerror = () => {
      useDashboardStore.getState().setError("WebSocket connection error");
    };

    ws.onclose = () => {
      console.warn("WebSocket closed.");
    };

    return () => ws.close();
  }, [url]);
};

export default useWebSocket;
