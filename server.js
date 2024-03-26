const WebSocket = require("ws");
// Port, auf dem der WebSocket-Server lauscht
const wsPort = 3000; // WebSocket-Server-Port

// WebSocket-Server
const wss = new WebSocket.Server({ port: wsPort });

wss.on("connection", function connection(ws) {
  console.log("Neue WebSocket-Verbindung akzeptiert");

  ws.on("message", function incoming(message) {
    let newMessage = ""
    if (message instanceof Buffer) {
      console.log("Nachricht vom Client:", message.toString());
      newMessage = message.toString();
    } else {
      console.log("Nachricht vom Client:", message);
      newMessage = message
    }
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(newMessage);
      }
    });
  });

  ws.on("close", function close() {
    console.log("WebSocket-Verbindung geschlossen");
  });
});
