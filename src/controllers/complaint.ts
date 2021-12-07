import { Request, Response } from "express"
import { CallbackError } from "mongoose"
import { IComplaint } from "../interfaces/complaint"
import Complaint from "../models/complaint"

const createComplaint = (req: Request, res: Response) => {
  const { title, content, pictures, user, residency } = req.body

  const complaint: IComplaint = new Complaint({
    title,
    content,
    pictures,
    user,
    residency,
  })

  return complaint
    .save()
    .then((result) => {
      return res.status(201).json({
        complaint: result,
      })
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      })
    })
}

const getComplaints = (req: Request, res: Response) => {
  const { residency } = req.body
  Complaint.find({
    residency,
  })
    .populate("residency")
    .populate("user")
    .exec((err: CallbackError, complaints) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          err,
        })
      }
      res.status(200).json({
        complaints,
      })
    })
}

export default { getComplaints, createComplaint }
