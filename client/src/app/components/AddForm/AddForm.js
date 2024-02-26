import React, { useState, useContext } from "react";
import data from "./formLabels";
import { z } from "zod";
import formatText from "../../utils/formatText";
import schema from "./schema";
import { VehiclesContext } from "@/app/context/appContext";

const AddForm = () => {
  const [vehiclesContext, setVehiclesContext] = useContext(VehiclesContext);

  let initialState = data.map((item) => ({ [item.name]: "" }));
  initialState = Object.assign({}, ...initialState);
  const [formData, setFormData] = useState(initialState);
  const [hasErrors, setHasErrors] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = await schema.parseAsync(formData);
      validatedData.year = new Date(validatedData.year).getFullYear();
      setHasErrors(false);
      const response = await fetch("/api/v1/vehicles", {
        method: "POST",
        body: JSON.stringify(validatedData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const getVehicles = await fetch("/api/v1/vehicles");
      const vehiclesData = await getVehicles.json();
      setVehiclesContext(vehiclesData);
    } catch (error) {
      console.log("error", error);
      if (error instanceof z.ZodError) {
        // Handle validation errors
        setHasErrors(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {data.map((input, index) => {
        return (
          <div
            className="flex flex-col items-start w-full"
            key={`add-input-${input.name}`}
          >
            <label htmlFor={input.name}>{formatText(input.name)}</label>
            <input
              {...input}
              className="input_ui w-full"
              value={formData[input.name]}
              onChange={handleOnChange}
            />
          </div>
        );
      })}
      {hasErrors ? <span>Found errors</span> : null}
      <div>
        <button type="submit">Add new car</button>
      </div>
    </form>
  );
};

export default AddForm;
