import dotenv from "dotenv";
dotenv.config();
import app from "./configs/app";
import connectDB from "./configs/database";

const PORT = Number(process.env.PORT) || 5050;

let server: ReturnType<typeof app.listen>;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// ------------------------------
// Handle Uncaught Errors
// ------------------------------
process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("🔥 Unhandled Rejection:", reason);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// ------------------------------
// Graceful Shutdown
// ------------------------------
const shutdown = (signal: string): void => {
  console.log(`⚠️ Received ${signal}. Shutting down...`);

  if (server) {
    server.close(() => {
      console.log("✅ HTTP server closed");
      process.exit(0);
    });

    setTimeout(() => {
      console.error("❌ Force shutdown after timeout");
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

startServer();