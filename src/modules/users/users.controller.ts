import { Request, Response } from "express";
import UserService from "./users.services";
export class UserController {
  async register(req: Request, res: Response) {
    try {
       const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const profile = files?.profile?.[0];
      const docs = files?.docs?.[0];

      const payload = {
        ...req.body,
        profile: profile?.filename || "avatar.jpg",
        docs: docs?.filename || "",
      };


      const user = await UserService.register(payload);
      return res.status(201).json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  

  async getProfile(req: Request, res: Response) {
    try {
      const user = await UserService.getProfile(req.params.id as string);
      res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  
  async userVerify(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const user = await UserService.userVerify(id as string,  Number(req.body.status));
      res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await UserService.updateUser(req.params.id as string, req.body);
      res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await UserService.deleteUser(req.params.id as string);
      res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ success: true,  message:"User List found successfully.." , data: users});
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }


  async resetPassword ( req: Request, res: Response ){
    try {
      const user = await UserService.resetPassword(req.params.userId as string, req.body.password);
      return res.status(200).json({ success: true, data: user, message: "Password reset successfully"});
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message});
    }
  };

  async changePassword ( req: Request, res: Response ){
    try {
      const user = await UserService.changePassword(req.params.userId as string, req.body);
      return res.status(200).json({ success: true, data: user, message: "Password changed successfully",});
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message});
    }
  };





}





export default new UserController();