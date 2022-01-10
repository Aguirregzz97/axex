import { Document } from "mongoose"
import IUser from "./user"

type PaymentRequestType = "monthly" | "manual"
export interface IPaymentRequest extends Document {
  user: IUser
  amount: string
  expireDate: Date
  expired: boolean
  payed: boolean
  type: PaymentRequestType
  description: string
}
