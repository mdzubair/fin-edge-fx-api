import { Request, Response } from "express";
import HelpSupportService from "./help-support.services";

export class HelpSupportController {

  async create(req: Request, res: Response) {
    try {
      const result = await HelpSupportService.createRequest(req.body);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const result = await HelpSupportService.getById(req.params.id as string);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserRequests(req: Request, res: Response) {
    try {
      const result = await HelpSupportService.getUserRequests(req.params.userId as string);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await HelpSupportService.getAllRequests();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;

      const result = await HelpSupportService.updateStatus(
        req.params.id as string,
        status
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async addReply(req: Request, res: Response) {
    try {
      const result = await HelpSupportService.addReply(
        req.params.id as string,
        req.body.replyId
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await HelpSupportService.deleteRequest(req.params.id as string);

      res.status(200).json({
        success: true,
        message: "Request deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new HelpSupportController();