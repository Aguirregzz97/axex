import mongoose, { Schema } from "mongoose"
import IRefreshToken from "../interfaces/refreshToken"

const RefreshTokenSchema: Schema = new Schema(
  {
    token: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenSchema)
