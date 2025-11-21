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
      <div className="background-pattern"></div>
      <div className="chat-container">
        <div className="chat-header">
          <div className="header-content">
            <div className="header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="header-text">
              <h1>Cities Game</h1>
              <p className="subtitle">Alice & Bob are playing</p>
            </div>
          </div>
          <div className="header-status">
            <div className="status-indicator"></div>
            <span>Live</span>
          </div>
        </div>
        
        <div className="messages-container">
          <div className="messages-wrapper">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'Alice' ? 'message-alice' : 'message-bob'}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="message-content">
                  <Avatar name={message.sender} size={44} />
                  <div className="message-bubble-wrapper">
                    <div className="message-sender-name">{message.sender}</div>
                    <div className="message-bubble">
                      <span className="message-text">{message.text}</span>
                    </div>
                    <div className="message-time">
                      {new Date(message.id).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {typing && (
              <div
                className={`message ${typing === 'Alice' ? 'message-alice' : 'message-bob'} message-typing`}
              >
                <div className="message-content">
                  <Avatar name={typing} size={44} />
                  <div className="message-bubble-wrapper">
                    <div className="message-sender-name">{typing}</div>
                    <div className="typing-indicator">
                      <div className="typing-bubble">
                        <span className="typing-text">{typing} is typing</span>
                        <div className="typing-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} className="messages-end" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
