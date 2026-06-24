import { Request, Response } from "express";
import DepositService from "./deposit.services";

export class DepositController {

  async create(req: Request, res: Response) {
    try {
      const result = await DepositService.createDeposit(req.body);

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
      const result = await DepositService.getDepositById(req.params.id as string);

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

  async getUserDeposits(req: Request, res: Response) {
    try {
      const {userId, status} = req.params;
      const result = await DepositService.getUserDeposits(userId as string, status as string);

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
      const result = await DepositService.getAllDeposits();

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

  async delete(req: Request, res: Response) {
    try {
      await DepositService.deleteDeposit(req.params.id as string);

      res.status(200).json({
        success: true,
        message: "Deposit deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new DepositController();