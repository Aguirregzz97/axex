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
    hasEntered: { type: Boolean, required: true },
    qrCodeURL: { type: String, required: true },
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

VisitSchema.post("insertMany", (visits: IVisit[]) => {
  for (let i = 0; i < visits.length; i += 1) {
    User.updateOne(
      { _id: visits[i].user },
      { $push: { visits: visits[i] } },
    ).exec((error: CallbackError) => {
      if (error) {
        logging.error(NAMESPACE, error.message, error)
      }
    })
  }
})

VisitSchema.index({
  firstName: "text",
  lastName: "text",
  visitType: "text",
})

export default mongoose.model<IVisit>("visit", VisitSchema)
