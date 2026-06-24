import ReceiptModel from "./receipt.schema";
import { ReceiptData, ReceiptStatus } from "../../interface/index.interface";

export class ReceiptRepository {

  async create(data: ReceiptData): Promise<ReceiptData> {
    return await ReceiptModel.create(data);
  }

  async findById(id: string, status:number): Promise<ReceiptData[]> {
    return await ReceiptModel.find({_id:id, status}).populate("userId").populate("accId");
  }

  async findByUser(userId: string, status:number): Promise<ReceiptData[]> {
    if(userId=="0"){
      return await ReceiptModel.find({status}).populate("accId").populate({ path: "userId", select: "firstName lastName wallet", }).sort({ createdAt: -1 });
    }else{
      return await ReceiptModel.find({ userId, status}).populate("accId").populate({ path: "userId", select: "firstName lastName wallet", }).sort({ createdAt: -1 });
    }
   
  }

  async getAll(): Promise<ReceiptData[]> {
    return await ReceiptModel.find()
      .populate("userId")
      .populate("accId")
      .sort({ createdAt: -1 });
  }

  async updateStatus(id: string,status:number): Promise<ReceiptData|null> {
    return await ReceiptModel.findByIdAndUpdate(id,{ status },{ returnDocument:"after", runValidators:true });
  }

  async deleteById(id: string): Promise<ReceiptData | null> {
    return await ReceiptModel.findByIdAndDelete(id);
  }
}

export default new ReceiptRepository();