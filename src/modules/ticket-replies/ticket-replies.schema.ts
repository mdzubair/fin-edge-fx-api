import mongoose, { Schema } from "mongoose";
import { TicketReplyData } from "../../interface/index.interface";

const TicketReplySchema = new Schema<TicketReplyData>(
  {
    ticketId: { type: Schema.Types.ObjectId, ref: "Ticket", required: [true, "Ticket is required"], },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required"], },
    message: { type: String, required: [true, "Message is required"], trim: true, minlength: [1, "Message cannot be empty"], maxlength: [5000, "Message cannot exceed 5000 characters"], },
  },
  { timestamps: true, versionKey: false, collection: "ticket_replies", }
);

// Indexes
TicketReplySchema.index({ userId: 1 });
TicketReplySchema.index({ createdAt: -1 });
TicketReplySchema.index({ ticketId: 1, createdAt: -1 });
const TicketReplyModel = mongoose.models.TicketReply || mongoose.model<TicketReplyData>("TicketReply",   TicketReplySchema);
export default TicketReplyModel;