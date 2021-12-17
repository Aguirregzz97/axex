import mongoose, { Schema } from "mongoose"
import logging from "../config/logging"
import { IPayment } from "../interfaces/payment"
import PaymentRequest from "./paymentRequest"

const NAMESPACE = "Server"

const PaymentSchema: Schema = new Schema(
  {
    approved: { type: Boolean, required: true },
    paymentRequest: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "paymentRequest",
    },
  },
  { timestamps: true },
)

PaymentSchema.post("save", (payment: IPayment) => {
  PaymentRequest.updateOne(
    { _id: payment.paymentRequest },
    { $set: { payed: true, expired: false } },
  ).exec((error) => {
    if (error) {
      logging.error(NAMESPACE, error.message, error)
    }
  })
})

export default mongoose.model<IPayment>("payment", PaymentSchema)
