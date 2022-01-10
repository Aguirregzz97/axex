import { Request, Response } from "express"
import { IPaymentRequest } from "../interfaces/paymentRequest"
import { PaginatedResponse } from "../middleware/pagination"
import PaymentRequest from "../models/paymentRequest"
import User from "../models/user"
import pagination from "../utils/pagination"

const createPaymentRequest = (req: Request, res: Response) => {
  const { amount, user, expireDate, description } = req.body as IPaymentRequest

  const paymentRequest = new PaymentRequest({
    amount,
    user,
    expireDate,
    description,
    expired: false,
    payed: false,
  })

  paymentRequest
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

// paginated
const getUserPaymentRequests = async (
  req: Request,
  res: Response & PaginatedResponse,
) => {
  const { user } = req.query as any
  const { pageSize } = res.paginationOptions
  const { startIndex } = res.paginationOptions
  const { search } = res.paginationOptions

  try {
    const paymentRequests = await PaymentRequest.find(
      pagination.getPaginationQuery(search),
    )
      .find({ user })
      .sort(pagination.getPaginationSort(search))
      .limit(pageSize)
      .skip(startIndex)
      .exec()

    const paymentRequestsCount = await PaymentRequest.find(
      pagination.getPaginationQuery(search),
    )
      .find({ user })
      .count()

    const { paginationOptions } = res
    paginationOptions.totalDataCount = paymentRequestsCount

    return res.status(200).json({
      ...paginationOptions,
      data: paymentRequests,
    })
  } catch (error: any) {
    return res.json({
      message: error.message,
      error,
    })
  }
}

const getResidencyPaymentRequests = async (req: Request, res: Response) => {
  const { residency } = req.query as any
  try {
    const residencyUsers = await User.find({ residency }).select("_id").exec()
    const paymentRequests = await PaymentRequest.find({
      user: { $in: residencyUsers },
    }).exec()
    return res.status(200).json({
      paymentRequests,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

export default {
  createPaymentRequest,
  getUserPaymentRequests,
  getResidencyPaymentRequests,
}
