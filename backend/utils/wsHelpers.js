const Message = require("../models/Message");

const rooms = {}; // { roomId: Set of clients }

function joinRoom(ws, { roomId, user }) {
  if (!rooms[roomId]) {
    rooms[roomId] = new Set();
  }
  ws.roomId = roomId;
  ws.user = user; // Save user info on the socket

  rooms[roomId].add(ws);

  console.log(`🚪 User ${user.name} joined room: ${roomId}`);

  // Notify others
  broadcastToRoom(roomId, {
    type: 'USER_JOINED',
    payload: { user }
  });
}

function broadcastMessage(ws, { roomId, message }) {
  const payload = {
    type: 'NEW_MESSAGE',
    payload: {
      user: ws.user,
      message,
      timestamp: new Date()
    }
  };

  broadcastToRoom(roomId, payload);

  // save message to database (if needed)

  Message.create({ roomId, sender: ws.user, content:message})
}

function leaveRoom(ws) {
  const roomId = ws.roomId;
  if (roomId && rooms[roomId]) {
    rooms[roomId].delete(ws);

    console.log(`🚪 User ${ws.user?.name} left room: ${roomId}`);

    // Notify others
    broadcastToRoom(roomId, {
      type: 'USER_LEFT',
      payload: { user: ws.user }
    });

    if (rooms[roomId].size === 0) {
      delete rooms[roomId]; // Clean up empty rooms
    }
  }
}

function broadcastToRoom(roomId, message) {
  if (!rooms[roomId]) return;
  const data = JSON.stringify(message);

  for (const client of rooms[roomId]) {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(data);
    }
  }
}

module.exports = {
  joinRoom,
  broadcastMessage,
  leaveRoom,
};
