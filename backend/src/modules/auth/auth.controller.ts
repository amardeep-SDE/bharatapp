import { Request, Response } from "express";
import User, { IUser } from "../user/user.model.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";

interface RegisterBody {
  username?: unknown;
  email?: unknown;
  password?: unknown;
  fullName?: unknown;
}

interface LoginBody {
  email?: unknown;
  password?: unknown;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isDuplicateKeyError = (error: unknown): error is { code: number } =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  (error as { code?: unknown }).code === 11000;

const sendError = (res: Response, status: number, message: string) =>
  res.status(status).json({ success: false, message });

const serializeUser = (user: IUser) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  fullName: user.fullName,
});

export const register = async (
  req: Request<Record<string, never>, unknown, RegisterBody>,
  res: Response
) => {
  try {
    const { username, email, password, fullName } = req.body ?? {};

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof fullName !== "string"
    ) {
      return sendError(
        res,
        400,
        "Username, email, password and full name are required"
      );
    }

    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedFullName = fullName.trim();

    if (normalizedUsername.length < 3) {
      return sendError(res, 400, "Username must be at least 3 characters");
    }

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      return sendError(res, 400, "Please provide a valid email address");
    }

    if (password.length < 6) {
      return sendError(res, 400, "Password must be at least 6 characters");
    }

    if (!normalizedFullName) {
      return sendError(res, 400, "Full name is required");
    }

    // The database unique indexes avoid a redundant existence read.
    const user = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: await hashPassword(password),
      fullName: normalizedFullName,
    });

    return res.status(201).json({
      success: true,
      token: generateToken({ id: user._id }),
      user: serializeUser(user),
    });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return sendError(res, 409, "User already exists");
    }

    return sendError(res, 500, "Registration failed");
  }
};

export const login = async (
  req: Request<Record<string, never>, unknown, LoginBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body ?? {};

    if (typeof email !== "string" || typeof password !== "string") {
      return sendError(res, 400, "Email and password are required");
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      return sendError(res, 400, "Email and password are required");
    }

    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password"
    );

    if (!user || !(await comparePassword(password, user.password))) {
      return sendError(res, 401, "Invalid credentials");
    }

    return res.json({
      success: true,
      token: generateToken({ id: user._id }),
      user: serializeUser(user),
    });
  } catch {
    return sendError(res, 500, "Login failed");
  }
};
