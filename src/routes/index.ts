import { Request, Response, Router } from "express";

import { verifyToken } from "../middleware/auth.middleware";
import userRouter from "../modules/users/users.route";
import withdrawRouter from "../modules/withdraw/withdraw.route";
import ticketReplyRouter from "../modules/ticket-replies/ticket-replies.route";
import ticketRouter from "../modules/ticket/ticket.route";
import receiptRouter from "../modules/receipt/receipt.route";
import offerRouter from "../modules/offers/offer.route";
import helpSupportRouter from "../modules/help-support/help-support.route";
import depositRouter from "../modules/diposits/deposit.route";
import currencyRouter from "../modules/currency/currency.route";
import contactRouter from "../modules/contact-us/contact-us.route";
import accountRouter from "../modules/account/account.route";
import metaAppRouter from "../modules/meta-app-password/meta-app-password.route";
import authRouter from "../modules/auth/auth.route";
const routeStarter = Router();
routeStarter.get("/", (req:Request, res:Response)=>{
    res.status(200).json({success:true, message:"default route started"});
})
routeStarter.use("/user", verifyToken, userRouter);
routeStarter.use("/auth", authRouter);
routeStarter.use("/withdraw", verifyToken, withdrawRouter);
routeStarter.use("/ticket", verifyToken, ticketRouter);
routeStarter.use("/ticket-reply", verifyToken, ticketReplyRouter);
routeStarter.use("/receipt", verifyToken, receiptRouter);
routeStarter.use("/offer", verifyToken, offerRouter);
routeStarter.use("/help-support", verifyToken, helpSupportRouter);
routeStarter.use("/deposit", verifyToken, depositRouter);
routeStarter.use("/currency", verifyToken, currencyRouter);
routeStarter.use("/contact-us", verifyToken, contactRouter);
routeStarter.use("/account", verifyToken, accountRouter);
routeStarter.use("/meta-app-password",verifyToken,  metaAppRouter);
export default routeStarter;