import React, { useState, useEffect } from "react";

import Card from "../Card/Card";
import CardRoute from "../CardRoute/CardRoute";
import arrayToObj from "@/app/utils/arratToObj";
const Route = () => {
  const [route, setRoute] = useState([]);

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
    <div className="w-full p-2 gap-[10px]">
      {route.map((coordinates, index) => (
        <Card key={index}>
          <CardRoute {...coordinates} />
        </Card>
      ))}
    </div>
  );
};

export default Route;
