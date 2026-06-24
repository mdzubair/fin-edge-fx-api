import { Router } from "express";
import OfferController from "./offer.controller";

const offerRouter = Router();

// Create offer
offerRouter.post("/create", OfferController.create).get("/", OfferController.getAll).get("/:id", OfferController.getById).get("/user/:userId", OfferController.getUserOffers).put("/:id/status", OfferController.updateStatus).delete("/:id", OfferController.delete);

export default offerRouter;