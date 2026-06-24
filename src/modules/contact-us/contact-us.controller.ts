import { Request, Response } from "express";
import ContactUsService from "./contact-us.services";

export class ContactUsController {

  async submit(req: Request, res: Response) {
    try {
      const result = await ContactUsService.submitForm(req.body);

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
      const result = await ContactUsService.getById(req.params.id as string);

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

  async getAll(req: Request, res: Response) {
    try {
      const result = await ContactUsService.getAll();

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

  async getByEmail(req: Request, res: Response) {
    try {
      const result = await ContactUsService.getByEmail(req.params.email as string);

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
      await ContactUsService.delete(req.params.id as string);

      res.status(200).json({
        success: true,
        message: "Contact deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ContactUsController();