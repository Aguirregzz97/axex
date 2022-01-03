import { Document } from "mongoose"
import { IPaymentRequest } from "./paymentRequest"
import { IVisit } from "./visit"

type UserRole = "resident" | "admin"

export default interface IUser extends Document {
  userRole: UserRole
  firstName: string
  lastName: string
  residency: string
  email: string
  phone: string
  password: string
  blocked: boolean
  paymentRequests: IPaymentRequest[]
  visits: IVisit[]
}
