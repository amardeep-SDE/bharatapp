import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import User, { IUser } from "../modules/user/user.model.js";
import { verifyToken } from "../utils/jwt.js";

const AUTH_USER_FIELDS =
  "_id username email fullName avatar bio isVerified createdAt updatedAt";

const unauthorized = (res: Response, message: string) =>
  res.status(401).json({ success: false, message });

const getBearerToken = (authorization?: string): string | null => {
  const match = authorization?.match(/^Bearer\s+(.+)$/i);
  return match?.[1].trim() || null;
};

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
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    return unauthorized(res, "Not authorized, token missing");
  }

  try {
    const decoded = verifyToken(token);

    if (!Types.ObjectId.isValid(decoded.id)) {
      return unauthorized(res, "Not authorized, token invalid");
    }

    const user = await User.findById(decoded.id)
      .select(AUTH_USER_FIELDS)
      .lean<IUser>();

    if (!user) {
      return unauthorized(res, "Not authorized, user not found");
    }

    req.user = user;
    return next();
  } catch {
    return unauthorized(res, "Not authorized, token invalid");
  }
};
