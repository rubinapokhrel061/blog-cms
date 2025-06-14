import mongoose from "mongoose";
import "dotenv/config";
import seedAdmin from "../seeder/adminSeeder.js";

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to the database");
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL);
    await seedAdmin();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error({
      message: "Database connection failed",
      error: error.message,
    });
  }
};

export default connectToDatabase;
