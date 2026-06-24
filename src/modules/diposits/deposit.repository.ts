import DepositModel from "./deposit.schema";
import { DepositData } from "../../interface/index.interface";
import UserModel from "../users/user.schema";

export class DepositRepository {

  async create(data: any): Promise<DepositData> {
    const { userId, amount, payType } = data.data;    
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    const previousAmount = user.wallet || 0;
    if (payType === "less_val") {
      if (previousAmount < amount) {
        throw new Error("Insufficient wallet balance");
      }
      user.wallet = previousAmount - amount;
    } else {
      user.wallet = previousAmount + amount;
    }

    data.preAmount = previousAmount;
    data.crAmount = user.wallet;
    data.processAmount = amount;
    data.userId = userId;
    data.payType = payType;

    await user.save();

    return await DepositModel.create(data);
}

  async findById(id: string): Promise<DepositData | null> {
    return await DepositModel.findById(id).populate("userId");
  }

  async findByUser(userId: string, status:string): Promise<DepositData[]> {
    // return await DepositModel.find({ userId, payType:status }).populate({ path: "userId", select: "firstName lastName", }).sort({ createdAt: -1 });
    if(userId=="0"){
      return await DepositModel.find({ payType:status }).populate({ path: "userId", select: "firstName lastName wallet", }).sort({ createdAt: -1 });
    }else{
      return await DepositModel.find({ userId, payType:status }).populate({ path: "userId", select: "firstName lastName wallet", }).sort({ createdAt: -1 });
    }
    
  }

  async getAll(): Promise<DepositData[]> {
    return await DepositModel.find()
      .populate("userId")
      .sort({ createdAt: -1 });
  }

  async deleteById(id: string): Promise<DepositData | null> {
    return await DepositModel.findByIdAndDelete(id);
  }
}

export default new DepositRepository();