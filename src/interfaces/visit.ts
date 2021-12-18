import { Document } from "mongoose"
import { IArrival } from "./arrival"

type VisitType = "permanent" | "singleTime"

export interface IVisit extends Document {
  firstName: string
  lastName: string
  user: string
  visitType: VisitType
  idImageURL: string
  qrCodeURL: string
  LicensePlate: string
  accessCode: string
  expireDate: Date
  hasEntered: boolean
  arrivals: IArrival[]
}
