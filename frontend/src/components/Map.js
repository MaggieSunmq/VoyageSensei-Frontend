import React, { useEffect, useState } from 'react';
import {MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip} from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import OpenRouteService from 'openrouteservice-js';
import styles from '../styling/MapDemo.module.css';

function Map({ tripData }) {
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

  useEffect(() => {
    if (tripData.length === 0) return;
    
    const startingPoint = tripData[0];
    const pointInterests = tripData.slice(1, -1);

    if (!startingPoint.coordinates || pointInterests.some((pointInterests) => !pointInterests.coordinates)) {
      console.error('Invalid or missing coordinates for some points of interest.');
      return;
    }

    // Fetch Route Using OpenRouteService
    const orsApiKey = '5b3ce3597851110001cf6248d08b8e3af0984f6199a1967740834834';
    const client = new OpenRouteService.Directions({ api_key: orsApiKey });
    const coordinates = [
      startingPoint.coordinates,
      ...pointInterests.map((pointInterests) => pointInterests.coordinates),
      startingPoint.coordinates,
    ].map((coord) => [coord[1], coord[0]]); // ORS requires [lon, lat]

    client
      .calculate({
        coordinates,
        profile: 'driving-car', // Use 'foot-walking' for walking routes
        format: 'geojson',
      })
      .then((response) => {
        const routeCoordinates = response.features[0].geometry.coordinates.map(
          (coord) => [coord[1], coord[0]] // Convert back to [lat, lon] for Leaflet
        );
        setRoute(routeCoordinates);
      })
      .catch((error) => console.error('Error fetching route from OpenRouteService:', error));
  }, [tripData]);

  if (tripData.length === 0) {
    return <p>Loading map...</p>;
  }
const starting_point = tripData[0];
const pois = tripData.slice(1, -1);
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
      center={starting_point.coordinates}
      zoom={13.5}
      className={styles.fullHeightMap} // Use CSS Module for class
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Starting Point Marker */}
      <Marker position={starting_point.coordinates} icon={startIcon}>
      </Marker>

      {/* POI Markers with Numbered Icons */}
      {pois.map((poi, index) => (
        <Marker key={index} position={poi.coordinates} icon={createNumberedIcon(index + 1)}>
          <Tooltip direction="top" offset={[0, -35]} permanent className="custom-tooltip">
            <strong>{poi.name}</strong><br />
          </Tooltip>
        </Marker>
      ))}
      {/* Route Polyline */}
      {route && <Polyline positions={route} color="blue" />}
    </MapContainer>
  );
}

export default Map;





