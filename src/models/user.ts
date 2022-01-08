import mongoose, { Schema } from "mongoose"
import IUser from "../interfaces/user"

const UserSchema: Schema = new Schema(
  {
    userRole: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    blocked: { type: Boolean, required: true },
    residency: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "residency",
    },
    unit: { type: mongoose.Types.ObjectId, ref: "unit" },
    paymentRequests: [
      {
        type: mongoose.Types.ObjectId,
        ref: "paymentRequest",
      },
    ],
    visits: [
      {
        type: mongoose.Types.ObjectId,
        ref: "visit",
      },
    ],
  },
  { timestamps: true },
)

UserSchema.index({
  firstName: "text",
  lastName: "text",
  email: "text",
  phone: "text",
})

export default mongoose.model<IUser>("user", UserSchema)
