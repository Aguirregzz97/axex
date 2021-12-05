import { Document, ObjectId } from "mongoose"

export interface IIncident extends Document {
  title: string
  content: string
  pictures?: string[]
  user: ObjectId
  residency: ObjectId
}
