import { FormPayloadData } from "../../interface/index.interface";
import AppPasswordModel from "./meta-app-password.schema";
// 6a2e6eb1727b2d81cc325eda
export const create = async (reqData: FormPayloadData) => {
  return AppPasswordModel.findOneAndUpdate( { userId:reqData.userId }, { $set: reqData }, { returnDocument:"after",  upsert: true, runValidators: true,});
};