import { Request, Response } from "express";
import WithdrawService from "./withdraw.services";

export class WithdrawController {

  async create(req: Request, res: Response) {
    try {
      const result = await WithdrawService.createWithdraw(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const result = await WithdrawService.getWithdrawById(req.params.id as string);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getUserWithdrawals(req: Request, res: Response) {
    try {
      const {userId, status} = req.params;      
      const result = await WithdrawService.getUserWithdrawals(userId as string, Number(status));
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await WithdrawService.getAllWithdrawals();
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;

      const result = await WithdrawService.updateStatus(
        req.params.id as string,
        status
      );

      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await WithdrawService.deleteWithdraw(req.params.id as string);

      res.status(200).json({
        success: true,
        message: "Withdraw deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new WithdrawController();