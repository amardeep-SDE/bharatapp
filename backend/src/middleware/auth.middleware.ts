import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import User, { IUser } from "../modules/user/user.model.js";
import { verifyToken } from "../utils/jwt.js";

const AUTH_USER_FIELDS =
  "_id username email fullName avatar bio isVerified createdAt";
const BEARER_TOKEN_PATTERN = /^Bearer\s+(.+)$/i;

type AuthenticatedUser = Pick<
  IUser,
  | "username"
  | "email"
  | "fullName"
  | "avatar"
  | "bio"
  | "isVerified"
  | "createdAt"
> & {
  _id: Types.ObjectId;
};

const unauthorized = (res: Response, message: string) =>
  res.status(401).json({ success: false, message });

const getBearerToken = (authorization?: string): string | null => {
  const match = authorization?.match(BEARER_TOKEN_PATTERN);
  return match?.[1].trim() || null;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
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
      .lean<AuthenticatedUser>()
      .exec();

    if (!user) {
      return unauthorized(res, "Not authorized, user not found");
    }

    req.user = user;
    return next();
  } catch {
    return unauthorized(res, "Not authorized, token invalid");
  }
};
