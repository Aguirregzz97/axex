import mongoose, { Schema } from "mongoose"
import logging from "../config/logging"
import { IUnit } from "../interfaces/unit"
import User from "./user"

const NAMESPACE = "Server"

const UnitSchema: Schema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, required: true },
    unitType: { type: String, required: true },
    monthlyPayments: { type: Boolean, required: true },
    dayOfPayment: { type: Number },
    monthlyAmount: { type: String },
    floor: { type: String },
    roomNumber: { type: String },
    address: { type: String },
  },
  { timestamps: true },
)

UnitSchema.post("save", (unit: IUnit) => {
  User.updateOne({ _id: unit.user }, { $set: { unit } }).exec((error) => {
    if (error) {
      logging.error(NAMESPACE, error.message, error)
    }
  })
})

UnitSchema.index({
  floor: "text",
  roomNumber: "text",
  monthlyAmount: "text",
  address: "text",
})

export default mongoose.model<IUnit>("unit", UnitSchema)
