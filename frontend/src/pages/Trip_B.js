import React, { useState, useEffect } from 'react';
import Map from '../components/Map_B';
import ChatBox from '../components/ChatBox';
import Itinerary from '../components/Itinerary';
import styles from '../styling/MapDemo.module.css';
import axios from 'axios';

// function Trip() {
//   const [tripData, setTripData] = useState([]);
//   const [isUpdating, setIsUpdating] = useState(false); // Track if the backend is updating
//   const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load
//   const pollingInterval = 3000; // Polling interval in milliseconds
  function Trip() {
    const [tripData, setTripData] = useState([]);
    const [tripSummary, setTripSummary] = useState([]);
    const [isChatBoxExpanded, setIsChatBoxExpanded] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load

    const fetchTripData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/query/current_plan');
        //const response = await axios.get('http://127.0.0.1:5000/test');
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
        // Mark initial load as complete
        if (isInitialLoad) {
          setIsInitialLoad(false);
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };
    // One-time fetch on page load
    useEffect(() => {
      fetchTripData(); // Fetch data when the component first loads
    }, []); // Empty dependency array ensures this runs only once

    const handleUpdateNotification = () => {
      console.log('ChatBox triggered an update. Fetching new trip data...');
      fetchTripData(); // Fetch data when notified by ChatBox
    };


  // const fetchTripData = async () => {
  //   try {
  //     const response = await axios.get('http://127.0.0.1:5000/query/current_plan');
  //     const data = response.data;

  //     // Update tripData if it has changed
  //     if (JSON.stringify(data) !== JSON.stringify(tripData)) {
  //       setTripData(data); // Update tripData
  //     } else {
  //       // Stop polling if data is identical
  //       console.log('Data is identical, stopping polling.');
  //       setIsUpdating(false); // Stop polling
  //     }

  //     // Mark initial load as complete
  //     if (isInitialLoad) {
  //       setIsInitialLoad(false);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching trip data:', error);
  //     setIsUpdating(false); // Stop polling on error
  //   }
  // };

  // // One-time fetch on page load
  // useEffect(() => {
  //   fetchTripData(); // Fetch data when the component first loads
  // }, []); // Empty dependency array ensures this runs only once

  // // Polling logic for dynamic updates
  // useEffect(() => {
  //   let intervalId;

  //   if (isUpdating) {
  //     intervalId = setInterval(fetchTripData, pollingInterval);
  //   }

  //   return () => {
  //     if (intervalId) clearInterval(intervalId); // Clear interval when component unmounts or polling stops
  //   };
  // }, [isUpdating]); // Start polling when isUpdating is true

  // const handleUpdateNotification = () => {
  //   setIsUpdating(true); // Start polling when notified by ChatBox
  // };
  return (
       <div className={styles.content}>
      {/* Left Panel: Itinerary and ChatBox */}
      {/*<div className={styles.leftPanel}>
        <div
            className={styles.tripDetails}
            style={{
              height: isChatBoxExpanded ? 'calc(100% - 250px)' : 'calc(100% - 50px)',
            }}
        >
          <h2>Trip Plan Details</h2>
          <strong>Trip Summary:</strong> {tripSummary}
          <Itinerary tripData={tripData}/>
        </div>

        <div className={styles.chatBoxContainer}>
        <ChatBox
            isExpanded={isChatBoxExpanded}
            toggleExpand={() => setIsChatBoxExpanded(!isChatBoxExpanded)}
            notifyUpdate={handleUpdateNotification}
          />
        </div>
      </div>*/}
         {/*<div className={styles.rightPanel}>*/}
        <Map tripData={tripData} />
         {/*</div>*/}
    </div>
  );
}
export default Trip;