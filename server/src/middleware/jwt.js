import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import {JWT_KEY} from '../config/config.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);
  if (!token) return next(createError(401, "You are not authenticated!"));


  jwt.verify(token, JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.userId = payload.id;
    next();
  });
};
