import { WebSocketServer } from 'ws'; 
import jwt from 'jsonwebtoken';
import Message from '../backend/models/Message.js'; 
import connectDB from '../backend/db.js';


const users = [];
const rooms = [];


// Connect to MongoDB
connectDB();

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, req) {
    const url = req.url;

    if (!url) {
        ws.close();
        return;
    }

    const queryParam = new URLSearchParams(url.split('?')[1]);
    const userId = queryParam?.get('userId') ?? '';

    if (!userId) {
        ws.close();
        return;
    }

    users.push({
        ws: ws,
        userId,
        rooms: [],
    });

    ws.on('message', async (data) => {
        const parsedData = JSON.parse(data);
        const { type, roomId } = parsedData;

        if (type === 'join') {
            if (!rooms.includes(roomId)) {
                rooms.push(roomId);
            }
            const user = users.find(user => user.userId === userId);
            if (user && !user.rooms.includes(roomId)) {
                user.rooms.push(roomId);
            }
            ws.send(JSON.stringify({ type: 'joined', roomId }));
        }

        if (type === 'leave_room') {
            const user = users.find(x => x.ws === ws);
            if (user) {
                user.rooms = user.rooms.filter(x => x !== roomId);
            }
        }

        if (type === 'chat') {
            const message = parsedData.message;
            const senderId = userId;

            const chat = new Message({
                room: roomId,
                sender: senderId,
                content: message,
            });

            try {
                await chat.save();
            } catch (err) {
                console.error('Error saving message:', err);
            }

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: 'chat',
                        roomId,
                        senderId,
                        message,
                    }));
                }
            });
        }
    });

    ws.on('close', () => {
        const index = users.findIndex(user => user.ws === ws);
        if (index !== -1) {
            users.splice(index, 1);
        }
    });
});

