const WebSocketAlert = ({ status }) => (
    <div
     data-testid="websocket-alert"
      className={`p-2 rounded ${
        status === 'connected' ? 'bg-green-500' : 'bg-red-500'
      } text-white text-center mb-4`}
    >
      {status === 'connected' ? 'WebSocket Connected' : 'WebSocket Disconnected'}
    </div>
  );
  
  export default WebSocketAlert;
  