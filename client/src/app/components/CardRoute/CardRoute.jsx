import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const CardRoute = ({ lat, lng }) => {
  return (
    <div className="flex flex-row items-center justify-evenly">
      <div>
        <FaLocationDot />
      </div>
      <div className="flex flex-col">
        <span>{`Lat: ${lat}`}</span>
        <span>{`Lng: ${lng}`}</span>
      </div>
    </div>
  );
};

export default CardRoute;
