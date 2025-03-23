import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from '../styling/PE.module.css';
import axios from 'axios';

function Understand() {
  const navigate = useNavigate();
  //const [tripGenerated, setTripGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const {transcript, listening, resetTranscript} = useSpeechRecognition();
  //const [processingMessage, setProcessingMessage] = useState("");

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onstart = () => {
      setSpeaking(true);
      SpeechRecognition.stopListening();
    };
    utterance.onend = () => {
      setSpeaking(false);
      // if (!isTripGenerated) {
      //   SpeechRecognition.startListening({continuous: false});
      // }
    };
    speechSynthesis.speak(utterance);
  };
  const getBotReply = (data) => {
    console.log(data)
    if (typeof data === "string") {
      return data;}
    else if (data === null) {
      return "System bug return null"
    } else if (typeof data === "object") {
      return "Your trip has been generated! Please take a look! Feel free to let me know if you like it or not!";
    } else {
      return "Sorry, I couldn't process that. Could you try again?";
    }
  };
  const processTextInput = async (inputText) => {
    if (inputText.trim()) {
      const userMessage = {text: inputText, user: 'user'};
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setLoading(true);
      //setProcessingMessage("Processing request...");
      setInputText('');
      try {
        const response = await axios.post('http://127.0.0.1:5000/query', {query: inputText});
        const botReply = getBotReply(response.data);
        console.log(response.data);
        console.log (typeof response.data);
        const isTripGenerated = typeof response.data === "object" && response.data !== null;
        if (isTripGenerated) {
          //setTripGenerated(true);
          navigate('/trip-detail')
        }
        const botMessage = {user: 'bot', text: botReply};
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        speak(botReply);
        //setLoading(false);
      } catch (error) {
        console.error('Error fetching response:', error);
        const errorMessage = {
          user: 'bot',
          text: "There was an error processing your request. Please try again later.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        speak(errorMessage.text);
        //setLoading(false);
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
      //setProcessingMessage("Processing request...");
      try {
        const response = await axios.post('http://127.0.0.1:5000/query', {query: transcript});
        const isTripGenerated = typeof response.data === "object" && response.data !== null;
        if (isTripGenerated) {
          //setTripGenerated(true);
          navigate('/trip-detail')
        }
        const botReply = getBotReply(response.data);
        const botMessage = {user: 'bot', text: botReply};
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
        setLoading(false);
      }
    }
  };

// Start Listening
  const handleStartListening = () => {
    SpeechRecognition.startListening({continuous: false});
  };

// Automatically Process Input on Transcript Update
  useEffect(() => {
    if (transcript.trim() && !speaking && !listening) {
      processVoiceInput(transcript);
    }
  }, [transcript, listening, speaking]);

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

  return (
      <div className={styles.chatPage}>
        {/* Page Title */}
        <div className={styles.pageTitle}>
          <h1>How Would You Like to Embark on Your Trip Today?</h1>
        </div>

        <div className={styles.chatSection}>
          <div className={styles.messages}>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={msg.user === 'user' ? styles.userMessage : styles.botMessage}>
                  {msg.text}
                </div>
            ))}
          </div>
          {(loading) && (
              <div className={styles.processingContainer}>
                {/*<p className={styles.processingMessage}>{processingMessage}</p>*/}
                <div className={styles.loader}></div>
              </div>
            )}
          <div className={styles.chatInput}>
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              disabled={loading}
              style={{fontSize: '16px', padding: '10px'}}/>
            <button onClick={handleTextSubmit} disabled={loading || speaking}>Send</button>
            <button onClick={handleStartListening} disabled={listening || speaking || loading}>
              🎤 Start Voice Input
            </button>
            <button onClick={() => SpeechRecognition.stopListening()}
                    disabled={!listening || speaking || loading}>
              ⏹ Stop Listening
            </button>
          </div>
        </div>
      </div>
  );
}

export default Understand;


