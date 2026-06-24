import { Request, Response } from "express";
import * as metaAppService from "./meta-app-password.services";

export const create = async (req: Request, res: Response) => {
  try {
    req.body.userId = req.params.userId;
    const result = await metaAppService.create(req.body);
    return res.status(201).json({ success: true, data: result,});
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message || "Something went wrong",});
  }
};