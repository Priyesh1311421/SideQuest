import WebSocket, { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from '@repo/db/db';

const users = []; // Array to track connected users

const wss = new WebSocketServer({ port: 8080 });

function checkUser(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === 'string' || !decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (error) {
    console.error('JWT Error:', error);
    return null;
  }
}

wss.on('connection', (ws, request) => {
  const url = request.url;
  if (!url) {
    ws.close();
    return;
  }

  const queryParam = new URLSearchParams(url.split('?')[1]);
  const token = queryParam.get('token') || '';
  const userId = checkUser(token);

  if (!userId) {
    ws.close();
    return;
  }

  // Register the connected user
  users.push({
    ws: ws,
    userId: userId,
    rooms: [],
  });

  ws.on('message', async (data) => {
    const parsedData = JSON.parse(data);

    if (parsedData.type === 'join_room') {
      console.log('🚪 User joined room:', parsedData.roomId);
      const user = users.find(x => x.ws === ws);
      if (user) {
        user.rooms.push(parsedData.roomId);
      }
    }

    if (parsedData.type === 'leave_room') {
      const user = users.find(x => x.ws === ws);
      if (user) {
        user.rooms = user.rooms.filter(roomId => roomId !== parsedData.roomId);
      }
    }

    if (parsedData.type === 'chat') {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      try {
        const chat = await prismaClient.chat.create({
          data: {
            roomId: roomId,
            userId: userId,
            message: message,
          }
        });

        console.log('💬 New chat saved:', chat);

        // Broadcast message to everyone in the same room
        users.forEach(user => {
          if (user.rooms.includes(roomId)) {
            user.ws.send(JSON.stringify({
              type: 'new_message',
              payload: {
                roomId: roomId,
                message: {
                  id: chat.id,
                  message: chat.message,
                  userId: chat.userId,
                  createdAt: chat.createdAt,
                }
              }
            }));
          }
        });

      } catch (error) {
        console.error('Error saving chat:', error);
      }
    }
  });

  ws.on('close', () => {
    console.log('❌ WebSocket disconnected');
    // Remove user from users array
    const index = users.findIndex(user => user.ws === ws);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});
