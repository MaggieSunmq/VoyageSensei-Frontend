import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from "../styling/ChatBox.module.css";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

function ChatBox({ isExpanded, toggleExpand, notifyUpdate }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false); // Track when the bot is speaking
  const {transcript, listening, resetTranscript,} = useSpeechRecognition();
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onstart = () => {
      setSpeaking(true);
      SpeechRecognition.stopListening();
    };
    utterance.onend = () => {
      setSpeaking(false);
    };
    speechSynthesis.speak(utterance);
  };

  const getBotReply = (data) => {
    if (data === null) {
      return "System bug return null"
    }
    else if (typeof data === "string") {
      return data;
    } else if (typeof data === "object") {
      notifyUpdate();
      return "Your trip has been generated!";
    } else {
      return "Sorry, I couldn't process that. Could you try again?";
    }
  };
  const processTextInput = async (inputText) => {
    if (inputText.trim()) {
      const userMessage = {text: inputText, user: 'user'};
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setLoading(true);
      setInputText('');
      try {
        const response = await axios.post('http://127.0.0.1:5000/critique', {query: inputText});
        const botReply = getBotReply(response.data);
        const botMessage = {user: 'bot', text: botReply};
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        speak(botReply);
      } catch (error) {
        console.error('Error fetching response:', error);
        const errorMessage = {
          user: 'bot',
          text: "There was an error processing your request. Please try again later.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        speak(errorMessage.text);
      } finally {
        setLoading(false);
      }
    }
  };

  const processVoiceInput = async () => {
    if (transcript.trim()) {
      const userMessage = {text: transcript, user: 'user'};
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setLoading(true);
      try {
        const response = await axios.post('http://127.0.0.1:5000/critique', {query: transcript});
        const botReply = getBotReply(response.data);
        const botMessage = {user: 'bot', text: botReply};
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        speak(botReply);
      } catch (error) {
        console.error('Error fetching response:', error);
        const errorMessage = {
          user: 'bot',
          text: "There was an error processing your request. Please try again later.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        speak(errorMessage.text);
      } finally {
        resetTranscript();
        setLoading(false);
      }
    }
  };
  // Start Listening
  const handleStartListening = () => {
    SpeechRecognition.startListening({continuous: false});
  };

  const handleTextSubmit = (e) => {
    if (e) e.preventDefault();
    processTextInput(inputText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit(e);
    }
  };

  // Automatically Process Input on Transcript Update
  useEffect(() => {
    if (transcript.trim() && !speaking && !listening) {
      processVoiceInput();
    }
  }, [transcript, listening, speaking]);
  return (
      <div className={`${styles.chatBox} ${isExpanded ? styles.expanded : ''}`}>
        {/* Toggle Button */}
        <button className={styles.toggleButton} onClick={toggleExpand}>
          {isExpanded ? 'Critique' : 'Critique'}
        </button>
        {isExpanded && (
            <div className={styles.chatContent}>
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

              {(loading) && (
                <div className={styles.processingContainer}>
                  <div className={styles.loader}></div>
                </div>
              )}

              {/* Input Panel */}
              <div className={styles.inputContainer}>
                <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here..."
                    disabled={loading}
                    style={{fontSize: '16px', padding: '10px'}} // Updated styling
                />
                <button onClick={handleTextSubmit} disabled={loading || speaking}>Send</button>

                {/* Voice Input */}
                <button onClick={handleStartListening} disabled={listening || speaking || loading}>
                    🎤 Start
                </button>
                <button onClick={() => SpeechRecognition.stopListening()} disabled={!listening || speaking || loading}>
                  ⏹ Stop
                </button>
              </div>
            </div>
        )}
      </div>
  );
}

export default ChatBox;


