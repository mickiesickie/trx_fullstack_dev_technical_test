import mongoose, { Schema, isObjectIdOrHexString, model } from "mongoose";

const VehicleSchema = new Schema({
  plate: {
    type: String,
    required: true
  },
  economic_number: {
    type: String,
    required: true
  },
  vim: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  insurance_company: {
    type: String,
    required: true
  },
  insurance_id: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

const Vehicle = model("Vehicles", VehicleSchema);
export default Vehicle;
