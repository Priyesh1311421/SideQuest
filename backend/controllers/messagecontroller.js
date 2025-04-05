const { joinRoom, broadcastMessage, leaveRoom } = require('../utils/wsHelpers');

function handleWebSocketMessages(ws, data) {
  try {
    const parsedData = JSON.parse(data);

    switch (parsedData.type) {
      case 'JOIN_ROOM':
        joinRoom(ws, parsedData.payload);
        break;

      case 'SEND_MESSAGE':
        broadcastMessage(ws, parsedData.payload);
        break;

      case 'LEAVE_ROOM':
        leaveRoom(ws);
        break;

      default:
        console.log('❓ Unknown WebSocket message type');
    }
  } catch (error) {
    console.error('❌ WebSocket Message Handling Error:', error);
  }
}

module.exports = { handleWebSocketMessages };
