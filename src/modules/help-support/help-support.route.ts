import { Router } from "express";
import HelpSupportController from "./help-support.controller";

const helpSupportRouter = Router();
// Create request
helpSupportRouter.post("/create", HelpSupportController.create).get("/", HelpSupportController.getAll).get("/:id", HelpSupportController.getById).get("/user/:userId", HelpSupportController.getUserRequests)
.put("/:id/status", HelpSupportController.updateStatus).put("/:id/reply", HelpSupportController.addReply).delete("/:id", HelpSupportController.delete);
export default helpSupportRouter;