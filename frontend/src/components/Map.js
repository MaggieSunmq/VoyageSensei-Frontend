import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "../styling/Map.module.css";

function Map({ tripData, setDuration }) {
  const [route, setRoute] = useState(null);
  const [travelTime, setTravelTime] = useState(null);
  const now = new Date();
  const tomorrow9AM = new Date(now);
  tomorrow9AM.setDate(now.getDate() + 1); // Move to tomorrow
  tomorrow9AM.setHours(9, 0, 0, 0); // Set time to 9:00 AM
  const departureTimeISO = tomorrow9AM.toISOString();

  const startIcon = new L.Icon({
    iconUrl: "/images/start-marker.png",
    iconSize: [35, 45],
    iconAnchor: [17, 42],
  });

  useEffect(() => {
    if (tripData.length === 0) return;

    const startingPoint = tripData[0];
    const pointInterests = tripData.slice(1);

    if (!startingPoint.coordinates || pointInterests.some(poi => !poi.coordinates)) {
      console.error("Invalid or missing coordinates for some points of interest.");
      return;
    }

    const googleMapsApiKey = "AIzaSyBPGkvYUXaCJltRV0ti-jL-LMdOmaoX1GY"; // Replace with a valid key
    const endpoint = "https://routes.googleapis.com/directions/v2:computeRoutes";

    const requestBody = {
      origin: {
        location: {
          latLng: {
            latitude: startingPoint.coordinates[0],
            longitude: startingPoint.coordinates[1],
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: pointInterests[pointInterests.length - 1].coordinates[0],
            longitude: pointInterests[pointInterests.length - 1].coordinates[1],
          },
        },
      },
      intermediates: pointInterests.slice(0, -1).map((poi) => ({
        location: {
          latLng: {
            latitude: poi.coordinates[0],
            longitude: poi.coordinates[1],
          },
        },
      })),
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE",
      departureTime: departureTimeISO, // Real-time traffic
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
      languageCode: "en-US",
      units: "METRIC",
    };

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": googleMapsApiKey,
        "X-Goog-FieldMask": "routes.duration,routes.polyline.encodedPolyline,routes.legs",
      },
      body: JSON.stringify(requestBody),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("API Error:", errorResponse);
          throw new Error(`Google Maps API Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.routes && data.routes.length > 0) {
          const routeData = data.routes[0];
          // Decode polyline
          const routeCoordinates = getSegmentsWithColors(routeData.legs);
          //const segments = getSegmentsWithColors(routeCoordinates);
          const segmentDurations = routeData.legs.map((leg) => {
            const durationInSeconds = parseInt(leg.duration.replace("s", ""), 10);
            return Math.ceil(1.2*durationInSeconds / 60);});
          console.log(routeData.legs[0]["duration"])
          console.log(segmentDurations)
          setRoute(routeCoordinates);
          console.log(routeCoordinates);
          setTravelTime(segmentDurations);
          setDuration(segmentDurations);
        } else {
          console.error("No routes found in API response.", data);
        }
      })
      .catch((error) => console.error("Error fetching route from Google Maps Routes API:", error));
  }, [tripData]);

  // Decode Google Polyline
function decodePolyline(encoded) {
    let index = 0,
        lat = 0,
        lng = 0,
        coordinates = [];

    while (index < encoded.length) {
        let shift = 0,
            result = 0;
        let byte;

        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        let deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
        lat += deltaLat;

        shift = 0;
        result = 0;

        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        let deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
        lng += deltaLng;

        coordinates.push([lat / 1e5, lng / 1e5]);
    }

    return coordinates;
  }
  function getColor(index) {
    const colors = [
  "#FF0000", // Bright Red
  "#0000FF", // Bright Blue
  "#008000", // Bright Green
  "#FFA500", // Orange
  "#800080", // Purple
  "#FFFF00", // Yellow
  "#00FFFF", // Cyan
  "#FF1493", // Deep Pink
  "#FF4500", // Orange-Red
  "#1E90FF", // Dodger Blue
  "#A52A2A", // Dark Brown
  "#4B0082", // Indigo
  "#CDDC39", // Lime Green
  "#FF5722", // Deep Orange
  "#2E8B57", // Sea Green
];
    return colors[index % colors.length];
  }
  function getSegmentsWithColors(legs) {
    if (!legs || legs.length === 0) {
        console.error("No legs provided for segment color coding.");
        return [];
    }

    let segments = [];
    let colorIndex = 0;
    console.log(legs);

    legs.forEach((leg, i) => {
        if (!leg.steps || leg.steps.length === 0) {
            console.error(`Leg ${i + 1} has no steps.`);
            return;
        }

        let legPoints = [];
        leg.steps.forEach((step) => {
            if (step.polyline && step.polyline.encodedPolyline) {
                const stepPoints = decodePolyline(step.polyline.encodedPolyline);
                legPoints.push(...stepPoints);
            }
        });
        for (let j = 0; j < legPoints.length - 1; j++) {
            segments.push({
                start: legPoints[j],
                end: legPoints[j + 1],
                color: getColor(colorIndex)
            });
        }
        console.log(`Leg ${i + 1}: ${legPoints.length} points, Color: ${getColor(colorIndex)}`);
        colorIndex++;
    });
    console.log("Generated Segments:", segments);
    return segments;
}
  if (tripData.length === 0) {
    return <p>Loading map...</p>;
  }

  const starting_point = tripData[0];
  const pois = tripData.slice(1,-1);
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
        <div style=" transform: rotate(45deg); /* Corrects text orientation */ ">
            ${number}
            </div>
        </div>`,
        className: "numbered-icon",
        iconSize: [30, 42], // Adjusted to fit the pin shape
        iconAnchor: [15, 42], // Anchor at the tip of the pin
    });};
  return (
    <MapContainer center={starting_point.coordinates} zoom={13.5} className={styles.fullHeightMap}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {route && route.length > 0 && route.map((r, index) => (
        <Polyline key={index} positions={[r.start, r.end]} color={r.color} />
      ))}
      <Marker position={starting_point.coordinates} icon={startIcon} />
      {travelTime &&
        pois.map((poi, index) => (
          <Marker key={index} position={poi.coordinates} icon={createNumberedIcon(index + 1)}>
            <Tooltip direction="top" offset={[0, -35]} permanent>
              <strong>{poi.name}</strong>
              <br />
            </Tooltip>
          </Marker>
        ))}
    </MapContainer>
  );
}
export default Map;






