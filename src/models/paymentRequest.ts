import mongoose, { CallbackError, Schema } from "mongoose"
import logging from "../config/logging"
import { IPaymentRequest } from "../interfaces/paymentRequest"
import User from "./user"

const NAMESPACE = "Server"

const PaymentRequestSchema: Schema = new Schema(
  {
    amount: { type: Number, required: true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    expireDate: { type: Date, required: true },
    expired: { type: Boolean, required: true },
    payed: { type: Boolean, required: true },
  },
  { timestamps: true },
)

PaymentRequestSchema.post("save", (paymentRequest) => {
  User.updateOne(
    { _id: paymentRequest.user },
    { $push: { paymentRequests: paymentRequest } },
  ).exec((error: CallbackError) => {
    if (error) {
      logging.error(NAMESPACE, error.message, error)
    }
  })
})

export default mongoose.model<IPaymentRequest>(
  "paymentRequest",
  PaymentRequestSchema,
)
