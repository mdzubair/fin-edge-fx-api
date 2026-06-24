import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import routeStarter from "../routes";

dotenv.config();

const app = express();

/**
 * Security Headers
 */
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

/**
 * Allowed Origins
 */
const allowedOrigins: string[] = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://fin-edge-fx.vercel.app",
  process.env.APP_URL || "",
].filter(Boolean);

/**
 * CORS Configuration
 */
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests without origin
    // (Postman, mobile apps, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error(`❌ CORS Blocked Origin: ${origin}`);

    return callback(
      new Error(`Origin ${origin} is not allowed by CORS`)
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],

  exposedHeaders: [
    "Set-Cookie",
    "Authorization",
  ],
};

app.use(cors(corsOptions));

/**
 * Handle Preflight Requests
 */
app.options("*", cors(corsOptions));

/**
 * Body Parsers
 */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/**
 * Cookie Parser
 */
app.use(cookieParser());

/**
 * Static Files
 */
app.use(
  "/api/v1/public",
  express.static(path.join(process.cwd(), "public"))
);

/**
 * Health Check
 */
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Fin Edge FX API Running Successfully",
    environment: process.env.NODE_ENV,
  });
});

/**
 * API Routes
 */
app.use("/api/v1", routeStarter);

/**
 * 404 Handler
 */
app.use("*", (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * Global Error Handler
 */
app.use(
  (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error("🔥 Server Error:", err);

    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
);

export default app;