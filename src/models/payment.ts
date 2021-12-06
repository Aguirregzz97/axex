import mongoose, { Schema } from "mongoose"
import { IPayment } from "../interfaces/payment"

const PaymentSchema: Schema = new Schema(
  {
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true },
)

export default mongoose.model<IPayment>("payment", PaymentSchema)
