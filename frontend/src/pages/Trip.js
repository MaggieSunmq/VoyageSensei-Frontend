import React, { useState } from 'react';
import Map from '../components/Map';
import ChatBox from '../components/ChatBox';
import Itinerary from '../components/Itinerary';
import styles from '../styling/MapDemo.module.css';
import { useNavigate } from 'react-router-dom';

function Trip() {
  const [isChatBoxExpanded, setIsChatBoxExpanded] = useState(false); // State to toggle chatbox expansion
  const [refreshKey, setRefreshKey] = useState(0); // State to force re-render
  const navigate = useNavigate();
  const refresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment key to trigger re-render
  };

  return (
    <div className={styles.content}>

      {/* Left Panel: Itinerary and ChatBox */}
      <div className={styles.leftPanel}>
        {/* Itinerary Section */}
        <div
          className={styles.tripDetails}
          style={{
            // Dynamically adjust height based on fixed chatbox size
            height: isChatBoxExpanded ? 'calc(100% - 250px)' : 'calc(100% - 50px)',
          }}
        >
          <h2>Trip Plan Details</h2>
          <Itinerary key={refreshKey} /> {/* Force re-render with key */}
        </div>

        {/* ChatBox Section */}
        <div className={styles.chatBoxContainer}>
          <ChatBox
            isExpanded={isChatBoxExpanded}
            toggleExpand={() => setIsChatBoxExpanded(!isChatBoxExpanded)}
          />
        </div>
      </div>

      {/* Right Panel: Map */}
      <div className={styles.rightPanel}>
        <Map key={refreshKey} /> {/* Force re-render with key */}
        {/* Refresh Button */}
        <button className={styles.refreshButton} onClick={refresh}>
          Refresh
        </button>
      </div>
    </div>
  );
}

export default Trip;