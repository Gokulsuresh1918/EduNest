'use client'

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    // Correctly define the cleanup function outside and then call it inside useEffect
    const handleReceiveMessage = (message: string) => {
      setChat((prevChat) => [...prevChat, message]);
    };

    // Setup the event listener
    socket.on('receiveMessage', handleReceiveMessage);

    // Return a cleanup function that removes the event listener
    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, []);

  const sendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    socket.emit('sendMessage', message);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {chat.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
