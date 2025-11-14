import express from "express";
import { registerUser, getAllUsers,loginUser,resetPassword } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", registerUser);
router.get("/all", getAllUsers);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);
export default router;

