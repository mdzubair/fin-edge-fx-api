import { Router } from "express";
import TicketController from "./ticket.controller";

const ticketRouter = Router();
// Create ticket
ticketRouter.post("/", TicketController.create).get("/", TicketController.getAll)
.get("/:id", TicketController.getById)
.get("/token/:token", TicketController.getByToken)
.get("/user/:userId/:status", TicketController.getUserTickets)
.put("/:id/close", TicketController.updateStatus).delete("/:id", TicketController.delete);
export default ticketRouter;