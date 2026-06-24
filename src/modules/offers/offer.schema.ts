import mongoose, { Schema } from "mongoose";
import { OfferApplyTo, OfferData, OfferStatus } from "../../interface/index.interface";
const OfferSchema = new Schema<OfferData>(
  {
    applyTo: {
      type: String,
      enum: Object.values(OfferApplyTo),
      default: OfferApplyTo.ALL,
      required: true,
    },

    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    offerNote: {
      type: String,
      required: [true, "Offer description is required"],
      trim: true,
      minlength: [5, "Offer note must be at least 5 characters"],
      maxlength: [5000, "Offer note cannot exceed 5000 characters"],
    },

    offerDate: {
      type: Date,
      required: [true, "Offer date is required"],
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },

    status: {
      type: Number,
      enum: Object.values(OfferStatus).filter(
        (value) => typeof value === "number"
      ),
      default: OfferStatus.PENDING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "offers",
  }
);

export default mongoose.models.Offer ||
  mongoose.model<OfferData>("Offer", OfferSchema);