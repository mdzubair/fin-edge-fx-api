import { Router } from "express";
import WithdrawController from "./withdraw.controller";
const withdrawRouter = Router();
withdrawRouter.post("/", WithdrawController.create).get("/", WithdrawController.getAll).get("/:id", WithdrawController.getById).get( "/user/:userId/:status", WithdrawController.getUserWithdrawals).put("/:id/status", WithdrawController.updateStatus).delete("/:id", WithdrawController.delete);
export default withdrawRouter;