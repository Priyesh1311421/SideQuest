const express = require('express');
const http = require('http');
const cors = require('cors');
const { WebSocketServer } = require('ws');
const connectDB = require('./db');
const apiRoutes = require('./routes');
const { joinRoom, broadcastMessage, leaveRoom } = require('./utils/wsHelpers');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Middlewares
app.use(express.json());
app.use(cors())
app.use('/api', apiRoutes);

// WebSocket Logic
wss.on('connection', (ws) => {
  console.log('🛜 New WebSocket Connection');

  ws.on('message', (data) => {
    try {
      const { type, payload } = JSON.parse(data);

      if (type === 'JOIN_ROOM') {
        joinRoom(ws, payload);
      } else if (type === 'SEND_MESSAGE') {
        broadcastMessage(ws, payload);
      }
    } catch (error) {
      console.error('WebSocket Error:', error);
    }
  });

  ws.on('close', () => {
    leaveRoom(ws);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
