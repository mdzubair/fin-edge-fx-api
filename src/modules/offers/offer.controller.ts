import { Request, Response } from "express";
import OfferService from "./offer.services";

export class OfferController {

  async create(req: Request, res: Response) {
    try {
      const offer = await OfferService.createOffer(req.body);

      res.status(201).json({
        success: true,
        data: offer,
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
      const offer = await OfferService.getOfferById(req.params.id as string);

      res.status(200).json({
        success: true,
        data: offer,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserOffers(req: Request, res: Response) {
    try {
      const offers = await OfferService.getUserOffers(req.params.userId  as string);

      res.status(200).json({
        success: true,
        data: offers,
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
      const offers = await OfferService.getAllOffers();

      res.status(200).json({
        success: true,
        data: offers,
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

      const offer = await OfferService.updateStatus(
        req.params.id  as string,
        status
      );

      res.status(200).json({
        success: true,
        data: offer,
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
      await OfferService.deleteOffer(req.params.id  as string);

      res.status(200).json({
        success: true,
        message: "Offer deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new OfferController();