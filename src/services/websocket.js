const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

server.on("connection", (socket) => {
  console.log("Client connected");

  // Send mock data every 5 seconds
  setInterval(() => {
    const mockData = [
      { id: 1, name: "Metric A", value: Math.random() * 100 },
      { id: 2, name: "Metric B", value: Math.random() * 100 },
      { id: 3, name: "Metric C", value: Math.random() * 100 },
    ];
    socket.send(JSON.stringify(mockData));
  }, 5000);

  // Handle disconnection
  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
