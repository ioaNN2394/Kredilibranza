import React, { useState } from 'react';
import ChatBotPage from '../../pages/chatbot/chatbot';
import './FloatingChatBot.css';


function FloatingChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  // Alterna la visibilidad del chatbot
  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón flotante que abre/cierra el chatbot */}
      <div className="floating-chatbot" onClick={toggleChatBot}>
        <div className="sphere"></div>
      </div>

      {/* Ventana del chatbot */}
      {isOpen && (
        <div className="chatbot-window">
          <ChatBotPage />
          <button className="close-button" onClick={toggleChatBot}>×</button>
        </div>
      )}
    </>
  );
}

export default FloatingChatBot;
