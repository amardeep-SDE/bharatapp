import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

// ---------- Middlewares ----------
app.use(cors());
app.use(express.json());

// ---------- Health Check ----------
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "🚀 BharatGram Backend API running (ESM)",
  });
});

export default app;
