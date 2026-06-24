import { Router } from "express";
import * as metaAppController from "./meta-app-password.controller";
const metaAppRouter = Router();
metaAppRouter.post("/:userId/generate-credentials", metaAppController.create);
export default metaAppRouter;