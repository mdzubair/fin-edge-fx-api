import mongoose, { Schema } from "mongoose";
import { PayByStatus, ReceiptData, ReceiptStatus, } from "../../interface/index.interface";
const ReceiptSchema = new Schema<ReceiptData>( 
{   
    userId: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required"],},
    accId: { type: Schema.Types.ObjectId, ref: "Account", required: [true, "Bank account is required"], },
    amount: { type: Number, required: [true, "Amount is required"], min: [1, "Amount must be greater than 0"], },
    receipt: { type: String, required: [true, "Receipt image is required"], trim: true, },
    payBy: { type: String, required: [true, "Payment method is required"], trim: true, enum: Object.values(PayByStatus), default: PayByStatus.BANK, },
    status: { type: Number, enum: Object.values(ReceiptStatus).filter((value) => typeof value === "number" ), default: ReceiptStatus.PENDING, }, 
}, 
{ timestamps: true, versionKey: false, collection: "receipts", }
);

// Indexes
ReceiptSchema.index({ userId: 1 });
ReceiptSchema.index({ accId: 1 });
ReceiptSchema.index({ status: 1 });
ReceiptSchema.index({ createdAt: -1 });
ReceiptSchema.index({ userId: 1, status: 1 });

const ReceiptModel = mongoose.models.Receipt || mongoose.model<ReceiptData>("Receipt", ReceiptSchema);

export default ReceiptModel;