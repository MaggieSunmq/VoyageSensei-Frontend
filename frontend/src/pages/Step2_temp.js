import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styling/QueryInput.module.css';
import axios from 'axios'; // Import Axios

function Understand(nextClick) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState([]); // Requirements/Summary data

  // Handle sending a new message
  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, user: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');

      // Send message to backend
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/process_message', {
          message: newMessage.text,
        });

        // Process the response (assuming the backend returns a response from a bot or updates)
        if (response.data && response.data.reply) {
          const botMessage = { text: response.data.reply, user: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
          updateSummary(botMessage.text);
        }
      } catch (error) {
        console.error("Error sending message to backend:", error);
      }
    }
  };

  // Simulate updating the summary based on the chat content
  const updateSummary = (newText) => {
    if (newText.includes('requirement')) {
      setSummary((prevSummary) => [...prevSummary, newText]);
    }
  };

  return (
    <div className={styles.chatPage}>
      {/* Chat Section */}
      <div className={styles.chatSection}>
        <div className={styles.chatMessages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${msg.user === 'user' ? styles.user : styles.bot}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className={styles.chatInput}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className={styles.sidebarSection}>
        <h3>Requirements/Summary</h3>
        <ul>
          {summary.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Understand;
