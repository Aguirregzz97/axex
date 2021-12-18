import { Request, Response } from "express"
import { CallbackError, Error } from "mongoose"
import { IPaymentRequest } from "../interfaces/paymentRequest"
import PaymentRequest from "../models/paymentRequest"
import User from "../models/user"

const createPaymentRequest = (req: Request, res: Response) => {
  const { amount, user, expireDate } = req.body as IPaymentRequest

  const paymentRequest = new PaymentRequest({
    amount,
    user,
    expireDate,
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

const getUserPaymentRequests = (req: Request, res: Response) => {
  const { user } = req.body

  PaymentRequest.find({ user }).exec(
    (error: CallbackError, paymentRequests) => {
      if (error) {
        return res.json({
          message: error.message,
          error,
        })
      }
      return res.status(200).json({
        paymentRequests,
      })
    },
  )
}

const getResidencyPaymentRequests = async (req: Request, res: Response) => {
  const { residency } = req.body
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
