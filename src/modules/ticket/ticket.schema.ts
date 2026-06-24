import mongoose, { Schema } from "mongoose";
import { TicketData, TicketStatus } from "../../interface/index.interface";

const TicketSchema = new Schema<TicketData>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required"] },
    token: { type: String,  uppercase: true, trim: true },
    subject: { type: String, required: [true, "Subject is required"], trim: true, minlength: 5, maxlength: 200, },
    message: { type: String, required: [true, "Message is required"], trim: true, minlength: 10, maxlength: 5000, },
    status: { type: String, enum: Object.values(TicketStatus), default: TicketStatus.OPEN, },
  },
  { timestamps: true, versionKey: false, collection: "tickets",}
);

TicketSchema.pre("save", function () {
  if (!this.token) {
    this.token = `TKT-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  }
});

// Indexes
TicketSchema.index({ token: 1 }, { unique: true });
TicketSchema.index({ createdAt: -1 });
TicketSchema.index({ userId: 1, status: 1 });
const TicketModel = mongoose.models.Ticket || mongoose.model<TicketData>("Ticket", TicketSchema);
export default TicketModel;