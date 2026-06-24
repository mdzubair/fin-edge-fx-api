import { Request, Response } from "express";
import ReceiptService from "./receipt.services";

export class ReceiptController {

  async create(req: Request, res: Response) {
    try {
      if(req.file){
        req.body.receipt = req.file.filename;
      }
      const receipt = await ReceiptService.createReceipt(req.body);
      res.status(201).json({ success: true, data: receipt,});
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message,});
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const receipt = await ReceiptService.getReceiptById(req.params.id as string,  Number(req.params.status));

      res.status(200).json({
        success: true,
        data: receipt,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserReceipts(req: Request, res: Response) {
    try {
      const {userId, status} = req.params;
      const receipts = await ReceiptService.getUserReceipts(userId as string, Number(status));

      res.status(200).json({
        success: true,
        data: receipts,
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
      const receipts = await ReceiptService.getAllReceipts();

      res.status(200).json({
        success: true,
        data: receipts,
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
      const receipt = await ReceiptService.updateStatus(req.params.id  as string, Number(status));
      res.status(200).json({success: true,data: receipt,});
    } catch (error: any) {
      res.status(400).json({success: false,message: error.message,});
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await ReceiptService.deleteReceipt(req.params.id as string);

      res.status(200).json({
        success: true,
        message: "Receipt deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ReceiptController();