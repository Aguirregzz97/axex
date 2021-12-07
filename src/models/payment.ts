import mongoose, { CallbackError, Schema } from "mongoose"
import logging from "../config/logging"
import { IPayment } from "../interfaces/payment"
import User from "./user"

const NAMESPACE = "Server"

const PaymentSchema: Schema = new Schema(
  {
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    month: { type: String, required: true },
    expireDate: { type: Date, required: true },
  },
  { timestamps: true },
)

PaymentSchema.post("save", (payment) => {
  User.updateOne({ _id: payment.user }, { $push: { payments: payment } }).exec(
    (error: CallbackError) => {
      if (error) {
        logging.error(NAMESPACE, error.message, error)
      }
    },
  )
})

export default mongoose.model<IPayment>("payment", PaymentSchema)
