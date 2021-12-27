import mongoose, { Schema } from "mongoose"
import logging from "../config/logging"
import { IArrival } from "../interfaces/arrival"
import Visit from "./visit"

const NAMESPACE = "Server"

const ArrivalSchema: Schema = new Schema(
  {
    visit: { type: mongoose.Types.ObjectId, ref: "visit", required: true },
  },
  { timestamps: true },
)

ArrivalSchema.post("save", (arrival: IArrival) => {
  Visit.updateOne(
    { _id: arrival.visit },
    { $push: { arrivals: arrival } },
  ).exec((err) => {
    if (err) {
      logging.error(NAMESPACE, err?.message || "", err)
    }
  })
})

ArrivalSchema.post("insertMany", (arrivals: IArrival[]) => {
  for (let i = 0; i < arrivals.length; i += 1) {
    Visit.updateOne(
      { _id: arrivals[i].visit },
      { $push: { arrivals: arrivals[i] } },
    ).exec((err) => {
      if (err) {
        logging.error(NAMESPACE, err?.message || "", err)
      }
    })
  }
})

export default mongoose.model<IArrival>("arrival", ArrivalSchema)
