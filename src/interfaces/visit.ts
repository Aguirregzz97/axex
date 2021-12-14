import { Document } from "mongoose"

type VisitType = "permanent" | "singleTime"

export interface IVisit extends Document {
  firstName: string
  lastName: string
  user: string
  visitType: VisitType
  idImageURL: string
  LicensePlate: string
  accessCode: string
  expireDate: Date
  expired: boolean
}
