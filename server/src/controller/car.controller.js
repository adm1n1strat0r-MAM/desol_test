import Car from "../models/car.model.js";
import createError from "../utils/createError.js";

export const addCar = async (req, res, next) => {
    try {
        const newCar = await Car.create(req.body);
        res.status(201).json(newCar);
      } catch (error) {
        next(error);
      }
};
