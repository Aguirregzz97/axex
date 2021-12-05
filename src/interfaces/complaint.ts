import { Document, ObjectId } from "mongoose"

export interface IComplaint extends Document {
  title: string
  content: string
  pictures?: string[]
  user: ObjectId
  residency: ObjectId
}
