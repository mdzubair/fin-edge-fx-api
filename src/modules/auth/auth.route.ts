import { Router } from "express";
import AthController from "./auth.controller";
const authRouter = Router();
authRouter.post("/login", AthController.login).post("/refresh-token", AthController.refreshToken).post("/logout", AthController.logout);
export default authRouter;