import express from "express";
// @ts-ignore: No types for 'cors' installed
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();


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
// app.get("/", (_req, res) => {
//   res.json({
//     success: true,
//     message: "🚀 BharatGram Backend API running",
//   });
// });

export default app;
