import TicketReplyRepository from "./ticket-replies.repository";
import { TicketReplyData } from "../../interface/index.interface";

export class TicketReplyService {

  async createReply(data: TicketReplyData): Promise<TicketReplyData> {
    if (!data.message || data.message.length < 2) {
      throw new Error("Message is too short");
    }

    return await TicketReplyRepository.create(data);
  }

  async getReplyById(id: string): Promise<TicketReplyData | null> {
    return await TicketReplyRepository.findById(id);
  }

  async getRepliesByTicket(ticketId: string): Promise<TicketReplyData[]> {
    return await TicketReplyRepository.findByTicket(ticketId);
  }

  async getRepliesByUser(userId: string): Promise<TicketReplyData[]> {
    return await TicketReplyRepository.findByUser(userId);
  }

  async getAllReplies(): Promise<TicketReplyData[]> {
    return await TicketReplyRepository.getAll();
  }

  async deleteReply(id: string): Promise<TicketReplyData | null> {
    return await TicketReplyRepository.deleteById(id);
  }
}

export default new TicketReplyService();