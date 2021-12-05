import mongoose, { Schema } from "mongoose"
import IUser from "../interfaces/user"

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.model<IUser>("user", UserSchema)
