"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import Layout from "./components/Layout/Layout";
import SideBar from "./components/SideBar/SideBar";
import { VehiclesContext } from "./context/appContext";

export default function Home() {
  const [vehiclesContext, setVehiclesContext] = useState([]);
  return (
    <main className={styles.main}>
      <VehiclesContext.Provider value={[vehiclesContext, setVehiclesContext]}>
        <Layout />
        <SideBar />
      </VehiclesContext.Provider>
    </main>
  );
}
