import express, { json } from "express";
import coordinates from "../mocks/exampleRoute.js";
import Vehicle from "../models/vehicle.js";
var indexRouter = express.Router();

indexRouter.get("/api/v1/routes", async (req, res) => {
  res.status(200).json({ coordinates });
});

indexRouter.get("/api/v1/vehicles", async (req, res) => {
  //get post put  switch
  const vehicles = await Vehicle.find();
  return res.status(200).json({ vehicles });
});

indexRouter.post("/api/v1/vehicles", async (request, response) => {
  console.log("request body", request.body);
  try {
    var newVehicle = new Vehicle(request.body);
    await newVehicle.save();
    return response.status(200).json({ vehicle: newVehicle });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return response.status(400).send(errors);
    }
    return response.status(400).json({ message: "errr" });
  }
});

indexRouter.delete("/api/v1/vehicles/:id", async (req, res) => {
  const _id = req.params.id;
  console.log("id", req.params["id"]);
  try {
    let vehicleDeleted = await Vehicle.findByIdAndDelete(_id);
    console.log("vehiCle", vehicleDeleted);
    return res.status(200).json({ vehicle: vehicleDeleted });
  } catch (error) {
    console.log("errr", error);
  }
});
export default indexRouter;
