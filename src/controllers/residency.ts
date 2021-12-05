import { Request, Response } from "express"
import { CallbackError, Error } from "mongoose"
import { IResidency } from "../interfaces/residency"
import Residency from "../models/residency"

const createResidency = (req: Request, res: Response) => {
  const {
    name,
    logo,
    address,
    email,
    phone,
    announcements,
    incidents,
    complaints,
  }: IResidency = req.body

  const residency = new Residency({
    name,
    logo,
    address,
    email,
    phone,
    announcements,
    incidents,
    complaints,
  })

  return residency
    .save()
    .then((result) => {
      return res.status(201).json({
        result,
      })
    })
    .catch((error: Error) => {
      return res.status(500).json({
        message: error.message,
        error,
      })
    })
}

const getResidency = (req: Request, res: Response) => {
  const { id } = req.body
  Residency.findById(id, (err: CallbackError, residency: IResidency) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        err,
      })
    }
    return res.status(200).json({
      residency,
    })
  })
}

export default { createResidency, getResidency }
