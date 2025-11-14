import express from "express";
import { getAdminStats } from "../controllers/adminController.js";

const router = express.Router();

// Route for admin dashboard data
router.get("/stats", getAdminStats);

export default router;
