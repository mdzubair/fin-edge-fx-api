import ContactUsRepository from "./contact-us.repository";
import { ContactUsData } from "../../interface/index.interface";

export class ContactUsService {

  async submitForm(data: ContactUsData): Promise<ContactUsData> {
    if (!data.firstName || data.firstName.length < 2)
      throw new Error("First name is too short");

    if (!data.lastName || data.lastName.length < 2)
      throw new Error("Last name is too short");

    if (!data.email.includes("@"))
      throw new Error("Invalid email");

    if (!data.message || data.message.length < 10)
      throw new Error("Message too short");

    if (!data.terms)
      throw new Error("You must accept terms");

    return await ContactUsRepository.create(data);
  }

  async getById(id: string): Promise<ContactUsData | null> {
    return await ContactUsRepository.findById(id);
  }

  async getAll(): Promise<ContactUsData[]> {
    return await ContactUsRepository.getAll();
  }

  async getByEmail(email: string): Promise<ContactUsData[]> {
    return await ContactUsRepository.findByEmail(email);
  }

  async delete(id: string): Promise<ContactUsData | null> {
    return await ContactUsRepository.deleteById(id);
  }
}

export default new ContactUsService();