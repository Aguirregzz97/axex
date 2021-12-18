import { Request, Response } from "express"
import { CallbackError } from "mongoose"
import { IIncident } from "../interfaces/incident"
import Incident from "../models/incident"

const createIncident = (req: Request, res: Response) => {
  const { title, content, pictures, user, residency } = req.body

  const incident: IIncident = new Incident({
    title,
    content,
    pictures,
    user,
    residency,
  })

  return incident
    .save()
    .then((result) => {
      return res.status(201).json({
        incident: result,
      })
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      })
    })
}

const getIncidents = (req: Request, res: Response) => {
  const { residency } = req.body
  Incident.find({
    residency,
  })
    .populate("residency")
    .populate("user")
    .exec((err: CallbackError, incidents) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
          err,
        })
      }
      return res.status(200).json({
        incidents,
      })
    })
}

export default { getIncidents, createIncident }
