import mongoose, { Schema } from "mongoose";
import { CurrencyData } from "../../interface/index.interface";

const CurrencySchema = new Schema<CurrencyData>(
  {
    country: { type: String, required: [true, "Country is required"], trim: true, minlength: [2, "Country name must be at least 2 characters"], maxlength: [100, "Country name cannot exceed 100 characters"], index: true, },
    currencyVal: { type: Number, required: [true, "Currency code is required"]},
    currencyIcon: { type: String, required: [true, "Currency icon is required"], trim: true, maxlength: [10, "Currency icon cannot exceed 10 characters"],    },
  },
  {
    timestamps: true, versionKey: false, collection: "currencies", }
);

// Model (safe for hot-reload in Node/Next)
const CurrencyModel = mongoose.models.Currency || mongoose.model<CurrencyData>("Currency", CurrencySchema);
export default CurrencyModel;