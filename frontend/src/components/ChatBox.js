import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../styling/ChatBox.module.css";

function ChatBox({ isExpanded, toggleExpand }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, user: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
  
      // Send message to backend
      try {
        const response = await axios.post('http://127.0.0.1:5000/query', { query: input });
        console.log('Response data:', response.data); // Debug response data
  
        // Interpret backend response
        let botMessages = [];
        if (response.data === "query_updated") {
          // User input is not related to recommendations
          botMessages.push({
            user: 'bot',
            text: "Thank you for inputting your preference. It will be included for the plans."
          });
        } else if (typeof response.data === "object") {
          // Backend generated a trip plan
          botMessages.push(
            { user: 'bot', text: "Your trip has been generated! Please click the refresh button to see the new trip!" },
          );
        } else {
          // Fallback for unexpected backend responses
          botMessages.push({
            user: 'bot',
            text: "Sorry, I couldn't process that. Could you try again?"
          });
        }
        setMessages((prevMessages) => [...prevMessages, ...botMessages]);
      } catch (error) {
        console.error('Error fetching response:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: 'bot', text: "There was an error processing your request. Please try again later." }
        ]);
      }
    }
  };
  return (
    <div
      className={`${styles.chatBox} ${isExpanded ? styles.expanded : ''}`}
    >
      {/* Toggle Button */}
      <button className={styles.toggleButton} onClick={toggleExpand}>
        {isExpanded ? 'Critique' : 'Critique'}
      </button>

      {/* Chat Content */}
      {isExpanded && (
        <div className={styles.chatContent}>
          {/* Chat History */}
          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.user === 'user' ? styles.userMessage : styles.botMessage}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Panel */}
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message"
              onKeyDown={(e) => e.key === 'Enter' && input.trim() && sendMessage()}
            />
            <button onClick={sendMessage} disabled={!input.trim()}>
              Send
            </button>         
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
//   return (
//     <div className={`chat-box ${isCollapsed ? 'collapsed' : ''}`}>
//       <button className="toggle-button" onClick={() => setIsCollapsed(!isCollapsed)}>
//         {isCollapsed ? 'Chat' : 'Close'}
//       </button>

//       {!isCollapsed && (
//         <div className="chat-content">
//           <div className="messages">
//             {messages.map((msg, index) => (
//               <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
//                 {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
//               placeholder="Enter your message"
//             />
//             <button onClick={sendMessage} disabled={!input.trim()}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// //import './ChatBoxStyles.css'; // Import CSS file for styling

// function ChatBox() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const messagesEndRef = useRef(null);

//   const sendMessage = async () => {
//     const userMessage = { sender: 'user', text: input };
//     setMessages([...messages, userMessage]);
//     setInput('');

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/api/chat', { message: input });
//       const botMessage = { sender: 'bot', text: response.data.reply };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   // Scroll to the latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="chat-box">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
//             {msg.text}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
//           placeholder="Enter your message"
//         />
//         <button onClick={sendMessage} disabled={!input.trim()}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default ChatBox;



