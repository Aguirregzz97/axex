import mongoose, { Schema } from "mongoose"
import IUser from "../interfaces/user"

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    blocked: { type: Boolean, required: true },
    payments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "payment",
        required: true,
      },
    ],
    visits: [
      {
        type: mongoose.Types.ObjectId,
        ref: "visit",
        required: true,
      },
    ],
    arrivals: [
      {
        type: mongoose.Types.ObjectId,
        ref: "arrival",
        required: true,
      },
    ],
  },
  { timestamps: true },
)

export default mongoose.model<IUser>("user", UserSchema)
