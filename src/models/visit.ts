import mongoose, { Schema } from "mongoose"
import { IVisit } from "../interfaces/visit"

const VisitSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    visitType: { type: String, required: true },
    iDImage: { type: String, required: true },
    licensePlate: { type: String, required: true },
    accessInfo: {
      type: mongoose.Types.ObjectId,
      ref: "access",
      required: true,
    },
    arrivals: [
      {
        type: mongoose.Types.ObjectId,
        ref: "arrival",
      },
    ],
  },
  { timestamps: true },
)

export default mongoose.model<IVisit>("visit", VisitSchema)
