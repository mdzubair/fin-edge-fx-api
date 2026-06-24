import { Request, Response } from "express";
import AccountService from "./account.services";

export class AccountController {

  async create(req: Request, res: Response) {
    try {
      if (req.file) {
        req.body.qr = req.file.filename; // not originalname
      }else{
        req.body.qr = "default-qrCode.png";
      }
      //  req.body.userId = req.params.userId;
      const result = await AccountService.createAccount(req.body);

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
      const result = await AccountService.getById(req.params.id as string);
      res.status(200).json({ success: true, data: result,});
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message,});
    }
  }

  // async getSinglePayAccByUserId(req: Request, res: Response) {
  //   try {    
  //     const result = await AccountService.getSinglePayAccByUserId(req.params.userId as string);
  //     res.status(200).json({ success: true, data: result,});
  //   } catch (error: any) {
  //     res.status(404).json({ success: false, message: error.message,});
  //   }
  // }

  async getSinglePayAccByUserId(req: Request, res: Response) {
    try {    
      const result = await AccountService.getSinglePayAccByUserId();
      res.status(200).json({ success: true, data: result,});
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message,});
    }
  }

  async getUserAccounts(req: Request, res: Response) {
    try {
      const result = await AccountService.getUserAccounts(req.params.userId as string);

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
      const result = await AccountService.getAll();

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

  async update(req: Request, res: Response) {
    try {
        if (req.file) {
        req.body.qr = req.file.filename; // not originalname
      }
      const result = await AccountService.updateAccount(
        req.params.id as string,
        req.body
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

  async updateStatus(req: Request, res: Response) {
    try {
      const result = await AccountService.updateStatus(req.params.id as string, req.body.status);
      res.status(200).json({ success: true, data: result,});
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message,});
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await AccountService.deleteAccount(req.params.id as string);

      res.status(200).json({
        success: true,
        message: "Account deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new AccountController();