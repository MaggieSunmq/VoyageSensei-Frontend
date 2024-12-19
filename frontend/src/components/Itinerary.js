import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../styling/PlanLayout.module.css"


function Itinerary({ tripData}) {
  if (!tripData || tripData.length === 0) {
    return <p>Loading itinerary...</p>;
  }
  // Extract the starting point and POIs
  const startingPoint = tripData[0]; // First element is the starting point
  const pois = tripData.slice(1, -1); // Remove the first and last elements
  return (
    <div className={styles.itinerary}>
      {/* Starting Point */}
      {startingPoint && (
        <div className={`${styles.poiCard} ${styles.startingPoint}`}>
          <h3>Starting Point</h3>
          <p>{startingPoint.address}</p>
        </div>
      )}
  
      {/* Separator */}
      <div className={styles.separator}></div>
  
      {/* POIs */}
      <div className={styles.poiList}>
        {pois.map((poi, index) => (
          <div key={index} className={`${styles.poiCard} ${styles.poi}`}>
            <h3>{index + 1}. {poi.name}</h3>
              {/*<p className={styles.poiSubtitle}>{poi.description}</p>*/}
              <div className={styles.poiDetail}>
                  <div>
                      <strong>Address:</strong> <span className={styles.poiInfo}>{poi.address}</span>
                  </div>
                  <div>
                      <strong>Estimated Duration:</strong> <span className={styles.poiInfo}>{poi.duration}</span>
                  </div>
                  {/* <strong>Keywords:</strong>*/}
                  <div className={styles.keywordContainer}>
                      {poi.keywords.map((keyword, index) => (
                          <span key={index} className={styles.keywordTag}>{keyword}</span>
                      ))}
                  </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itinerary;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from "../styling/PlanLayout.module.css"


// function Itinerary() {
//   const [startingPoint, setStartingPoint] = useState(null);
//   const [pois, setPois] = useState([]);
//   const [lastFetchedData, setLastFetchedData] = useState(null); // To compare previous data


//   // Polling function
//   useEffect(() => {
//     const fetchItinerary = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/query/current_plan');
//         const data = response.data;

//         // Check if the data has changed
//         if (JSON.stringify(data) !== JSON.stringify(lastFetchedData)) {
//           setLastFetchedData(data);

//           // Extract the starting point
//           const startingPoint = data[0]; // First element is the starting point
//           setStartingPoint(startingPoint);

//           // Extract the rest of the POIs excluding the first and last (starting/ending points)
//           const pois = data.slice(1, -1); // Remove the first and last elements
//           setPois(pois);
//         }
//       } catch (error) {
//         console.error("Error fetching itinerary:", error);
//       }
//     };

//     // Poll the API every 5 seconds
//     const interval = setInterval(() => {
//       fetchItinerary();
//     }, 5000);

//     // Clean up interval on unmount
//     return () => clearInterval(interval);
//   }, [lastFetchedData]);

//   return (
//     <div className={styles.itinerary}>
//       <h2 className={styles.itineraryTitle}>Trip Itinerary</h2>
  
//       {/* Starting Point */}
//       {startingPoint && (
//         <div className={`${styles.poiCard} ${styles.startingPoint}`}>
//           <h3>Starting Point</h3>
//           <p>{startingPoint.address}</p>
//         </div>
//       )}
  
//       {/* Separator */}
//       <div className={styles.separator}>
//         <h3>Points of Interest</h3>
//       </div>
  
//       {/* POIs */}
//       <div className={styles.poiList}>
//         {pois.map((poi, index) => (
//           <div key={index} className={`${styles.poiCard} ${styles.poi}`}>
//             <h3>{index + 1}. {poi.name}</h3>
//             <p className={styles.poiSubtitle}>{poi.description}</p>
//             <div>Address: <span className={styles.poiInfo}>{poi.address}</span></div>
//             <div>Reasoning: <span className={styles.poiInfo}>{poi.reasoning}</span></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
   
// }
// export default Itinerary;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from "../styling/PlanLayout.module.css"


// function Itinerary() {
//   const [startingPoint, setStartingPoint] = useState(null);
//   const [pois, setPois] = useState([]);

//   useEffect(() => {
//     const fetchItinerary = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/api/itinerary');
//         const { starting_point, pois } = response.data;
//         setStartingPoint(starting_point);
//         setPois(pois);
//       } catch (error) {
//         console.error("Error fetching itinerary:", error);
//       }
//     };
//     fetchItinerary();
//   }, []);

//   return (
//     <div className={styles.itineray}>
//       <h2 className={styles.itinerayTitle}>Trip Itinerary</h2>
//       {startingPoint && (
//         <div className={styles.itineraryPoint}>
//           <h3>Starting/Ending Point</h3>
//           <p><strong>{startingPoint.name}</strong>: {startingPoint.description}</p>
//           <p className={styles.itinerayLocation}>Location: {startingPoint.location}</p>
//         </div>
//       )}
//       <ul className={styles.poiList}>
//         {pois.map((poi, index) => (
//           <li key={index} className={styles.poiCard}>
//             <h3>{index + 1}. {poi.name}</h3>
//             <p>{poi.description}</p>
//             <p className={styles.itinerayLocation}>Location: {poi.location}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Itinerary;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Itinerary() {
//   const [startingPoint, setStartingPoint] = useState(null);
//   const [pois, setPois] = useState([]);

//   useEffect(() => {
//     const fetchItinerary = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/api/itinerary');
//         const { starting_point, pois } = response.data;
//         setStartingPoint(starting_point);
//         setPois(pois);
//       } catch (error) {
//         console.error("Error fetching itinerary:", error);
//       }
//     };
//     fetchItinerary();
//   }, []);

//   return (
//     <div className="itinerary">
//       <h2 className="itinerary-title">Trip Itinerary</h2>
//       {startingPoint && (
//         <div className="itinerary-point">
//           <h3>Starting/Ending Point</h3>
//           <p><strong>{startingPoint.name}</strong>: {startingPoint.description}</p>
//           <p className="itinerary-location">Location: {startingPoint.location}</p>
//         </div>
//       )}
//       <ul className="poi-list">
//         {pois.map((poi, index) => (
//           <li key={index} className="poi-card">
//             <h3>{poi.name}</h3>
//             <p>{poi.description}</p>
//             <p className="itinerary-location">Location: {poi.location}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Itinerary;


