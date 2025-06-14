import bcrypt from "bcrypt";
import User from "../models/user.js";

const seedAdmin = async () => {
  const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);
    await User.create({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });
    console.log("Admin seeded successfully");
  } else {
    console.log("Admin already exists");
  }
};

export default seedAdmin;
