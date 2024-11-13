import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../styling/PlanLayout.module.css"


function Itinerary() {
  const [startingPoint, setStartingPoint] = useState(null);
  const [pois, setPois] = useState([]);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/itinerary');
        const { starting_point, pois } = response.data;
        setStartingPoint(starting_point);
        setPois(pois);
      } catch (error) {
        console.error("Error fetching itinerary:", error);
      }
    };
    fetchItinerary();
  }, []);

  return (
    <div className={styles.itineray}>
      <h2 className={styles.itinerayTitle}>Trip Itinerary</h2>
      {startingPoint && (
        <div className={styles.itineraryPoint}>
          <h3>Starting/Ending Point</h3>
          <p><strong>{startingPoint.name}</strong>: {startingPoint.description}</p>
          <p className={styles.itinerayLocation}>Location: {startingPoint.location}</p>
        </div>
      )}
      <ul className={styles.poiList}>
        {pois.map((poi, index) => (
          <li key={index} className={styles.poiCard}>
            <h3>{index + 1}. {poi.name}</h3>
            <p>{poi.description}</p>
            <p className={styles.itinerayLocation}>Location: {poi.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Itinerary;

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


