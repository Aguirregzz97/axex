import { Request, Response } from "express"
import Unit from "../models/unit"
import User from "../models/user"

const createUnit = (req: Request, res: Response) => {
  const {
    user,
    unitType,
    floor,
    roomNumber,
    address,
    dayOfPayment,
    monthlyPayments,
    monthlyAmount,
  } = req.body

  const unit = new Unit({
    user,
    unitType,
    floor,
    roomNumber,
    address,
    dayOfPayment,
    monthlyPayments,
    monthlyAmount,
  })

  unit
    .save()
    .then((result) => {
      return res.status(201).json({
        result,
      })
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      })
    })
}

const getResidencyUnits = async (req: Request, res: Response) => {
  const { residency } = req.body
  try {
    const residencyUsers = await User.find({ residency }).exec()
    const residencyUnits = await Unit.find({
      user: { $in: residencyUsers },
    }).exec()
    return res.status(200).json({
      residencyUnits,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

const getUserUnit = (req: Request, res: Response) => {
  const { user } = req.body
  Unit.find({ user }).exec((error, unit) => {
    if (error) {
      return res.status(500).json({
        message: error.message,
        error,
      })
    }
    return res.status(200).json({
      unit,
    })
  })
}

export default { createUnit, getResidencyUnits, getUserUnit }
