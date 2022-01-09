import { Request, Response } from "express"
import { PaginatedResponse } from "../middleware/pagination"
import Unit from "../models/unit"
import User from "../models/user"
import pagination from "../utils/pagination"

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

// paginated
const getResidencyUnits = async (
  req: Request,
  res: Response & PaginatedResponse,
) => {
  const { residency } = req.query as any
  const { pageSize } = res.paginationOptions
  const { startIndex } = res.paginationOptions
  const { search } = res.paginationOptions
  try {
    const residencyUsers = await User.find({ residency }).exec()

    const residencyUnits = await Unit.find(
      pagination.getPaginationQuery(search),
    )
      .find({
        user: { $in: residencyUsers },
      })
      .sort(pagination.getPaginationSort(search))
      .limit(pageSize)
      .skip(startIndex)
      .exec()

    const residencyUnitsCount = await Unit.find(
      pagination.getPaginationQuery(search),
    )
      .find({
        user: { $in: residencyUsers },
      })
      .count()

    const { paginationOptions } = res
    paginationOptions.totalDataCount = residencyUnitsCount

    return res.status(200).json({
      ...paginationOptions,
      data: residencyUnits,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

const getUserUnit = (req: Request, res: Response) => {
  const { user } = req.query as any
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
