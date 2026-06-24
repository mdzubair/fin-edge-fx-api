import OfferRepository from "./offer.repository";
import { OfferData, OfferStatus } from "../../interface/index.interface";

export class OfferService {

  async createOffer(data: OfferData): Promise<OfferData> {
    if (!data.offerNote || data.offerNote.length < 5)
      throw new Error("Offer note too short");

    if (data.amount <= 0)
      throw new Error("Invalid amount");

    if (!data.offerDate)
      throw new Error("Offer date is required");

    return await OfferRepository.create(data);
  }

  async getOfferById(id: string): Promise<OfferData | null> {
    return await OfferRepository.findById(id);
  }

  async getUserOffers(userId: string): Promise<OfferData[]> {
    return await OfferRepository.findByUser(userId);
  }

  async getAllOffers(): Promise<OfferData[]> {
    return await OfferRepository.getAll();
  }

  async updateStatus(
    id: string,
    status: OfferStatus
  ): Promise<OfferData | null> {
    const offer = await OfferRepository.updateStatus(id, status);

    if (!offer) throw new Error("Offer not found");

    return offer;
  }

  async deleteOffer(id: string): Promise<OfferData | null> {
    return await OfferRepository.deleteById(id);
  }
}

export default new OfferService();