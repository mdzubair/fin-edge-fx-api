import { Router } from "express";
import DepositController from "./deposit.controller";

const depositRouter = Router();

// Create deposit
depositRouter.post("/create", DepositController.create).get("/", DepositController.getAll).get("/:id", DepositController.getById).get("/user/:userId/:status", DepositController.getUserDeposits).delete("/:id", DepositController.delete);
export default depositRouter;