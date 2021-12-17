import { Request, Response } from "express"
import { CallbackError } from "mongoose"
import { IAnnouncement } from "../interfaces/announcement"
import Announcement from "../models/announcement"

const createAnnouncement = async (req: Request, res: Response) => {
  const { title, content, pictures, residency } = req.body

  const announcement: IAnnouncement = new Announcement({
    title,
    content,
    pictures,
    residency,
  })

  return announcement
    .save()
    .then((result) => {
      return res.status(201).json({
        announcement: result,
      })
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      })
    })
}

const getAnnouncements = (req: Request, res: Response) => {
  const { residency } = req.body
  Announcement.find({
    residency,
  })
    .populate("residency")
    .exec((err: CallbackError, announcements) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          err,
        })
      }
      res.status(200).json({
        announcements,
      })
    })
}

export default { getAnnouncements, createAnnouncement }
