"use client";
import React, { useEffect, useState, useContext } from "react";
import Card from "../Card/Card";
import CardVehicle from "../CardVehicle/CardVehicle";
import { VehiclesContext } from "@/app/context/appContext";

export const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [originalVehicles, setOriginalVehicles] = useState();
  const [vehiclesContext, setVehiclesContext] = useContext(VehiclesContext);

  const handleSearch = (e) => {
    e.preventDefault();
    const { value } = e.target;
    let result = [];
    let temp = JSON.parse(originalVehicles);
    const { vehicles } = temp;
    for (const vehicle of vehicles) {
      for (let item of Object.values(vehicle)) {
        let convertedValue = String(value).toLowerCase();
        let itemConverted = String(item).toLowerCase();
        if (itemConverted.includes(convertedValue)) {
          result.push(vehicle);
        }
      }
    }
    setVehicles([...new Set(result)]);
  };
  useEffect(() => {
    setOriginalVehicles(JSON.stringify(vehiclesContext));
    setVehicles(vehiclesContext.vehicles);
  }, [vehiclesContext]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/vehicles");
        const jsonData = await response.json();
        setOriginalVehicles(JSON.stringify(jsonData));
        setVehiclesContext(jsonData);
        setVehicles(jsonData.vehicles);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  console.log("vechiels", vehicles, vehiclesContext);
  return (
    <div className="w-full p-2 gap-[10px]">
      <div className="flex flex-col items-start">
        <label>Search:</label>
        <input
          type="text"
          className="input_ui w-full"
          onChange={handleSearch}
        />
      </div>
      {vehicles != undefined &&
        vehicles.map((vehicle) => {
          return (
            <Card key={vehicle._id}>
              <CardVehicle {...vehicle} />
            </Card>
          );
        })}
    </div>
  );
};
