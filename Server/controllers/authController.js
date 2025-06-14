import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;
    console.log(username, password);

    try {
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: "User not found." });
      // Compare hashed passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid email or password" });
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "Login failed." });
    }
  }
}

export default AuthController;
