import { Document } from "mongoose"
import { IArrival } from "./arrival"
import { IPaymentRequest } from "./paymentRequest"
import { IVisit } from "./visit"

export default interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  blocked: boolean
  paymentRequests: IPaymentRequest[]
  visits: IVisit[]
  arrivals: IArrival[]
}
