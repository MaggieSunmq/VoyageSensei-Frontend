import React from 'react';
import styles from "../styling/Itinerary.module.css"


function Itinerary({ tripData, travelDuration}) {
  if (!tripData || tripData.length === 0) {
    return <p>Loading itinerary...</p>;
  }
  // Extract the starting point and POIs
  const startingPoint = tripData[0];
  const startDuration = travelDuration[0];
  const poiDurations = travelDuration.slice(1, travelDuration.length - 1);
  const pois = tripData.slice(1, -1);
  console.log(pois);
  return (
      <div className={styles.itinerary}>
          {/* Starting Point */}
          {startingPoint && (
              <div className={`${styles.poiCard} ${styles.startingPoint}`}>
                  <h3>Starting Point</h3>
                  <p>{startingPoint.address}</p>
              </div>
          )}
          <p>🚗 Travel Time: {startDuration} min</p>

          {/* Separator */}
          <div className={styles.separator}></div>

          {/* POIs with Travel Times */}
          <div className={styles.poiList}>
              {pois.map((poi, index) => (
                  <div key={index}>
                      {/* POI Card */}
                      <div className={`${styles.poiCard} ${styles.poi}`}>
                          <h3>{index + 1}. {poi.name}</h3>
                          <div className={styles.poiDetail}>
                              <div>
                                  <strong>Address:</strong> <span className={styles.poiInfo}>{poi.address}</span>
                              </div>
                              <div>
                                  <strong>Estimated Duration:</strong> <span
                                  className={styles.poiInfo}>{poi.duration}</span>
                              </div>
                              {poi.keywords && poi.keywords.length > 0 && (
                                  <div className={styles.keywordContainer}>
                                      {poi.keywords.map((keyword, index) => (
                                          <span key={index} className={styles.keywordTag}>{keyword}</span>
                                      ))}
                                  </div>
                              )}
                              {poi.event["Event Found"] === 'Yes' && (
                                  <div className={styles.keywordContainer}>
                                      <span key={index} className={styles.eventTag}>{"Event: " + poi.event["Event Name"]}</span>
                                  </div>
                              )}
                          </div>
                      </div>

                      {/* Travel Time Separator (Except After the Last POI) */}
                      {index < pois.length - 1 && (
                          <div>
                              <p>🚗 Travel Time: {poiDurations[index]} min</p>
                          </div>
                      )}
                  </div>
              ))}
              <p>🚗 Returning back: {startDuration} min</p>
          </div>
      </div>
  );
}

export default Itinerary;


