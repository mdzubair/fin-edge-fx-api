import { Router } from "express";
import TicketReplyController from "./ticket-replies.controller";

const ticketReplyRouter = Router();

// Create reply
ticketReplyRouter.post("/create", TicketReplyController.create).get("/", TicketReplyController.getAll).get("/:id", TicketReplyController.getById).get("/ticket/:ticketId", TicketReplyController.getByTicket).get("/user/:userId", TicketReplyController.getByUser).delete("/:id", TicketReplyController.delete);

export default ticketReplyRouter;