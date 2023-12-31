import express from "express";
import { PORT } from "../src/config/config.js";
import "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRoute from "./routes/auth.route.js";
import carRoute from "./routes/car.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/cars", carRoute);

app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
})

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});
