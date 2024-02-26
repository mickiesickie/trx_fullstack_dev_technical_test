"use client";
import React, { useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Polygon,
  Polyline
} from "@react-google-maps/api";
import styles from "./layout.module.scss";

import arrayToObj from "@/app/utils/arratToObj";

const api_key = process.env.NEXT_PUBLIC_API_KEY;

const Layout = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: api_key
  });
  const [polygonPath, setPolygonPath] = useState();

  const [route, setRoute] = useState([]);
  const polygonOptions = {
    strokeColor: "yellow",
    strokeOpacity: 0.1,
    strokeWeight: 1
  };
  const onLoad = () => {
    const path = route;
    const bufferDistance = 0.008;
    const x = path.map(
      (obj) =>
        new google.maps.LatLng(
          obj.lat + bufferDistance,
          obj.lng - bufferDistance
        )
    );
    path.reverse();
    const y = path.map(
      (obj) =>
        new google.maps.LatLng(
          obj.lat - bufferDistance,
          obj.lng + bufferDistance
        )
    );
    const coordinates = [...x, ...y];

    const areaBoundary = coordinates.map((obj) => {
      return { lat: obj.lat(), lng: obj.lng() };
    });
    setPolygonPath(areaBoundary);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/routes");
        const jsonData = await response.json();
        setRoute(arrayToObj(jsonData));
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper_map}>
      {!isLoaded ? (
        <>loading</>
      ) : (
        <GoogleMap
          mapContainerClassName={styles.wrapper_map}
          zoom={15}
          onLoad={onLoad}
          center={{ lat: 19.421507697260708, lng: -99.14334431648525 }}
        >
          <Polyline path={route} />
          <Polygon path={polygonPath} options={polygonOptions} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Layout;
