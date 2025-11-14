import User from "../models/User.js";


export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.create({ username, email, password, role });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user", details: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // If using plain text password:
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    // If using bcrypt hash:
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect password" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.json({ success: false, message: "Email not found" });
    }
    
    // Update password (plain text in your case)
    // If you want to use bcrypt hashing, uncomment the lines below
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    // user.password = hashedPassword;
    
    user.password = newPassword;
    await user.save();
    
    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ success: false, message: "Error resetting password", error: err.message });
  }
};
