
import { TicketReplyData } from "../../interface/index.interface";
import TicketReplyModel from "./ticket-replies.schema";

export class TicketReplyRepository {

  async create(data: TicketReplyData): Promise<TicketReplyData> {
    return await TicketReplyModel.create(data);
  }

  async findById(id: string): Promise<TicketReplyData | null> {
    return await TicketReplyModel.findById(id)
      .populate("userId")
      .populate("ticketId");
  }

  async findByTicket(ticketId: string): Promise<TicketReplyData[]> {
    return await TicketReplyModel.find({ ticketId })
      .populate({path:"userId", select:"firstName lastName userType "})
      .sort({ createdAt: 1 });
  }

  async findByUser(userId: string): Promise<TicketReplyData[]> {
    return await TicketReplyModel.find({ userId })
      .populate("ticketId")
      .sort({ createdAt: -1 });
  }

  async getAll(): Promise<TicketReplyData[]> {
    return await TicketReplyModel.find()
      .populate("userId")
      .populate("ticketId")
      .sort({ createdAt: -1 });
  }

  async deleteById(id: string): Promise<TicketReplyData | null> {
    return await TicketReplyModel.findByIdAndDelete(id);
  }
}

export default new TicketReplyRepository();