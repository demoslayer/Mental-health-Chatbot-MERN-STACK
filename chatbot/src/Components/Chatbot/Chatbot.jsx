
import React, { useState } from 'react';
import './Chatbot.css';
import { Link } from 'react-router-dom';
// import SpeechToText from '../SpeechToText/SpeechToText';

function App() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
      const data = await response.json();
      const botMessage = data.response;
      setChatHistory([
        ...chatHistory,
        { role: 'user', message: userInput },
        { role: 'bot', message: botMessage },
      ]);
      setUserInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <h1>WellBot</h1>
        <div className="chat-history">
          {chatHistory.map((item, index) => (
            <div key={index} className={`message ${item.role}`}>
              {item.message}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={userInput}
            onChange={handleChange}
            placeholder="Enter your message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <Link to='/booking'><button>Book a Session</button></Link>
      {/* <Link to='/speech'><button>Try Speech</button></Link> */}
    </div>
  );
}

export default App;
