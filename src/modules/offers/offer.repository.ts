import OfferModel from "./offer.schema";
import { OfferData, OfferStatus } from "../../interface/index.interface";

export class OfferRepository {

  async create(data: OfferData): Promise<OfferData> {
    return await OfferModel.create(data);
  }

  async findById(id: string): Promise<OfferData | null> {
    return await OfferModel.findById(id).populate("userId");
  }

  async findByUser(userId: string): Promise<OfferData[]> {
    return await OfferModel.find({ userId }).sort({ createdAt: -1 });
  }

  async getAll(): Promise<OfferData[]> {
    return await OfferModel.find()
      .populate("userId")
      .sort({ createdAt: -1 });
  }

  async updateStatus(
    id: string,
    status: OfferStatus
  ): Promise<OfferData | null> {
    return await OfferModel.findByIdAndUpdate(
      id,
      { status },
      { returnDocument:"after", runValidators:true}
    );
  }

  async deleteById(id: string): Promise<OfferData | null> {
    return await OfferModel.findByIdAndDelete(id);
  }
}

export default new OfferRepository();