import mongoose, { Schema } from "mongoose";
import { HelpSupportData, HelpSupportStatus } from "../../interface/index.interface";
const HelpSupportSchema = new Schema<HelpSupportData>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required"], },
    replyId: { type: Schema.Types.ObjectId, ref: "HelpSupport", default: null, },
    title: { type: String, required: [true, "Title is required"], trim: true, minlength: [3, "Title must be at least 3 characters"], maxlength: [200, "Title cannot exceed 200 characters"], },
    message: { type: String, required: [true, "Message is required"], trim: true, minlength: [5, "Message must be at least 5 characters"], maxlength: [5000, "Message cannot exceed 5000 characters"], },
    status: { type: Number, enum: Object.values(HelpSupportStatus).filter((value) => typeof value === "number" ), default: HelpSupportStatus.PENDING, },
  },
  { timestamps: true, versionKey: false, collection: "help_supports", }
);

// Indexes
HelpSupportSchema.index({ replyId: 1 });
HelpSupportSchema.index({ createdAt: -1 });
HelpSupportSchema.index({ userId: 1, status: 1 });

const HelpSupportModel = mongoose.models.HelpSupport || mongoose.model<HelpSupportData>("HelpSupport",   HelpSupportSchema );
export default HelpSupportModel;