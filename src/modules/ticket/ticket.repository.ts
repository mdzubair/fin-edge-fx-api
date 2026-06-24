import { TicketData, TicketStatus } from "../../interface/index.interface";
import TicketModel from "./ticket.schema";

export class TicketRepository {

  async create(data: TicketData): Promise<TicketData> {
    return await TicketModel.create(data);
  }

  async findById(id: string): Promise<TicketData | null> {
    return await TicketModel.findById(id).populate({path:"userId", select:"firstName lastName userType "});
  }

  async findByToken(token: string): Promise<TicketData | null> {
    return await TicketModel.findOne({ token });
  }

  async findByUser(userId: string, status:number): Promise<TicketData[]> {
    const filter = userId === "0" ? { status } : { userId, status };
    return await TicketModel.find(filter).populate({path:"userId", select:"firstName lastName"}).sort({ createdAt: -1 });
  }

  async getAll(): Promise<TicketData[]> {
    return await TicketModel.find().sort({ createdAt: -1 });
  }

  async updateStatus(
    id: string,
    status: TicketStatus
  ): Promise<TicketData | null> {
    return await TicketModel.findByIdAndUpdate(
      id,
      { status },
      { returnDocument:"after", runValidators:true }
    );
  }

  async deleteById(id: string): Promise<TicketData | null> {
    return await TicketModel.findByIdAndDelete(id);
  }
}

export default new TicketRepository();