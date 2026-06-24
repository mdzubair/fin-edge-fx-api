import { Router } from "express";
import AccountController from "./account.controller";
import { uploadAcc } from "../../utils/helpers";

const accountRouter = Router();
// http://localhost:5050/api/v1/account/user/6a2e6ea4727b2d81cc325ed9 Get Account list Using UserId
// http://localhost:5050/api/v1/account/6a2e6ea4727b2d81cc325ed9/create create Account Using UserId
// http://localhost:5050/api/v1/account/6a2e84cf622d1977c8ae42b3a get Single Acount Using docId
// http://localhost:5050/api/v1/account/6a2e84cf622d1977c8ae42b3 Delete Account using docId


accountRouter.post("/create", uploadAcc.single("qr"), AccountController.create)
.get("/", AccountController.getAll)
.get("/:id", AccountController.getById)
.get("/pay-acc/:userId", AccountController.getSinglePayAccByUserId)
.get("/user/:userId", AccountController.getUserAccounts)
.put("/:id", uploadAcc.single("qr"), AccountController.update)
.put("/:id/status", AccountController.updateStatus)
.delete("/:id", AccountController.delete);
export default accountRouter;