// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from '../styling/QueryInput.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from '../styling/QueryInput.module.css';
import axios from 'axios';

function Understand() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Voice Recognition Hook
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Append transcript when recognition stops
  const handleVoiceInput = async () => {
    if (transcript.trim()) {
      const newMessage = { text: transcript, user: 'user' };
      setMessages([...messages, newMessage]);
      setInput(''); // Clear input box

      // Send transcript to backend
      try {
        const response = await axios.post('http://127.0.0.1:5000/query', { query: transcript });
        let botMessages = [];
        if (response.data === "query_updated") {
          botMessages.push({
            user: 'bot',
            text: "Thank you for telling me your preference. It will be included for planning."
          });
        } else if (typeof response.data === "object") {
          botMessages.push({
            user: 'bot',
            text: "Your trip has been generated! Please click the next page button to see the trip!"
          });
        } else {
          botMessages.push({
            user: 'bot',
            text: "Sorry, I couldn't process that. Could you try again?"
          });
        }
        setMessages((prevMessages) => [...prevMessages, ...botMessages]);
        resetTranscript(); // Clear transcript after sending
      } catch (error) {
        console.error('Error fetching response:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: 'bot', text: "There was an error processing your request. Please try again later." }
        ]);
      }
    }
  };

  // Navigate to the next page
  const goToNextPage = () => {
    navigate('/planner');
  };

  return (
    <div className={styles.chatPage}>
      {/* Full-Width Title */}
      <div className={styles.pageTitle}>
        <h1>How Would You Like to Embark on Your Trip Today?</h1>
      </div>
      {/* Chat Section */}
      <div className={styles.chatSection}>
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
        <div className={styles.chatInput}>
          {/* Manual Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleVoiceInput}>Send</button>

          {/* Voice Input Buttons */}
          <button
            onClick={() => SpeechRecognition.startListening({ continuous: false })}
            disabled={listening}
          >
            🎤 Start Voice Input
          </button>
          <button
            onClick={() => SpeechRecognition.stopListening()}
            disabled={!listening}
          >
            ⏹ Stop
          </button>

          {/* Display Live Transcript */}
          <div style={{ marginTop: '10px', fontStyle: 'italic', color: 'gray' }}>
            {transcript && `You said: "${transcript}"`}
          </div>

          {/* Next Page Button */}
          <button
            className={styles.nextPageInlineButton}
            onClick={goToNextPage}
          >
            Next Page
          </button>
        </div>
      </div>
      {/* Browser Not Supported */}
      {!browserSupportsSpeechRecognition && (
        <p>Your browser does not support voice input. Try using Chrome.</p>
      )}
    </div>
  );
}

export default Understand;

// import axios from 'axios';
//
// function Understand() {
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//
//   // Handle sending a new message
// // Handle sending a new message
// const sendMessage = async () => {
//   if (input.trim()) {
//     const newMessage = { text: input, user: 'user' };
//     setMessages([...messages, newMessage]);
//     setInput('');
//
//     // Send message to backend
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/query', { query: input });
//       console.log('Response data:', response.data); // Debug response data
//
//       // Interpret backend response
//       let botMessages = [];
//       if (response.data === "query_updated") {
//         // User input is not related to recommendations
//         botMessages.push({
//           user: 'bot',
//           text: "Thank you for telling me your preference. It will be included for planning."
//         });
//       } else if (typeof response.data === "object") {
//         // Backend generated a trip plan
//         botMessages.push(
//           { user: 'bot', text: "Your trip has been generated! Please click the next page button to see the trip!" },
//         );
//       } else {
//         // Fallback for unexpected backend responses
//         botMessages.push({
//           user: 'bot',
//           text: "Sorry, I couldn't process that. Could you try again?"
//         });
//       }
//       setMessages((prevMessages) => [...prevMessages, ...botMessages]);
//     } catch (error) {
//       console.error('Error fetching response:', error);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { user: 'bot', text: "There was an error processing your request. Please try again later." }
//       ]);
//     }
//   }
// };
//   // Navigate to the next page
//   const goToNextPage = () => {
//     navigate('/planner'); // Replace '/next-page' with the actual route
//   };
//
//   return (
//     <div className={styles.chatPage}>
//       {/* Full-Width Title */}
//       <div className={styles.pageTitle}>
//         <h1>How Would You Like to Embark on Your Trip Today?</h1>
//       </div>
//       {/* Chat Section */}
//       <div className={styles.chatSection}>
//         <div className={styles.messages}>
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={msg.user === 'user' ? styles.userMessage : styles.botMessage}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <div className={styles.chatInput}>
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type a message..."
//           />
//           <button onClick={sendMessage}>Send</button>
//           <button
//             className={styles.nextPageInlineButton}
//             onClick={goToNextPage}
//           >
//             Next Page
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Understand;
