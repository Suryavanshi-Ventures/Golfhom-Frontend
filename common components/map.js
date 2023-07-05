import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "60vh",
  position: "relative",
};

let center = {};

let markers = [];

const GoogleMaps = (PropertyData) => {
  const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

  useEffect(() => {
    return () => {};
  }, []);

  const onLoad = useCallback(function callback(Val) {
    setMap(Val);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (PropertyData.data?.length === 1) {
    console.log(PropertyData.data, "SINGLE LAT LONG");

    if (markers.length >= 1) {
      markers.splice(0, 1);
    }
    console.log(markers, "MARKERRRR SINGLE ");

    markers = [
      {
        lat: Number(PropertyData.data[0]?.latitude),
        lng: Number(PropertyData.data[0]?.longitude),
      },
    ];
    center = {
      lat: Number(PropertyData.data[0]?.latitude),
      lng: Number(PropertyData.data[0]?.longitude),
    };

    // const LangLats = PropertyData.data.forEach((element, index) => {
    //   markers.push({
    //     lat: Number(element?.latitude),
    //     lng: Number(element?.longitude),
    //   });
    // });
    // // //* IF LAT LONG GOES MORE THAN 10 THAN REMOVING OLD LAT LONG FROM ARRA
    // // if (markers.length > 10) {
    // //   markers.splice(0, 10);
    // // }
    // console.log(markers, " MARKEEEEEEEEEEEEEEEEER");
    // center = {
    //   lat: Number(markers[0]?.lat),
    //   lng: Number(markers[0]?.lng),
    // };
  } else {
    console.log(PropertyData.data, "MULTIPLE DATA");

    const LangLats = PropertyData.data.forEach((element, index) => {
      markers.push({
        lat: Number(element?.latitude),
        lng: Number(element?.longitude),
      });
    });
    // //* IF LAT LONG GOES MORE THAN 10 THAN REMOVING OLD LAT LONG FROM ARRA
    if (markers.length > 10) {
      markers.splice(0, 10);
    }

    center = {
      lat: Number(markers[0]?.lat),
      lng: Number(markers[0]?.lng),
    };
    console.log(markers, "MULTIPLE LAT LONG");
  }

  // markers.push({
  //   lat: Number(PropertyData.data[0]?.latitude),
  //   lng: Number(PropertyData.data[0]?.longitude),
  // });

  // center = {
  //   lat: Number(PropertyData.data[0]?.latitude),
  //   lng: Number(PropertyData.data[0]?.longitude),
  // };

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
