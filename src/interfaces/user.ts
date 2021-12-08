import { Document } from "mongoose"
import { IArrival } from "./arrival"
import { IPayment } from "./payment"
import { IVisit } from "./visit"

export default interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  blocked: boolean
  payments: IPayment[]
  visits: IVisit[]
  arrivals: IArrival[]
}
