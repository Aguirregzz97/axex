import { Request, Response } from "express"
import { CallbackError } from "mongoose"
import { IIncident } from "../interfaces/incident"
import Incident from "../models/incident"
import { DBRefs } from "../types/types"

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
    .populate("residency" as DBRefs)
    .populate("user" as DBRefs)
    .exec((err: CallbackError, incidents) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          err,
        })
      }
      res.status(200).json({
        incidents,
      })
    })
}

export default { getIncidents, createIncident }
