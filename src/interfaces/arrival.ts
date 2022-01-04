import { Document } from "mongoose"
import { IVisit } from "./visit"

export interface IArrival extends Document {
  visit: IVisit
}
