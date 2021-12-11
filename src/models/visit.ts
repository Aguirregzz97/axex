import mongoose, { Schema } from "mongoose"
import { IVisit } from "../interfaces/visit"

const VisitSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    visitType: { type: String, required: true },
    idImageURL: { type: String },
    licensePlate: { type: String },
    accessCode: { type: String, required: true },
    expireDate: { type: Date, required: true },
    expired: { type: Boolean, required: true },
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
