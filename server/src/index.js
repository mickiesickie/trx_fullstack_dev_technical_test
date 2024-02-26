import express from "express";
import cors from "cors";
import { mongoose } from "mongoose";
import bodyParser from "body-parser";

import dotenv from "dotenv";

import indexRouter from "./routers/routers.js";

dotenv.config();

const port = process.env.PORT || "4000";
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(indexRouter);
app.use(cors());

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "traxion_test"
    });
    app.listen(port, () => {
      console.log("App listening on por 4000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
