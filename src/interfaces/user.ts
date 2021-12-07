import { Document } from "mongoose"
import { IPayment } from "./payment"

export default interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  blocked: boolean
  payments: IPayment[]
}
