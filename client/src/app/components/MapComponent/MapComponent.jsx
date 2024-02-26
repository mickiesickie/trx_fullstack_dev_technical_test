import React, { useState, useEffect, useRef } from "react";

const MapComponent = ({ children, onClick, onIdle, center, zoom }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center,
          zoom
        })
      );
    }
  }, [mapRef, map]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );
      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <div ref={mapRef} id="map" className="h-full w-full">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </div>
  );
};

export default MapComponent;
