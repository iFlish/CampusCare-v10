import express from "express";
import { chatWithBot } from "../controllers/chatControllers.js";

const router = express.Router();
router.post("/", chatWithBot);   
export default router;
