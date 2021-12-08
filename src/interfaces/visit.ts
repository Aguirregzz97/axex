import { Document } from "mongoose"

type VisitType = "permanent" | "singleTime"

export interface IVisit extends Document {
  firstName: string
  lastName: string
  visitType: VisitType
  iDImage: string
  LicensePlate: string
}
