import mongoose, { Schema } from "mongoose";
import { AccountData, AccountStatus } from "../../interface/index.interface";

const AccountSchema = new Schema<AccountData>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User ID is required"], index: true, },
    upi: { type: String,  trim: true, lowercase: true, index: true, match: [/^[\w.-]+@[\w.-]+$/, "Invalid UPI format (example: name@bank)", ], },
    bankName: { type: String, required: [true, "Bank name is required"], trim: true, minlength: [2, "Bank name too short"], maxlength: [100, "Bank name too long"], index: true, },
    holderName: { type: String, required: [true, "Account holder name is required"], trim: true, minlength: [2, "Holder name too short"], maxlength: [100, "Holder name too long"], },
    accNo: { type: String, required: [true, "Account number is required"], trim: true, unique: true, index: true,  match: [/^[0-9]{9,18}$/, "Invalid account number format"], },
    ifscCode: { type: String, required: [true, "IFSC code is required"], uppercase: true, trim: true, index: true, match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format", ],},
    qr: { type: String, trim: true, default: null,},
    note: { type: String, trim: true, maxlength: [500, "Note cannot exceed 500 characters"], default: "", },
    status: { type: String, enum: Object.values(AccountStatus), default: AccountStatus.PENDING, index: true, },
  },
  { timestamps: true, versionKey: false, collection: "accounts", }
);

const AccountModel = mongoose.models.Account || mongoose.model<AccountData>("Account", AccountSchema);
export default AccountModel;