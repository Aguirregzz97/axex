import { Document } from "mongoose"
import IUser from "./user"

type UnitType = "apartment" | "house"

export interface IUnit extends Document {
  user: IUser
  type: UnitType
  monthlyPayments: boolean
  monthlyAmount: string
  dayOfPayment: number
  floor: string
  roomNumber: string
  address: string
}
