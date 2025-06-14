import express from "express";
import cors from "cors";
import cron from "node-cron";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectToDatabase from "./config/connectdb.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_HOST || "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(bodyParser.json());

// Cron job
cron.schedule("*/15 * * * *", () => {
  console.log("Scheduled task running every 15 minutes.");
});

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
