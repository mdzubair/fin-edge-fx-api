import ReceiptRepository from "./receipt.repository";
import { ReceiptData, ReceiptStatus } from "../../interface/index.interface";

export class ReceiptService {

  async createReceipt(data: ReceiptData): Promise<ReceiptData> {
    if (data.amount <= 0) throw new Error("Invalid amount");

    if (!data.receipt) throw new Error("Receipt is required");

    return await ReceiptRepository.create(data);
  }

  async getReceiptById(id: string, status:number): Promise<ReceiptData[]> {
    return await ReceiptRepository.findById(id, status);
  }

  async getUserReceipts(userId: string, status:number ): Promise<ReceiptData[]> {
    return await ReceiptRepository.findByUser(userId, Number(status));
  }

  async getAllReceipts(): Promise<ReceiptData[]> {
    return await ReceiptRepository.getAll();
  }

  async updateStatus(id: string, status:number): Promise<ReceiptData> {
    const receipt = await ReceiptRepository.updateStatus(id, status);
    if (!receipt) throw new Error("Receipt not found");
    return receipt;
  }

  async deleteReceipt(id: string): Promise<ReceiptData | null> {
    return await ReceiptRepository.deleteById(id);
  }
}

export default new ReceiptService();