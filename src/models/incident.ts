import mongoose, { Schema } from "mongoose"
import { IIncident } from "../interfaces/incident"
import { DBRefs } from "../types/types"

const IncidentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    pictures: { type: [String] },
    residency: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "residency" as DBRefs,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user" as DBRefs,
    },
  },
  { timestamps: true },
)

export default mongoose.model<IIncident>("incident", IncidentSchema)
