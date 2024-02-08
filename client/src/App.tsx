import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

function App() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const room: string | null = new URLSearchParams(document.location.search).get(
    "room"
  );

  useEffect(() => {
    const onMessage = (message: string) => {
      setMessages((messages) => [...messages, message]);
    };
    socket.on("groupMessageClient", onMessage);

    return () => {
      socket.off("groupMessageClient", onMessage);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message && room) {
      const data = {
        room,
        message,
      };

      socket.emit("joinRoom", room);
      socket.emit("groupMessage", data);
      setMessage("");
    }
  };

  return (
    <div>
      <div>Room: {room}</div>
      <button
        onClick={() => {
          
        }}
      >
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          placeholder="Your message"
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
