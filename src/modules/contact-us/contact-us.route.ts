import { Router } from "express";
import ContactUsController from "./contact-us.controller";

const contactRouter = Router();

// Submit contact form
contactRouter.post("/", ContactUsController.submit).get("/", ContactUsController.getAll).get("/:id", ContactUsController.getById).get("/email/:email", ContactUsController.getByEmail).delete("/:id", ContactUsController.delete);

export default contactRouter;