import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import chatRoutes from "./routes/chatRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes);

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.get("/test-gemini", async (req, res) => {
  try {
    const result = await queryGemini("Hello", "");
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});