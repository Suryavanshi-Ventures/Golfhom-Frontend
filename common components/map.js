import React, { useMemo } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'static'
};

const center = {
    lat: 34.14778490,
    lng: -118.14451550
};

function MyComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBfYxWDRxvC8H61TYmlUpzzQBWyQ-QMGkU"
    })

    const [map, setMap] = React.useState(null)
    const options = useMemo(() => ({
        // mapId: "b181cac70f27f5e6",   for dark mode
        disableDefaultUI: true,
        clickableIcons: false
    }), [])

    // const onLoad = React.useCallback(function callback(map) {

    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     map.fitBounds(bounds);

    //     setMap(map)
    // }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            options={options}
            // onLoad={onLoad}
            onUnmount={onUnmount}
            style={{ position: 'static', width: '100%', height: '100%' }}
        >
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)