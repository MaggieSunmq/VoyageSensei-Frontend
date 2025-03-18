import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import ChatBox from '../components/ChatBox';
import Itinerary from '../components/Itinerary';
import styles from '../styling/MapDemo.module.css';
import axios from 'axios';

  function Trip() {
    const [tripData, setTripData] = useState([]);
    const [tripSummary, setTripSummary] = useState([]);
    const [isChatBoxExpanded, setIsChatBoxExpanded] = useState(false); 
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [travelDuration, setTravelDuration] = useState([]);
  
    const fetchTripData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/query/current_plan');
        const tmp = response.data;
        const data = tmp.poi_sequence || [];
        console.log(data);
        const summary = tmp.summary || "No summary available";
        // Update tripData if it has changed
        if (JSON.stringify(data) !== JSON.stringify(tripData)) {
          setTripData(data); // Update tripData
          setTripSummary(summary);
        } else {
          console.log('Data is identical, no update needed.');
        }
        if (isInitialLoad) {
          setIsInitialLoad(false);
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };
    useEffect(() => {
      fetchTripData();
    }, []);

    const handleUpdateNotification = () => {
      console.log('ChatBox triggered an update. Fetching new trip data...');
      fetchTripData();
    };
  return (
       <div className={styles.content}>

      {/* Left Panel: Itinerary and ChatBox */}
      <div className={styles.leftPanel}>
        <div
            className={styles.tripDetails}
            style={{
              height: isChatBoxExpanded ? 'calc(100% - 250px)' : 'calc(100% - 50px)',
            }}
        >
          <h2>Trip Plan Details</h2>
          <strong>Trip Summary:</strong> {tripSummary}
          <Itinerary tripData={tripData}
                     travelDuration = {travelDuration}/>
        </div>
        <ChatBox
            isExpanded={isChatBoxExpanded}
            toggleExpand={() => setIsChatBoxExpanded(!isChatBoxExpanded)}
            notifyUpdate={handleUpdateNotification}
          />
        </div>
         <div className={styles.rightPanel}>
            <Map tripData={tripData}
                 setDuration = {setTravelDuration}/>
         </div>
    </div>
  );
}
export default Trip;
