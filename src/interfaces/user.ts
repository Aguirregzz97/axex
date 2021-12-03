import { Document } from "mongoose"

export default interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}
