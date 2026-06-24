import WithdrawModel from "./withdrwa.schema";
import { WithdrawData, WithdrawStatus } from "../../interface/index.interface";

export class WithdrawRepository {
  
  async create(data: WithdrawData): Promise<WithdrawData> {
     const exists = await WithdrawModel.exists({userId: data.userId,status: 0});

    if (exists) {
      throw new Error(
        "Your withdraw request already exists. Please wait for completion."
      );
    }

    return await WithdrawModel.create(data);
  }

  async findById(id: string): Promise<WithdrawData | null> {
    return await WithdrawModel.findById(id).populate({
      path: "userId",
      select: "firstName lastName email",
    });
  }

  async findByUser(
    userId: string,
    status?: WithdrawStatus
  ): Promise<WithdrawData[]> {
    if(userId=="0"){
      return await WithdrawModel.find({status}).populate({ path: "userId", select: "firstName lastName wallet", }).sort({ createdAt: -1 });
    }else{      
      return await WithdrawModel.find({ userId, status}).populate({ path: "userId", select: "firstName lastName wallet", }).sort({ createdAt: -1 });
    
    }

    
  }

  async getAll(): Promise<WithdrawData[]> {
    return await WithdrawModel.find()
      .populate({
        path: "userId",
        select: "firstName lastName email",
      })
      .sort({ createdAt: -1 });
  }

  async updateStatus(
    id: string,
    status: WithdrawStatus
  ): Promise<WithdrawData | null> {
    return await WithdrawModel.findByIdAndUpdate(
      id,
      { status },
      { returnDocument:"after", runValidators:true }
    );
  }

  async deleteById(id: string): Promise<WithdrawData | null> {
    return await WithdrawModel.findByIdAndDelete(id);
  }
}

export default new WithdrawRepository();