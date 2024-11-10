import React, { useState, useRef, useEffect } from 'react';
import styles from './chatbot.module.css';

function ChatBotPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    const userMessage = { role: 'user', content: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue('');
    try {
      const botResponse = await getBotResponse(inputValue);
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error al obtener respuesta del bot:', error);
      setMessages((prevMessages) => [...prevMessages, { role: 'bot', content: 'Error al obtener respuesta del bot.' }]);
    }
  };

  const getBotResponse = async (message) => {
    try {
      const response = await fetch('http://localhost:8000/generate-answer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: message }),
      });
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      return { role: 'bot', content: data.answer };
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatWindow}>
        <div className={styles.messagesContainer}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.role === 'user' ? styles.messageUser : styles.messageBot
              }`}
            >
              {message.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu mensaje..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className={styles.inputField}
          />
          <button onClick={handleSendMessage} className={styles.sendButton}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBotPage;
