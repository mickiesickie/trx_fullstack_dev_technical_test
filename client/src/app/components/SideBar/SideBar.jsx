"use client";
import React, { useState } from "react";
import styles from "./sidebar.module.scss";
import { FaRoute, FaCar, FaPlusCircle } from "react-icons/fa";
import { Vehicles } from "../Vehicles/Vehicles";
import Route from "../Route/Route";
import AddCar from "../AddCar/AddCar";

const menutItems = [
  {
    text: "new vehicle",
    icon: <FaPlusCircle />,
    content: <AddCar />
  },
  {
    text: "routes",
    icon: <FaRoute />,
    content: <Route />
  },
  {
    text: "vehicles",
    icon: <FaCar />,
    content: <Vehicles />
  }
];
const SideBar = () => {
  const [selectedMenu, setSelectedMenu] = useState();
  const handleOpenMenu = (inx) => {
    setSelectedMenu((prevState) => (prevState === inx ? null : inx));
  };
  return (
    <div className={styles.wrapper_sidebar}>
      <ul className="flex flex-col items-center">
        {menutItems.map((item, index) => (
          <li
            key={index}
            className={`flex flex-col items-center p-3 hover:bg-cerulean hover:text-platinum w-full ${
              selectedMenu === index ? `${styles.selected}` : ""
            }`}
          >
            <button
              className="flex flex-col items-center"
              onClick={() => handleOpenMenu(index)}
            >
              {item.icon}
              <span>{item.text}</span>
            </button>
          </li>
        ))}
      </ul>

      <ul className={styles.container_menu}>
        {menutItems.map((item, index) => (
          <li
            key={`${index}`}
            className={`${
              selectedMenu === index
                ? `${styles.opened_item}`
                : `${styles.hidden}`
            }`}
          >
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
