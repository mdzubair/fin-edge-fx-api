import { Router } from "express";
import UserController from "./users.controller";
import { upload } from "../../utils/helpers";
const userRouter = Router();
// userRouter.post("/register", upload.fields([{ name: "profile", maxCount: 1 },{ name: "docs", maxCount: 1 }
//   ]), UserController.register)
userRouter.post("/register", UserController.register)
  // .post("/login", UserController.login)
  .post("/:id/status", UserController.userVerify)
  .get("/:id", UserController.getProfile)
  .put("/:id", UserController.updateUser)
  .put("/:userId/reset-password", UserController.resetPassword)
  .put("/:userId/change-password", UserController.changePassword)
  .delete("/:id", UserController.deleteUser)
  .get("/", UserController.getAllUsers);
export default userRouter;