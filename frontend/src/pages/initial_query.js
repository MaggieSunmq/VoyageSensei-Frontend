import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from '../styling/QueryInput.module.css';
import axios from 'axios';

function Understand() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [speaking, setSpeaking] = useState(false); // Track when the bot is speaking
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Text-to-Speech Function
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    // Stop listening while speaking
    utterance.onstart = () => {
      setSpeaking(true);
      SpeechRecognition.stopListening();
    };
    // Restart listening after speaking
    utterance.onend = () => {
      setSpeaking(false);
      SpeechRecognition.startListening({ continuous: false });
    };
    speechSynthesis.speak(utterance);
  };
  // Function to Get Bot Reply
  const getBotReply = (data) => {
    console.log(data)
    if (typeof data === "string") {
      return data;
    } else if (typeof data === "object") {
      return "Your trip has been generated! Please click the next page button to see the trip! Feel free to let me know if you like it or not!";
    } else {
      return "Sorry, I couldn't process that. Could you try again?";
    }
  };

  // Process Voice Input and Fetch Bot Reply
  const processVoiceInput = async () => {
    if (transcript.trim()) {
      const userMessage = { text: transcript, user: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      try {
        const response = await axios.post('http://127.0.0.1:5000/query', { query: transcript });
        const botReply = getBotReply(response.data);
        const botMessage = { user: 'bot', text: botReply };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        speak(botReply); // Speak the bot's reply
      } catch (error) {
        console.error('Error fetching response:', error);
        const errorMessage = {
          user: 'bot',
          text: "There was an error processing your request. Please try again later.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        speak(errorMessage.text); // Speak the error message
      } finally {
        resetTranscript(); // Clear the transcript
      }
    }
  };

  // Start Listening
  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: false });
  };

  // Automatically Process Input on Transcript Update
  useEffect(() => {
    if (transcript.trim() && !speaking && !listening) {
      processVoiceInput();
    }
  }, [transcript, listening, speaking]);

  // Navigate to the next page
  const goToNextPage = () => {
    navigate('/planner');
  };

  return (
    <div className={styles.chatPage}>
      {/* Page Title */}
      <div className={styles.pageTitle}>
        <h1>How Would You Like to Embark on Your Trip Today?</h1>
      </div>

      {/* Chat Section */}
      <div className={styles.chatSection}>
        {/* Chat Messages */}
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

        {/* Input Section */}
        <div className={styles.chatInput}>
          {/* Voice Input */}
          <button onClick={handleStartListening} disabled={listening || speaking}>
            🎤 Start Voice Input
          </button>
          <button onClick={() => SpeechRecognition.stopListening()} disabled={!listening || speaking}>
            ⏹ Stop Listening
          </button>

          {/* Next Page Button */}
          <button className={styles.nextPageInlineButton} onClick={goToNextPage}>
            Next Page
          </button>
        </div>
      </div>

      {/* Fallback for Unsupported Browsers */}
      {!browserSupportsSpeechRecognition && (
        <p className={styles.unsupportedBrowser}>
          Your browser does not support voice input. Please try using Chrome.
        </p>
      )}
    </div>
  );
}
export default Understand;



