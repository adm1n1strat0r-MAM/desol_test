import { Router } from "express";
const router = Router();
import { addCar } from "../controller/car.controller.js";
import { verifyToken } from "../middleware/jwt.js";

router.post("/", verifyToken, addCar);

export default router;
