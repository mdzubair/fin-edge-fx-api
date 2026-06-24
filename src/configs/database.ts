// import dotenv from "dotenv";
// import dns from "node:dns";
// import mongoose from "mongoose";
// dns.setServers(["8.8.8.8", "8.8.4.4"]);
// let isConnected = false;
// dotenv.config();
// const connectDB = async (): Promise<void> => {
//   try {
//     if (isConnected) {
//       return;
//     }

//     const mongoUri = process.env.MONGODB_URI;

//     if (!mongoUri) {
//       throw new Error("MONGODB_URI is not defined");
//     }

//     await mongoose.connect(mongoUri, {
//       dbName: process.env.DB_NAME,
//     });

//     isConnected = true;

//     console.log("✅ MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error);
//     throw error;
//   }
// };

// export default connectDB;


import dotenv from "dotenv";
import dns from "node:dns";
import mongoose from "mongoose";

dotenv.config();

// Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async (): Promise<void> => {
  try {
    // Already connected
    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB already connected");
      return;
    }

    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;