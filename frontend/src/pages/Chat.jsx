import ChatRoom from './ChatRoom';

function Chat() {
  const userId = "67f0feff6f924832b0f12733"; // Pass logged-in user's ID
  const roomId = "67f0ff2ecc38e41fecf88c9e"; // Pass the room ID to join

  return (
    <div>
      <ChatRoom userId={userId} roomId={roomId} />
    </div>
  );
}

export default Chat;
