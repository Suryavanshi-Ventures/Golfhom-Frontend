import React, { useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  position: "relative",
};

let center = {};

const markers = [];

const GoogleMaps = (PropertyData) => {
  if (PropertyData.data?.length > 1) {
    const LangLats = PropertyData.data.forEach((element, index) => {
      // console.log(element.latitude, "MULTIPLE PROP LAT LANG");
      // console.log(element.longitude, "MULTIPLE PROP LAT LANG");

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

  // console.log(PropertyData.data[0]?.latitude, "SINGLE PROP LAT LANG");
  // console.log(PropertyData.data[0]?.longitude, "SINGLE PROP LAT LANG");

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

  const [map, setMap] = React.useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    return () => {
      markers;
      center;
    };
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
