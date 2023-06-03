import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "User not authenticated!"));
  jwt.verify(token, "secret", async (err, payload) => {
    if (err) return next(createError(403, "Invalid access token"));
    req.userId = payload.id;
    req.isServiceProvider = payload.isServiceProvider;
    next();
  });
};
