<<<<<<< HEAD
import React, { useMemo, useState, useCallback } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import MarkerIcon from "../public/images/vector/marker.svg";
=======
import React, { useMemo, useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
>>>>>>> 2774c01d177f5fbf836d29aee0d98445d412c4d2

const containerStyle = {
  width: "100%",
  height: "100%",
  position: "relative",
};

let center = {};

<<<<<<< HEAD
const markers = [
    { lat: 37.7749, lng: -122.4194 }, // San Francisco
    { lat: 32.7157, lng: -117.1611 }, // San Diego
    { lat: 26.168954, lng: -80.1161671 },
    { lat: 25.9600522, lng: -80.1379787 },
    { lat: 26.168954, lng: -80.1161671 },
    { lat: 26.1755733, lng: -80.1069346 },
    { lat: 30.3164945, lng: 78.0321918 },
];
=======
const markers = [];
>>>>>>> 2774c01d177f5fbf836d29aee0d98445d412c4d2

const GoogleMaps = (PropertyData) => {
  if (PropertyData.data?.length > 1) {
    const LangLats = PropertyData.data.forEach((element, index) => {
      console.log(element.latitude);
      console.log(element.longitude);

      markers.push({
        lat: Number(element.latitude),
        lng: Number(element.longitude),
      });
    });

    center = {
      lat: markers[0]?.lat,
      lng: markers[0]?.lng,
    };
  }
  markers.push({
    lat: Number(PropertyData.data[0]?.latitude),
    lng: Number(PropertyData.data[0]?.longitude),
  });

  center = {
    lat: Number(PropertyData.data[0]?.latitude),
    lng: Number(PropertyData.data[0]?.longitude),
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBfYxWDRxvC8H61TYmlUpzzQBWyQ-QMGkU",
  });

<<<<<<< HEAD
    const mapOptions = {
        center: { lat: 41.881832, lng: -87.623177 },
        zoom: 12
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            style={{ position: 'static', width: '100%', height: '100%' }}
        >
            {markers.map((marker, index) => (
                <Marker key={index} position={marker} />
            ))}
        </GoogleMap>
    ) : <></>
}
=======
  const [map, setMap] = React.useState(null);
>>>>>>> 2774c01d177f5fbf836d29aee0d98445d412c4d2

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {markers.map((marker, index) => (
        <Marker
          icon="/images/vector/google_map_markers.svg"
          key={index}
          position={marker}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(GoogleMaps);
