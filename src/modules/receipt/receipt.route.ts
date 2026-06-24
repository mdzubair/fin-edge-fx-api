import { Router } from "express";
import ReceiptController from "./receipt.controller";
import { uploadReceipt } from "../../utils/helpers";

const receiptRouter = Router();

// http://localhost:5050/api/v1/receipt for upload receipt
// accId:6a2e9526b6d5748b3e3b4230
// amount:1261
// payBy:BANK_TRANSFER
// userId:6a2e6ea4727b2d81cc325ed9
// receipt

// http://localhost:5050/api/v1/receipt/user/6a2e6ea4727b2d81cc325ed9 get receipt list usiing userId
// http://localhost:5050/api/v1/receipt/6a2eee30ef3e2fa4c873a0a5 get recipt detail using receipt ID


receiptRouter.post("/", uploadReceipt.single("receipt"), ReceiptController.create).get("/", ReceiptController.getAll).get("/:id/:status", ReceiptController.getById).get("/user/:userId/:status", ReceiptController.getUserReceipts).put("/:id/status", ReceiptController.updateStatus).delete("/:id", ReceiptController.delete);
export default receiptRouter;