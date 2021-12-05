import { Document } from "mongoose"
import { IAnnouncement } from "./announcement"
import { IComplaint } from "./complaint"
import { IIncident } from "./incident"

export interface IResidency extends Document {
  name: string
  logo: string
  address: string
  email: string
  phone: string
  announcements?: IAnnouncement[]
  incidents?: IIncident[]
  complaints?: IComplaint[]
}
