import React, { useState, useContext } from "react";
import { FaCar, FaChevronDown } from "react-icons/fa";
import styles from "./card_vehicle.module.scss";
import { VehiclesContext } from "@/app/context/appContext";

const CardVehicle = (props) => {
  const [vehiclesContext, setVehiclesContext] = useContext(VehiclesContext);

  const [isOpen, setIsOpen] = useState(false);
  const {
    color,
    brand,
    plate,
    model,
    seats,
    year,
    vim,
    insurance_company,
    insurance_id,
    _id
  } = props;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/v1/vehicles/${id}`, {
      method: "DELETE"
    });
    try {
      const response = await fetch("/api/v1/vehicles");
      const jsonData = await response.json();
      setVehiclesContext(jsonData);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className={styles.wrapper_card_vehicle}>
      <div className={styles.wrapper_card_title}>
        <FaCar className={styles.wrapper_card_tile_icon_car} />
        <h5 className={styles.wrapper_card_title_text}>{brand}</h5>
        <button
          className={styles.wrapper_card_tile_icon_chevron}
          onClick={handleClick}
        >
          <FaChevronDown />
        </button>
      </div>
      <div
        className={`
            ${styles.wrapper_card_description}  ${
          isOpen ? `${styles.isOpen}` : ``
        }`}
      >
        <span>Color: {color}</span>
        <span>Plate: {plate}</span>
        <span>Model: {model}</span>
        <span>Seats: {seats}</span>
        <span>Year: {year}</span>
        <span>Vim: {vim}</span>
        <span>Insurance_company: {insurance_company}</span>
        <span>Insurance_id: {insurance_id}</span>
        <div className="flex flex-row basis-full ">
          <button
            onClick={() => handleDelete(_id)}
            className="p-2 bg-blue_two text-prussian py-1 rounded m-2"
          >
            Borrar
          </button>
          <button className="p-2 bg-blue_two text-prussian py-1 rounded m-2">
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardVehicle;
