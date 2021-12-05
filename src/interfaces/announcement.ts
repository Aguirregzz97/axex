import { Document, ObjectId } from "mongoose"

export interface IAnnouncement extends Document {
  title: string
  content: string
  pictures?: string[]
  residency: ObjectId
}
