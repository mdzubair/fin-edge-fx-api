import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import routeStarter from "../routes";

dotenv.config();

const app = express();

// Security
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// CORS
// app.use(
//   cors({
//     origin: process.env.APP_URL,
//     credentials: true,
//   })
// );


app.use(
  cors({
    origin: "https://fin-edge-fx.vercel.app",
    credentials: true,
  })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser (IMPORTANT)
app.use(cookieParser());

// Static Files
app.use(
  "/api/v1/public",
  express.static(path.join(process.cwd(), "public"))
);

// Routes
app.use("/api/v1", routeStarter);

export default app;