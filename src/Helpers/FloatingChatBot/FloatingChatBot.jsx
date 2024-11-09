import React, { useState } from 'react';
import ChatBotPage from '../../Pages/chatbot/chatbot';
import styles from './FloatingChatBot.module.css'; // Importa el CSS Módulo

function FloatingChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  // Alterna la visibilidad del chatbot
  const toggleChatBot = () => setIsOpen(prevState => !prevState);

  return (
    <>
      <div className={styles.floatingChatbot} onClick={toggleChatBot} aria-label="Abrir Chatbot">
        {/* Ícono o esfera flotante */}
        <div className={styles.sphere}></div>
      </div>
      {isOpen && (
        <div className={styles.chatbotWindow}>
          <ChatBotPage />
          <button
            className={styles.closeButton}
            onClick={toggleChatBot}
            aria-label="Cerrar Chatbot"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}

export default FloatingChatBot;
