import { Document } from "mongoose"
import IUser from "./user"

type PaymentStatus = "approved" | "wfa" | "pending" | "expired"

type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "Novemeber"
  | "December"
export interface IPayment extends Document {
  amount: number
  status: PaymentStatus
  expireDate: Date
  month: Month
  user: IUser
}
