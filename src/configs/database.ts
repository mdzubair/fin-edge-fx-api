import dotenv from "dotenv";
import dns from "node:dns";
import mongoose from "mongoose";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
let isConnected = false;
dotenv.config();
const connectDB = async (): Promise<void> => {
  try {
    if (isConnected) {
      return;
    }

    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(mongoUri, {
      dbName: process.env.DB_NAME,
    });

    isConnected = true;

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;