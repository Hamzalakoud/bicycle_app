import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'leaflet/dist/leaflet.css';

const Maps = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  // Example coordinates for bicycle parking spots
  const bikeParkingSpots = [
    { id: '676448e6efe4dfbd47fe7607' , name: 'Ennaser spot', lat: 36.818, lng: 10.18 },
    { id: '676449afefe4dfbd47fe760b', name: 'La Marsa spot', lat: 36.866, lng: 10.33 },
    { id: '676449c1efe4dfbd47fe7611', name: 'Lac 2 spot', lat: 36.85, lng: 10.12},
  ];

  useEffect(() => {
    // Get user's current position using geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  // Event handler for when a spot is clicked
  const handleSpotClick = (spot) => {
    setSelectedSpot(spot);
    navigate(`/bike-spots/${spot.id}/bikes`); // Navigate to the URL for the selected spot
  };

  if (!userLocation) {
    return <div>Loading map...</div>;
  }

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} style={{ width: '100%', height: '100%' }}>
        {/* Map Tile Layer */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* User Location Marker */}
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={new L.Icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
          })}
        >
          <Popup>Your Location</Popup>
        </Marker>

        {/* Bicycle Parking Spots */}
        {bikeParkingSpots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.lat, spot.lng]}  // Corrected here to use spot.lat and spot.lng
            icon={new L.Icon({
              iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              tooltipAnchor: [16, -28],
            })}
            eventHandlers={{
              click: () => handleSpotClick(spot), // Trigger on click
            }}
          >
            <Popup>{spot.name}</Popup>
          </Marker>
        ))}

        {/* Circle Marker for User's Location */}
        <CircleMarker
          center={[userLocation.lat, userLocation.lng]}
          radius={10}
          fillColor="blue"
          color="blue"
          weight={1}
          opacity={1}
          fillOpacity={0.6}
        >
          <Popup>Your current location</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
};

export default Maps;
