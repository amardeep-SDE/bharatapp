import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

/**
 * ✅ CORS CONFIG
 * Frontend: http://localhost:5173
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "🚀 BharatGram Backend API running",
  });
});

export default app;
