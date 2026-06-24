import HelpSupportRepository from "./help-support.repository";
import { HelpSupportData, HelpSupportStatus } from "../../interface/index.interface";

export class HelpSupportService {

  async createRequest(data: HelpSupportData): Promise<HelpSupportData> {
    if (!data.title || data.title.length < 3)
      throw new Error("Title too short");

    if (!data.message || data.message.length < 10)
      throw new Error("Message too short");

    return await HelpSupportRepository.create(data);
  }

  async getById(id: string): Promise<HelpSupportData | null> {
    return await HelpSupportRepository.findById(id);
  }

  async getUserRequests(userId: string): Promise<HelpSupportData[]> {
    return await HelpSupportRepository.findByUser(userId);
  }

  async getAllRequests(): Promise<HelpSupportData[]> {
    return await HelpSupportRepository.getAll();
  }

  async updateStatus(
    id: string,
    status: HelpSupportStatus
  ): Promise<HelpSupportData | null> {
    const request = await HelpSupportRepository.updateStatus(id, status);

    if (!request) throw new Error("Request not found");

    return request;
  }

  async addReply(
    id: string,
    replyId: string
  ): Promise<HelpSupportData | null> {
    return await HelpSupportRepository.addReply(id, replyId as any);
  }

  async deleteRequest(id: string): Promise<HelpSupportData | null> {
    return await HelpSupportRepository.deleteById(id);
  }
}

export default new HelpSupportService();