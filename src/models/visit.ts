import mongoose, { CallbackError, Schema } from "mongoose"
import logging from "../config/logging"
import { IVisit } from "../interfaces/visit"
import User from "./user"

const NAMESPACE = "Server"

const VisitSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
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

VisitSchema.post("save", (visit: IVisit) => {
  User.updateOne({ _id: visit.user }, { $push: { visits: visit } }).exec(
    (error: CallbackError) => {
      if (error) {
        logging.error(NAMESPACE, error.message, error)
      }
    },
  )
})

export default mongoose.model<IVisit>("visit", VisitSchema)
