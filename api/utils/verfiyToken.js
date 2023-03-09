import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verfiyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "sorry you're not allowed to access"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "sorry your token is not valid"));
    req.user = user;
    next();
  });
};

export const verfiyUser = (req, res, next) => {
  verfiyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "sorry your are not authorized"));
    }
  });
};

export const verfiyAdmin = (req, res, next) => {
  verfiyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(405, "sorry your are not admin"));
    }
  });
};
