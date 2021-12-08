import mongoose, { Schema } from "mongoose"
import { IAccess } from "../interfaces/acess"

const AccessSchema: Schema = new Schema(
  {
    visit: { type: mongoose.Types.ObjectId, ref: "visit", required: true },
    accessCode: { type: String, required: true },
    expiredDate: { type: Date, required: true },
    expired: { type: Boolean, required: true },
  },
  { timestamps: true },
)

export default mongoose.model<IAccess>("access", AccessSchema)
