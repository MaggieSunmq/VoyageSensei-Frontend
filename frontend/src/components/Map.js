import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import OpenRouteService from 'openrouteservice-js';
import styles from '../styling/MapDemo.module.css';

function Map() {
  const [itinerary, setItinerary] = useState(null);
  const [route, setRoute] = useState(null); // State to store the route coordinates

  const startIcon = new L.Icon({
    iconUrl: '/images/start-marker.png',
    iconSize: [35, 45],
    iconAnchor: [17, 42],
  });

  const poiIcon = new L.Icon({
    iconUrl: '/images/poi-marker.png',
    iconSize: [35, 35],
    iconAnchor: [12, 34],
  });

  const orsApiKey = '5b3ce3597851110001cf624808dc26b81a754916b1307d672c93cff1'; // Replace with your actual API key

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/itinerary');
        const { starting_point, pois } = response.data;

        if (!starting_point.coords || pois.some(poi => !poi.coords)) {
          console.error("Invalid or missing coordinates for some points of interest.");
          return;
        }

        setItinerary(response.data);
      } catch (error) {
        console.error("Error fetching itinerary:", error);
      }
    };

    fetchItinerary();
  }, []);

  useEffect(() => {
    if (itinerary) {
      // Initialize OpenRouteService client with API key
      const client = new OpenRouteService.Directions({
        api_key: orsApiKey
      });

      const coordinates = [
        itinerary.starting_point.coords,
        ...itinerary.pois.map(poi => poi.coords),
        itinerary.starting_point.coords // Loop back to the starting point
      ];

      client.calculate({
        coordinates: coordinates.map(coord => [coord[1], coord[0]]), // Format for OpenRouteService: [longitude, latitude]
        profile: 'driving-car', // Use 'foot-walking' if you want a walking route
        format: 'geojson'
      })
      .then(response => {
        const routeCoordinates = response.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setRoute(routeCoordinates);
      })
      .catch(error => console.error("Error fetching route from OpenRouteService:", error));
    }
  }, [itinerary, orsApiKey]);

  if (!itinerary) {
    return <div>Loading...</div>;
  }

  const { starting_point, pois } = itinerary;

  // const createNumberedIcon = (number) => {
  //   return L.divIcon({
  //     html: `<div style="background-color: #2d8fdd; color: white; font-weight: bold; font-size: 16px; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">${number}</div>`,
  //     className: "numbered-icon",
  //     iconSize: [30, 30],
  //   });
  // };
// Function to create a custom numbered pin icon styled like Google Maps or Apple Maps
const createNumberedIcon = (number) => {
  return L.divIcon({
    html: `
      <div style="
        position: relative;
        width: 30px;
        height: 30px;
        background-color: #D9534F; /* Refined red color */
        color: #ffffff;
        font-weight: bold;
        font-size: 14px;
        border-radius: 50% 50% 50% 0; /* Creates the pin shape */
        transform: rotate(-45deg); /* Rotates to point downward */
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2); /* Subtle shadow */
      ">
        <div style="
          transform: rotate(45deg); /* Corrects text orientation */
        ">
          ${number}
        </div>
      </div>
    `,
    className: "numbered-icon",
    iconSize: [30, 42], // Adjusted to fit the pin shape
    iconAnchor: [15, 42], // Anchor at the tip of the pin
  });
};

  return (
    <MapContainer
      center={starting_point.coords}
      zoom={13}
      className={styles.fullHeightMap} // Use CSS Module for class
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Starting Point Marker */}
      <Marker position={starting_point.coords} icon={startIcon}>
        <Popup>
          <strong>{starting_point.name}</strong>
          <br />
          {starting_point.description}
          <br />
          {starting_point.location}
        </Popup>
      </Marker>

      {/* POI Markers with Numbered Icons */}
      {pois.map((poi, index) => (
        <Marker key={index} position={poi.coords} icon={createNumberedIcon(index + 1)}>
          <Popup>
            <strong>{poi.name}</strong><br />
            {poi.description}<br />
            {poi.location}
          </Popup>
        </Marker>
      ))}

      {/* Route Polyline */}
      {route && <Polyline positions={route} color="blue" />}
    </MapContainer>
  );
}

export default Map;






