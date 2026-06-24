import mongoose, { Schema } from "mongoose";
import { FormPayloadData } from "../../interface/index.interface";

const AppPasswordSchema = new Schema<FormPayloadData>(
    {  
        userId: { type: Schema.Types.ObjectId,ref: "User",required: [true, "User is required"], },
        username: { type: String, required: [true, "Username is required"], trim: true, minlength: [3, "Username must be at least 3 characters"], maxlength: [20, "Username cannot exceed 20 characters"],},
        password: { type: String, required: [true, "Password is required"], trim: true, minlength: [3, "Password must be at least 3 characters"], maxlength: [20, "Password cannot exceed 20 characters"],},
        server: {type: String, trim: true, minlength: [3, "Server must be at least 3 characters"], maxlength: [20, "Server cannot exceed 20 characters"], },
    },
    {  timestamps: true,  versionKey: false,  collection: "app_passwords",}
);

AppPasswordSchema.index({ createdAt: -1 });
AppPasswordSchema.index({ userId: 1 });

const AppPasswordModel =mongoose.models.AppPassword ||mongoose.model<FormPayloadData>("AppPassword", AppPasswordSchema);

export default AppPasswordModel;