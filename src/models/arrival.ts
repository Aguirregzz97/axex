import mongoose, { Schema } from "mongoose"
import { IArrival } from "../interfaces/arrival"

const ArrivalSchema: Schema = new Schema(
  {
    visit: { type: mongoose.Types.ObjectId, ref: "visit", required: true },
    arrivalDate: { type: Date, required: true },
  },
  { timestamps: true },
)

export default mongoose.model<IArrival>("arrival", ArrivalSchema)
