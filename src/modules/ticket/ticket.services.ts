import { TicketData, TicketStatus } from "../../interface/index.interface";
import TicketRepository from "./ticket.repository";

export class TicketService {

  async createTicket(data: TicketData): Promise<TicketData> {
    if (!data.subject || data.subject.length < 5)
      throw new Error("Invalid subject");

    if (!data.message || data.message.length < 10)
      throw new Error("Invalid message");

    return await TicketRepository.create(data);
  }

  async getTicketById(id: string): Promise<TicketData | null> {
    return await TicketRepository.findById(id);
  }

  async getTicketByToken(token: string): Promise<TicketData | null> {
    return await TicketRepository.findByToken(token);
  }

  async getUserTickets(userId: string, status:number): Promise<TicketData[]> {
    return await TicketRepository.findByUser(userId, status);
  }

  async getAllTickets(): Promise<TicketData[]> {
    return await TicketRepository.getAll();
  }

  async updateStatus(
    id: string,
    status: TicketStatus
  ): Promise<TicketData | null> {
    const ticket = await TicketRepository.updateStatus(id, status);

    if (!ticket) throw new Error("Ticket not found");

    return ticket;
  }

  async deleteTicket(id: string): Promise<TicketData | null> {
    return await TicketRepository.deleteById(id);
  }
}

export default new TicketService();