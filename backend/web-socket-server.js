const WebSocket = require('ws');

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (msg) => {
      console.log('Received:', msg.toString());
      // Echo the message back to all clients (already includes user email prefix)
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg.toString());
        }
      });
    });

    ws.send('SYSTEM: Connected to the WebSocket Server.' );
  });

  setInterval(() => {

    const randomMessages = [
      'Notification: body',
      'Message: body',
      'Some alerts: body'
    ];

    const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('SYSTEM: ' + message);
      }
    });
  }, 10000);

  console.log('WebSocket server is ready on the same HTTP server');
};
