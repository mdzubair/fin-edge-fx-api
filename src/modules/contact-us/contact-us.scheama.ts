import mongoose, { Schema } from "mongoose";
import { ContactUsData } from "../../interface/index.interface";

const ContactUsSchema = new Schema<ContactUsData>(
  {
    firstName: { type: String, required: [true, "First name is required"], trim: true, minlength: [2, "First name must be at least 2 characters"], maxlength: [50, "First name cannot exceed 50 characters"], index: true, },

    lastName: { type: String, required: [true, "Last name is required"], trim: true, minlength: [2, "Last name must be at least 2 characters"], maxlength: [50, "Last name cannot exceed 50 characters"], index: true, },

    accNumber: { type: String, required: [true, "Account number is required"], trim: true, minlength: [6, "Account number must be at least 6 digits"], maxlength: [20, "Account number cannot exceed 20 digits"], match: [/^[0-9]+$/, "Account number must contain only numbers"], index: true, },

    email: { type: String, required: [true, "Email is required"], trim: true, lowercase: true, index: true, match: [   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,   "Please enter a valid email address", ], },

    phone: { type: String, required: [true, "Phone number is required"], trim: true, index: true, match: [/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"], },

    reason: { type: String, required: [true, "Reason is required"], trim: true, enum: {   values: ["support", "complaint", "feedback", "business", "other"],   message: "Invalid reason type", }, index: true, },
    message: { type: String, required: [true, "Message is required"], trim: true, minlength: [10, "Message must be at least 10 characters"], maxlength: [1000, "Message cannot exceed 1000 characters"], },
    terms: { type: Boolean, required: [true, "Terms acceptance is required"], validate: { validator: (v: boolean) => v === true,   message: "You must accept terms and conditions", }, },
  },
  { timestamps: true, versionKey: false, collection: "contact_us",}
);

const ContactUsModel = mongoose.models.ContactUs || mongoose.model<ContactUsData>("ContactUs", ContactUsSchema);
export default ContactUsModel;