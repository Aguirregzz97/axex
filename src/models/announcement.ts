import mongoose, { Schema } from "mongoose"
import { IAnnouncement } from "../interfaces/announcement"
import { DBRefs } from "../types/types"

const AnnouncementSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    pictures: { type: [String] },
    residency: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "residency" as DBRefs,
    },
  },
  { timestamps: true },
)

export default mongoose.model<IAnnouncement>("announcement", AnnouncementSchema)
