// import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserData } from "../../interface/index.interface";
import UserModel from "./user.schema";
import AppPasswordModel from "../meta-app-password/meta-app-password.schema";

export const create = async (data: Partial<UserData>): Promise<UserData>  => {
    return await UserModel.create(data);
}

export const findByEmail = async (email: string)=> {
    return await UserModel.findOne({ email }).select("+password");
}

export const findByUsername = async(username: string): Promise<UserData | null> => {
    return await UserModel.findOne({ username });
}

export const findById = async (id: string) =>{
    const user = await UserModel.findById(id);
    const appPass = await AppPasswordModel.findOne({ userId: id });

    return {
    ...user?.toObject(),
    app_username: appPass?.username,
    app_password: appPass?.password,
    app_server: appPass?.server,
    };
    // return user;
    // return await UserModel.findById(id).populate("userId");
    // return await UserModel.aggregate([
    //     {
    //         $match: {
    //         _id: new mongoose.Types.ObjectId(id),
    //         },
    //     },
    //     {
    //         $lookup: {
    //         from: "app_passwords",
    //         localField: "_id",
    //         foreignField: "userId",
    //         as: "appPassword",
    //         },
    //     },
    // ]);

}
export const findByUpdate = async (
  id: string,
  status: number
): Promise<UserData | null> => {
  return await UserModel.findByIdAndUpdate(
    id,
    { status },
    {
    returnDocument:"after", runValidators:true
    }
  );
};

export const updateById = async (id: string, data: Partial<UserData>): Promise<UserData | null> => {
    return await UserModel.findByIdAndUpdate(id, data, { runValidators:true, returnDocument:"after"});
}


export const deleteById = async (id: string): Promise<UserData | null> => {
    return await UserModel.findByIdAndDelete(id);
}

export const getAll = async ():Promise<UserData[]> =>{
    return await UserModel.find({userType:0}).sort({ createdAt: -1 });
}

export const changePassword = async ( userId: string, reqData: { currentPassword: string; newPassword: string; }) => {
  const { currentPassword, newPassword } = reqData;
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  user.password = newPassword; // plain password
  return await user.save(); // pre-save hook hashes it
};

export const resetPassword = async ( userId: string, password: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  user.password = password; // plain password
  return await user.save(); // auto hash 
};


