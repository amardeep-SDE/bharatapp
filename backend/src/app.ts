import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";

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
app.use("/api/users", userRoutes);

// Health check
// app.get("/", (_req, res) => {
//   res.json({
//     success: true,
//     message: "🚀 BharatGram Backend API running",
//   });
// });

export default app;
