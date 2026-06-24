import { Request, Response } from "express";
import TicketReplyService from "./ticket-replies.services";

export class TicketReplyController {

  async create(req: Request, res: Response) {
    try {
      const reply = await TicketReplyService.createReply(req.body);

      res.status(201).json({
        success: true,
        data: reply,
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
      const reply = await TicketReplyService.getReplyById(req.params.id as string);

      res.status(200).json({
        success: true,
        data: reply,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getByTicket(req: Request, res: Response) {
    try {
      const replies = await TicketReplyService.getRepliesByTicket(
        req.params.ticketId as string
      );

      res.status(200).json({
        success: true,
        data: replies,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getByUser(req: Request, res: Response) {
    try {
      const replies = await TicketReplyService.getRepliesByUser(
        req.params.userId as string
      );

      res.status(200).json({
        success: true,
        data: replies,
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
      const replies = await TicketReplyService.getAllReplies();

      res.status(200).json({
        success: true,
        data: replies,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await TicketReplyService.deleteReply(req.params.id as string);

      res.status(200).json({
        success: true,
        message: "Reply deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new TicketReplyController();