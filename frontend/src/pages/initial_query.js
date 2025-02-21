import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from '../styling/QueryInput.module.css';
import axios from 'axios';

function Understand() {
  const navigate = useNavigate();
  const [tripGenerated, setTripGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition();
  //const [tripGenerating, setTripGenerating] = useState(false);
  const [processingMessage, setProcessingMessage] = useState("");

  const speak = (text, isTripGenerated = tripGenerated) => {
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
      return data;
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
      setProcessingMessage("Processing request...");
      setInputText('')
      try {
        const response = await axios.post('http://127.0.0.1:5000/query', {query: inputText});
        const botReply = getBotReply(response.data);
        const isTripGenerated = typeof response.data === "object";
        if (isTripGenerated) {
          setTripGenerated(true);
          navigate('/planner')

        }
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

  const processVoiceInput = async (voiceText) => {
    if (voiceText.trim()) {
      const userMessage = {text: voiceText, user: 'user'};
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setLoading(true);
      setProcessingMessage("Processing request...");
      try {
        const response = await axios.post('http://127.0.0.1:5000/query', {query: voiceText});
        const botReply = getBotReply(response.data);
        const isTripGenerated = typeof response.data === "object";
        if (isTripGenerated) {
          setTripGenerated(true);
          navigate('/planner')
          //setProcessingMessage("Generating your trip, please wait...");
        }
        const botMessage = {user: 'bot', text: botReply};
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        speak(botReply, isTripGenerated);
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

          {/* Processing Message */}
          {(loading) && (
              <div className={styles.processingContainer}>
                {/*<p className={styles.processingMessage}>{processingMessage}</p>*/}
                <div className={styles.loader}></div>
              </div>
            )}

          {/* Input Section */}
          <div className={styles.chatInput}>
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className={styles.textInputBox}
              disabled={loading}
              style={{fontSize: '16px', padding: '10px'}} // Updated styling
            />
            <button onClick={handleTextSubmit} disabled={loading || speaking}>Send</button>

            {/* Voice Input */}
            <button onClick={handleStartListening} disabled={listening || speaking || loading}>
              🎤 Start Voice Input
            </button>
            <button onClick={() => SpeechRecognition.stopListening()}
                    disabled={!listening || speaking || loading}>
              ⏹ Stop Listening
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



