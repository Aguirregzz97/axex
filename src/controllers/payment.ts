import { Request, Response } from "express"
import Payment from "../models/payment"
import PaymentRequest from "../models/paymentRequest"
import User from "../models/user"

const getUserPayments = async (req: Request, res: Response) => {
  const { user } = req.body
  try {
    const userPaymentRequests = await PaymentRequest.find({ user }).exec()
    const payments = await Payment.find({
      paymentRequest: { $in: userPaymentRequests },
    })
      .populate({ path: "paymentRequest" })
      .exec()
    return res.status(200).json({
      payments,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

const createPayment = (req: Request, res: Response) => {
  const { paymentRequest, approved } = req.body
  const payment = new Payment({
    paymentRequest,
    approved,
  })
  payment
    .save()
    .then((result) => {
      return res.status(201).json({
        result,
      })
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error })
    })
}

const getResidencyPayments = async (req: Request, res: Response) => {
  const { residency } = req.query as any
  try {
    const residencyUsers = await User.find({ residency }).exec()
    const residencyPaymentRequests = await PaymentRequest.find({
      user: { $in: residencyUsers },
    }).exec()
    const residencyPayments = await Payment.find({
      paymentRequest: { $in: residencyPaymentRequests },
    }).exec()
    return res.status(200).json({
      residencyPayments,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

export default { getUserPayments, createPayment, getResidencyPayments }
