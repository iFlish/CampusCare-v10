import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "pcs_staff"], default: "student" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;  // ✅ must be default export
