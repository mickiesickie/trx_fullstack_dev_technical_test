import React from "react";
import AddForm from "../AddForm/AddForm";
const AddCar = () => {
  return (
    <div className=" w-full flex flex-col bg-prussian m-2 p-2">
      <h3>Add new vehicle</h3>
      <AddForm />
    </div>
  );
};

export default AddCar;
