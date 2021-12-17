import { Document } from "mongoose"
import IUser from "./user"

export interface IPaymentRequest extends Document {
  user: IUser
  amount: number
  expireDate: Date
  expired: boolean
  payed: boolean
}
