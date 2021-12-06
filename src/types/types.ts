import { Request } from "express"
import IUser from "../interfaces/user"

export interface AxexRequest extends Request {
  user: IUser
}

export type DBRefs =
  | "user"
  | "announcement"
  | "incident"
  | "complaint"
  | "residency"
  | "refreshToken"
  | "payment"
