import { Request } from "express"
import IUser from "../interfaces/user"

export interface AxexRequest extends Request {
  user: IUser
}
