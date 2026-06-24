import CurrencyRepository from "./currency.repository";
export class CurrencyService {
  async createCurrency(usdPrice: number) {
    return await CurrencyRepository.create(usdPrice);
  }
  async getUsdVal() {
    return await CurrencyRepository.getUsdVal();
  }
}

export default new CurrencyService();