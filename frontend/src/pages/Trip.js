import React, { useEffect } from 'react';
import Map from '../components/Map';
import ChatBox from '../components/ChatBox';
import Itinerary from '../components/Itinerary';
import styles from '../styling/MapDemo.module.css';
import { useNavigate } from 'react-router-dom';

function Trip() {
  return (
    <div className={styles.content}>
      {/* Left Sidebar for Trip Plan Details */}
      <div className={styles.leftPanel}>
        <div className={styles.tripDetails}>
          <h2>Trip Plan Details</h2>
          <Itinerary />
          <ChatBox />
        </div>
      </div>

      {/* Right Side for Map */}
      <div className={styles.rightPanel}>
        <Map />
      </div>
    </div>
  );
}
export default Trip;
