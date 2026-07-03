import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../modules/user/user.model.js";
import { verifyToken } from "../utils/jwt.js";

const BEARER_PREFIX = "Bearer ";
const AUTH_USER_FIELDS =
  "_id username email fullName avatar bio isVerified createdAt updatedAt";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith(BEARER_PREFIX)
    ? authHeader.slice(BEARER_PREFIX.length).trim()
    : "";

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token missing",
    });
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select(AUTH_USER_FIELDS);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user not found",
      });
    }

    req.user = user;
    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token invalid",
    });
  }
};
