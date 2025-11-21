import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Avatar from './components/Avatar';
import { getRandomCity } from './citiesData';

function App() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(null); // 'Alice' or 'Bob' or null
  const [recentCities, setRecentCities] = useState([]);
  const messagesEndRef = useRef(null);
  const conversationStarted = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  useEffect(() => {
    if (conversationStarted.current) return;
    conversationStarted.current = true;

    // Start the conversation with Alice sending the first message
    const startConversation = () => {
      const firstCity = getRandomCity([]);
      setMessages([{ sender: 'Alice', text: firstCity, id: Date.now() }]);
      setRecentCities([firstCity]);
      
      // Start the alternating conversation loop
      setTimeout(() => {
        sendNextMessage('Bob', [firstCity]);
      }, 3000 + Math.random() * 2000); // 3-5 seconds
    };

    startConversation();
  }, []);

  const sendNextMessage = (sender, currentRecentCities) => {
    // Show typing indicator
    setTyping(sender);
    
    // Random delay between 3-5 seconds
    const delay = 3000 + Math.random() * 2000;
    
    setTimeout(() => {
      // Get a random city (avoiding recent ones)
      const city = getRandomCity(currentRecentCities);
      
      // Update recent cities (keep last 5)
      const updatedRecentCities = [...currentRecentCities, city].slice(-5);
      setRecentCities(updatedRecentCities);
      
      // Add the message
      setMessages(prev => [...prev, { 
        sender, 
        text: city, 
        id: Date.now() 
      }]);
      
      // Hide typing indicator
      setTyping(null);
      
      // Determine next sender (alternating)
      const nextSender = sender === 'Alice' ? 'Bob' : 'Alice';
      
      // Schedule next message
      setTimeout(() => {
        sendNextMessage(nextSender, updatedRecentCities);
      }, 3000 + Math.random() * 2000);
    }, delay);
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-header">
          <h1>Cities Chat</h1>
          <p className="subtitle">Alice and Bob are playing the cities game</p>
        </div>
        
        <div className="messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'Alice' ? 'message-alice' : 'message-bob'}`}
            >
              <div className="message-content">
                <Avatar name={message.sender} size={40} />
                <div className="message-bubble">
                  <span className="message-text">{message.text}</span>
                </div>
              </div>
            </div>
          ))}
          
          {typing && (
            <div
              className={`message ${typing === 'Alice' ? 'message-alice' : 'message-bob'}`}
            >
              <div className="message-content">
                <Avatar name={typing} size={40} />
                <div className="typing-indicator">
                  <span className="typing-text">{typing} is typing</span>
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}

export default App;
