import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../styling/ChatBox.module.css";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

function ChatBox({ isExpanded, toggleExpand, notifyUpdate }) {
  // const [messages, setMessages] = useState([]);
  // const [input, setInput] = useState('');
  // const navigate = useNavigate();
  //
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
  //           text: "Thank you for telling me your opinions on the trip. I will keep in mind when generating the new ones!"
  //         });
  //       } else if (typeof response.data === "object") {
  //         // Backend generated a trip plan
  //         botMessages.push(
  //           { user: 'bot', text: "Your new trip has been generated! It should be updated and please take a look" },
  //         );
  //         // Notify parent to start polling
  //         notifyUpdate();
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
  //const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false); // Track when the bot is speaking
  const {transcript, listening, resetTranscript,} = useSpeechRecognition();
  const [processingMessage, setProcessingMessage] = useState("");

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
      //SpeechRecognition.startListening({continuous: false});
    };
    speechSynthesis.speak(utterance);
  };
  // Function to Get Bot Reply
  const getBotReply = (data) => {
    if (typeof data === "string") {
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
      setProcessingMessage("Processing request...");
      setInputText('');
      try {
        const response = await axios.post('http://127.0.0.1:5000/query', {query: inputText});
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

  // Process Voice Input and Fetch Bot Reply
  const processVoiceInput = async () => {
    if (transcript.trim()) {
      const userMessage = {text: transcript, user: 'user'};
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setLoading(true);
      setProcessingMessage("Processing request...");

      try {
        const response = await axios.post('http://127.0.0.1:5000/query', {query: transcript});

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
                    className={styles.textInputBox}
                    disabled={loading}
                    style={{fontSize: '16px', padding: '10px'}} // Updated styling
                />
                <button onClick={handleTextSubmit} disabled={loading || speaking}>Send</button>

                {/* Voice Input */}
                <div className={styles.voiceControls}>
                  <button onClick={handleStartListening} disabled={listening || speaking || loading}>
                    🎤 Start
                  </button>
                  <button onClick={() => SpeechRecognition.stopListening()} disabled={!listening || speaking || loading}>
                    ⏹ Stop
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default ChatBox;


