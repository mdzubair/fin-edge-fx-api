import { Request, Response } from "express";
import TicketService from "./ticket.services";

export class TicketController {

  async create(req: Request, res: Response) {
    try {
      const ticket = await TicketService.createTicket(req.body);

      res.status(201).json({
        success: true,
        data: ticket,
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
      const ticket = await TicketService.getTicketById(req.params.id as string);

      res.status(200).json({
        success: true,
        data: ticket,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getByToken(req: Request, res: Response) {
    try {
      const ticket = await TicketService.getTicketByToken(req.params.token as string);

      res.status(200).json({
        success: true,
        data: ticket,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserTickets(req: Request, res: Response) {
    try {
      const {userId, status} = req.params;
      const tickets = await TicketService.getUserTickets(userId as string, Number(status));

      res.status(200).json({
        success: true,
        data: tickets,
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
      const tickets = await TicketService.getAllTickets();

      res.status(200).json({
        success: true,
        data: tickets,
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

      const ticket = await TicketService.updateStatus(
        req.params.id as string,
        1
      );

      res.status(200).json({
        success: true,
        data: ticket,
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
      await TicketService.deleteTicket(req.params.id as string);

      res.status(200).json({
        success: true,
        message: "Ticket deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new TicketController();