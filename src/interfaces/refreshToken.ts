import { Document } from "mongoose"

export default interface IRefreshToken extends Document {
  token: string
}
