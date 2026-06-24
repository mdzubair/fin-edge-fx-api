import { Request, Response } from "express";
import CurrencyService from "./currency.services";

export class CurrencyController {

  async create(req: Request, res: Response) {
    try {
      const result = await CurrencyService.createCurrency(req.body.usdToInr);
      res.status(201).json({success: true,data: result,});
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message,});
    }
  }

  async getUsdVal(req: Request, res: Response) {
    try {
      const result = await CurrencyService.getUsdVal();
      res.status(201).json({success: true,data: result,});
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message,});
    }
  }

}

export default new CurrencyController();