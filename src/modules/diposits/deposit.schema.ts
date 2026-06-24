import mongoose, { Schema } from "mongoose";
import { DepositData, DepositPayType,} from "../../interface/index.interface";

const DepositSchema = new Schema<DepositData>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required"],},
    crAmount: { type: Number, required: [true, "Credit amount is required"], min: [1, "Amount must be greater than 0"], },
    preAmount: { type: Number, required: [true, "Previous balance is required"], min: [0, "Balance cannot be negative"],},
    processAmount: { type: Number, default:0},
   
    payType: { type: String, required: [true, "Payment method is required"], enum: Object.values(DepositPayType), default: DepositPayType.ADD_VAL, },
  },
  { timestamps: true, versionKey: false, collection: "deposits",}
);


// Indexes
DepositSchema.index({ createdAt: -1 });
DepositSchema.index({ userId: 1, payType: 1 });

const DepositModel = mongoose.models.Deposit || mongoose.model<DepositData>("Deposit", DepositSchema);
export default DepositModel;