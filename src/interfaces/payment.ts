import { Document } from "mongoose"
import IUser from "./user"

type PaymentStatus = "payed" | "pending" | "expired"

export interface IPayment extends Document {
  amount: number
  status: PaymentStatus
  user: IUser
}
