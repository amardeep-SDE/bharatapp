import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { getMe, getUserById, updateMe } from "./user.controller.js";

const router = Router();

router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
router.get("/:id", getUserById);

export default router;
