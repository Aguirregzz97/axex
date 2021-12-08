import { Document } from "mongoose"
import { IVisit } from "./visit"

export interface IAccess extends Document {
  visit: IVisit
  accessCode: string
  expireDate: Date
  expired: boolean
}
