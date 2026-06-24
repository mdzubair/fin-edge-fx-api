import AccountRepository from "./account.repository";
import { AccountData, AccountStatus } from "../../interface/index.interface";

export class AccountService {

  async createAccount(data: AccountData): Promise<AccountData> {
    if (data.upi && !data.upi.includes("@")) {
      throw new Error("Invalid UPI ID");
    }
    if (!data.bankName)
      throw new Error("Bank name is required");

    if (!data.accNo)
      throw new Error("Account number is required");

    if (!data.ifscCode)
      throw new Error("IFSC code is required");


    const exists = await AccountRepository.checkExitAccount(data);
    if(exists)
      throw new Error("Account number or UPI exists.");
    return await AccountRepository.create(data);
  }

  async getById(id: string): Promise<AccountData | null> {
    return await AccountRepository.findById(id);
  }

  // async getSinglePayAccByUserId(userId: string): Promise<AccountData | null> {
  //   return await AccountRepository.getSinglePayAccByUserId(userId);
  // }

   async getSinglePayAccByUserId(): Promise<AccountData | null> {
    return await AccountRepository.getRandomAvailableAccount();
  }

  async getUserAccounts(userId: string): Promise<AccountData[]> {
    return await AccountRepository.findByUser(userId);
  }

  async getAll(): Promise<AccountData[]> {
    return await AccountRepository.getAll();
  }

  async updateAccount(
    id: string,
    data: Partial<AccountData>
  ): Promise<AccountData | null> {
    const account = await AccountRepository.update(id, data);

    if (!account) throw new Error("Account not found");

    return account;
  }

  async updateStatus(
    id: string,
    status: AccountStatus
  ): Promise<AccountData | null> {
    return await AccountRepository.updateStatus(id, status);
  }

  async deleteAccount(id: string): Promise<AccountData | null> {
    return await AccountRepository.deleteById(id);
  }
}

export default new AccountService();