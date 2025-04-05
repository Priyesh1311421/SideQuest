import { useState, useEffect, useRef } from 'react';

const ChatRoom = ({ name,userId, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    // Connect to WebSocket server
    ws.current = new WebSocket(`ws://localhost:8080?userId=${userId}`);

    ws.current.onopen = () => {
      console.log('Connected to WebSocket');

      // Join the room when connection opens
      ws.current.send(JSON.stringify({ type: 'join', roomId }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'chat') {
        setMessages(prev => [...prev, { senderId: data.senderId, message: data.message }]);
      }

      if (data.type === 'joined') {
        console.log(`Joined room ${data.roomId}`);
      }
    };

    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    return () => {
      if (ws.current.readyState === WebSocket.OPEN) {
        // Leave the room before disconnecting
        ws.current.send(JSON.stringify({ type: 'leave_room', roomId }));
        ws.current.close();
      }
    };
  }, [userId, roomId]);

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'chat', roomId, message: newMessage }));
      setNewMessage('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chat Room: {name}</h1>

      <div className="border rounded p-4 h-64 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.senderId === userId ? 'text-right' : 'text-left'}`}>
            <span className="inline-block bg-blue-100 p-2 rounded">
              <strong>{msg.senderId === userId ? 'You' : msg.senderId}:</strong> {msg.message}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
