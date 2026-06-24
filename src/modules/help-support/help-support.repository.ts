import HelpSupportModel from "./help-support.schema";
import { HelpSupportData, HelpSupportStatus } from "../../interface/index.interface";
import { Schema } from "mongoose";

export class HelpSupportRepository {

  async create(data: HelpSupportData): Promise<HelpSupportData> {
    return await HelpSupportModel.create(data);
  }

  async findById(id: string): Promise<HelpSupportData | null> {
    return await HelpSupportModel.findById(id)
      .populate("userId")
      .populate("replyId");
  }

  async findByUser(userId: string): Promise<HelpSupportData[]> {
    return await HelpSupportModel.find({ userId })
      .populate("replyId")
      .sort({ createdAt: -1 });
  }

  async getAll(): Promise<HelpSupportData[]> {
    return await HelpSupportModel.find()
      .populate("userId")
      .populate("replyId")
      .sort({ createdAt: -1 });
  }

  async updateStatus(
    id: string,
    status: HelpSupportStatus
  ): Promise<HelpSupportData | null> {
    return await HelpSupportModel.findByIdAndUpdate(
      id,
      { status },
      { returnDocument:"after", runValidators:true }
    );
  }

  async addReply(
    id: string,
    replyId: Schema.Types.ObjectId
  ): Promise<HelpSupportData | null> {
    return await HelpSupportModel.findByIdAndUpdate(
      id,
      { replyId },
      { returnDocument:"after", runValidators:true }
    );
  }

  async deleteById(id: string): Promise<HelpSupportData | null> {
    return await HelpSupportModel.findByIdAndDelete(id);
  }
}

export default new HelpSupportRepository();