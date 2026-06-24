import WithdrawRepository from "./withdraw.repository";
import { WithdrawData, WithdrawStatus } from "../../interface/index.interface";
import UserModel from "../users/user.schema";

export class WithdrawService {

  async createWithdraw(data: WithdrawData): Promise<WithdrawData> {
    if (data.amount <= 0) {
      throw new Error("Invalid amount");
    }

    const user = await UserModel.findById(data.userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.wallet < data.amount) {
      throw new Error("Insufficient balance");
    }

    return await WithdrawRepository.create(data);
  }

  async getWithdrawById(id: string): Promise<WithdrawData | null> {
    return await WithdrawRepository.findById(id);
  }

  async getUserWithdrawals(userId: string, status:number): Promise<WithdrawData[]> {
    return await WithdrawRepository.findByUser(userId, status);
  }

  async getAllWithdrawals(): Promise<WithdrawData[]> {
    return await WithdrawRepository.getAll();
  }

  async updateStatus(id: string, status: WithdrawStatus ): Promise<WithdrawData | null> {
    const withdraw = await WithdrawRepository.updateStatus(id, status);
    if (!withdraw) throw new Error("Withdraw not found");
    return withdraw;
  }

  async deleteWithdraw(id: string): Promise<WithdrawData | null> {
    return await WithdrawRepository.deleteById(id);
  }
}

export default new WithdrawService();