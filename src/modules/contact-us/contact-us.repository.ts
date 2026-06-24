import { ContactUsData } from "../../interface/index.interface";
import ContactUsModel from "./contact-us.scheama";

export class ContactUsRepository {

  async create(data: ContactUsData): Promise<ContactUsData> {
    return await ContactUsModel.create(data);
  }

  async findById(id: string): Promise<ContactUsData | null> {
    return await ContactUsModel.findById(id);
  }

  async getAll(): Promise<ContactUsData[]> {
    return await ContactUsModel.find().sort({ createdAt: -1 });
  }

  async findByEmail(email: string): Promise<ContactUsData[]> {
    return await ContactUsModel.find({ email }).sort({ createdAt: -1 });
  }

  async deleteById(id: string): Promise<ContactUsData | null> {
    return await ContactUsModel.findByIdAndDelete(id);
  }
}

export default new ContactUsRepository();