import mongoose, { Schema } from "mongoose"
import { IResidency } from "../interfaces/residency"
import { DBRefs } from "../types/types"

const ResidencySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    announcements: {
      type: mongoose.Types.ObjectId,
      ref: "announcement" as DBRefs,
    },
    incidents: { type: mongoose.Types.ObjectId, ref: "incident" as DBRefs },
    complaints: { type: mongoose.Types.ObjectId, ref: "complaints" as DBRefs },
  },
  { timestamps: true },
)

export default mongoose.model<IResidency>("residency", ResidencySchema)
