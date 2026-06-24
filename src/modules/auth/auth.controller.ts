import { Request, Response } from "express";
import AuthService from "./auth.services";
import { decodedRefreshToken, generateAccessToken } from "../../utils/helpers";

export class AthController {
//   async register(req: Request, res: Response) {
//     try {
//        const files = req.files as {
//         [fieldname: string]: Express.Multer.File[];
//       };

//       const profile = files?.profile?.[0];
//       const docs = files?.docs?.[0];

//       const payload = {
//         ...req.body,
//         profile: profile?.filename || "avatar.jpg",
//         docs: docs?.filename || "",
//       };


//       const user = await UserService.register(payload);
//       return res.status(201).json({ success: true, data: user });
//     } catch (error: any) {
//       res.status(400).json({ success: false, message: error.message });
//     }
//   }

//   async login(req: Request, res: Response) {
//     try {
//       const { email, password } = req.body;
//       const user = await AuthService.login(email, password);
//       res.status(200).json({ success: true, data: user });
//     } catch (error: any) {
//       res.status(401).json({ success: false, message: error.message });
//     }
//   }

// async refreshToken(req: Request, res: Response) {
//   const token = req.cookies.refreshToken;
//   if (!token) {
//     return res.status(401).json({ message: "No refresh token" });
//   }

//   try {
//     const decoded = decodedToken( token );
//     const newAccessToken = generateAccessToken({id: (decoded as any).id, email: (decoded as any).email, });

//     return res.json({ accessToken: newAccessToken });
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid refresh token" });
//   }
// };

//   async getProfile(req: Request, res: Response) {
//     try {
//       const user = await UserService.getProfile(req.params.id as string);
//       res.status(200).json({ success: true, data: user });
//     } catch (error: any) {
//       res.status(404).json({ success: false, message: error.message });
//     }
//   }

  
//   async userVerify(req: Request, res: Response) {
//     try {
//       const {id} = req.params;
//       const user = await UserService.userVerify(id as string,  Number(req.body.status));
//       res.status(200).json({ success: true, data: user });
//     } catch (error: any) {
//       res.status(404).json({ success: false, message: error.message });
//     }
//   }

//   async updateUser(req: Request, res: Response) {
//     try {
//       //  const files = req.files as {
//       //   [fieldname: string]: Express.Multer.File[];
//       // };

//       // const profile = files?.profile?.[0];
//       // const docs = files?.docs?.[0];
//       // if(profile?.filename){
//       //  req.body.profile = profile?.filename;
//       // }
//       // if(docs?.filename){
//       //  req.body.docs = docs?.filename;
//       // }

//       const user = await UserService.updateUser(req.params.id as string, req.body);
//       res.status(200).json({ success: true, data: user });
//     } catch (error: any) {
//       res.status(400).json({ success: false, message: error.message });
//     }
//   }

//   async deleteUser(req: Request, res: Response) {
//     try {
//       await UserService.deleteUser(req.params.id as string);
//       res.status(200).json({ success: true, message: "Deleted successfully" });
//     } catch (error: any) {
//       res.status(400).json({ success: false, message: error.message });
//     }
//   }

//   async getAllUsers(req: Request, res: Response) {
//     try {
//       const users = await UserService.getAllUsers();
//       res.status(200).json({ success: true,  message:"User List found successfully.." , data: users});
//     } catch (error: any) {
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }


//   async resetPassword ( req: Request, res: Response ){
//     try {
//       const user = await UserService.resetPassword(req.params.userId as string, req.body.password);
//       return res.status(200).json({ success: true, data: user, message: "Password reset successfully"});
//     } catch (error: any) {
//       return res.status(400).json({ success: false, message: error.message});
//     }
//   };

//   async changePassword ( req: Request, res: Response ){
//     try {
//       const user = await UserService.changePassword(req.params.userId as string, req.body);
//       return res.status(200).json({ success: true, data: user, message: "Password changed successfully",});
//     } catch (error: any) {
//       return res.status(400).json({ success: false, message: error.message});
//     }
//   };


async login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(401).json({ success: false, message: error.message,});
  }
}

async refreshToken(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ success: false, message: "Refresh token missing", });
  }

  try {
    const decoded = decodedRefreshToken(refreshToken) as any;
    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const payload = {
      userId: decoded.userId || decoded._id,
      email: decoded.email,
      userType: decoded.userType,
    };
    const accessToken = generateAccessToken(payload);

    return res.status(200).json({success: true, accessToken, });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
}


async logout(req: Request, res: Response) {
  res.clearCookie("refreshToken");
  return res.status(200).json({ success: true, message: "Logged out successfully",});
}

}





export default new AthController();