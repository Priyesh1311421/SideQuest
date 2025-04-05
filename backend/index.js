const express = require('express');
const http = require('http');
const cors = require('cors');
const { WebSocketServer } = require('ws');
const connectDB = require('./db');
const apiRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(cors())
app.use('/api', apiRoutes);


// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
