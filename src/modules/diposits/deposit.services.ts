import DepositRepository from "./deposit.repository";
import { DepositData } from "../../interface/index.interface";

export class DepositService {

  async createDeposit(data: any): Promise<DepositData> {
    return await DepositRepository.create({data});
  }

  async getDepositById(id: string): Promise<DepositData | null> {
    return await DepositRepository.findById(id);
  }

  async getUserDeposits(userId: string, status:string): Promise<DepositData[]> {
    return await DepositRepository.findByUser(userId, status);
  }

  async getAllDeposits(): Promise<DepositData[]> {
    return await DepositRepository.getAll();
  }

  async deleteDeposit(id: string): Promise<DepositData | null> {
    return await DepositRepository.deleteById(id);
  }
}

export default new DepositService();