
import { AccountData, AccountStatus } from "../../interface/index.interface";
import ReceiptModel from "../receipt/receipt.schema";
import AccountModel from "./account.scheama";

export class AccountRepository {

  async create(data: AccountData): Promise<AccountData> {
    return await AccountModel.create(data);
  }

  async findById(id: string): Promise<AccountData | null> {
    return await AccountModel.findById(id).populate("userId");
  }

  // async getSinglePayAccByUserId(userId: string): Promise<AccountData | null> {
  //   return await AccountModel.findById(userId).populate("userId");
  // }

  async getRandomAvailableAccount(): Promise<AccountData | null> {
  const accounts = await AccountModel.aggregate([
    { $sample: { size: 20 } } // get random accounts
  ]);

  for (const account of accounts) {
    const receiptTotal = await ReceiptModel.aggregate([
      {
        $match: {
          accId: account._id,
          status: 1, // completed receipts only
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalAmount = receiptTotal[0]?.totalAmount || 0;

    if (totalAmount < 10000) {
      // return await AccountModel.findById(account._id)
      //   .populate("userId");
      return await AccountModel.findById(account._id);
    }
  }

  return null;
}

  async findByUser(userId: string): Promise<AccountData[]> {
    return await AccountModel.find({ userId }).sort({ createdAt: -1 });
  }

  async getAll(): Promise<AccountData[]> {
    return await AccountModel.find()
      .populate("userId")
      .sort({ createdAt: -1 });
  }

  async update(
    id: string,
    data: Partial<AccountData>
  ): Promise<AccountData | null> {
    return await AccountModel.findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: true, });
  }

  async updateStatus(
    id: string,
    status: AccountStatus
  ): Promise<AccountData | null> {
    return await AccountModel.findByIdAndUpdate( id,  { $set: { status } }, {  returnDocument: 'after', runValidators: true,} );
    
  }

  async deleteById(id: string): Promise<AccountData | null> {
    return await AccountModel.findByIdAndDelete(id);
  }

  async checkExitAccount(data: AccountData): Promise<AccountData|null> {
    return await AccountModel.findOne({ $or: [
      { accNo: data.accNo }
    ]});

  }
}

export default new AccountRepository();