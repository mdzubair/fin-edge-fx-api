import { Request, Response, NextFunction } from "express";
import { decodedAccessToken } from "../utils/helpers";

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = ( req: AuthRequest,  res: Response,  next: NextFunction ) => {    
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Access token required" });
    }
 
    const token = authHeader.split(" ")[1];
    const decoded = decodedAccessToken( token);
    req.user = decoded;
    next();
  } catch (error: any) {
    return res.status(401).json({ success: false, message:  error.name === "TokenExpiredError" ? "Token expired" : "Invalid token", });
  }
};