import mongoose, { Schema } from "mongoose";
import { WithdrawData, WithdrawPayType, WithdrawStatus } from "../../interface/index.interface";

const WithdrawSchema = new Schema<WithdrawData>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required"], },
    amount: { type: Number, required: [true, "Amount is required"], min: [1, "Amount must be greater than 0"], },
    payType: { type: String, required: [true, "Payment type is required"], trim: true, enum: Object.values(WithdrawPayType),  default: WithdrawPayType.BANK},
    status: { type: Number, enum: Object.values(WithdrawStatus).filter((value) => typeof value === "number"), default: WithdrawStatus.PENDING, },
  },
  { timestamps: true, versionKey: false, collection: "withdraws",}
);

// Indexes
WithdrawSchema.index({ createdAt: -1 });
WithdrawSchema.index({ userId: 1, status: 1 });

const WithdrawModel = mongoose.models.Withdraw ||  mongoose.model<WithdrawData>("Withdraw", WithdrawSchema);

export default WithdrawModel;