
import { CurrencyData } from "../../interface/index.interface";
import CurrencyModel from "./currency.scheama";

export class CurrencyRepository {

  async create(usdPrice: number): Promise<CurrencyData> {
       return await CurrencyModel.findOneAndUpdate(
    {},
    { $set: { country: "Ind", currencyVal: Number(usdPrice),  currencyIcon: "$" }, $setOnInsert: { createdAt: new Date(), }, },
    {
      upsert: true,
      runValidators: true,
      returnDocument:"after"
    }
  );
  }

async getUsdVal(){
    return await CurrencyModel.findOne({ country: "Ind" });
}

}

export default new CurrencyRepository();