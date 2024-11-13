import React, { useState } from 'react';
import axios from 'axios';
import styles from "../styling/ChatBox.module.css"

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true);

  const sendMessage = async () => {
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/chat', { message: input });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  return (
    <div className={`${styles.chatBox} ${isCollapsed ? styles.collapsed : ''}`}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? 'Chat' : 'Close'}
      </button>
  
      {!isCollapsed && (
        <div className={styles.chatContent}>
          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
              placeholder="Enter your message"
            />
            <button onClick={sendMessage} disabled={!input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );


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
}
export default ChatBox;

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



