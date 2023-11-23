import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_KEY } from "../config/config.js";
import createError from "../utils/createError.js";

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User not Found"));
    }
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(404, "Wrong password or username"));
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_KEY
    );

    const { password, ...info } = user._doc;
    const response = {info, token};

    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(response);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
