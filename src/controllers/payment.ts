import { Request, Response } from "express"
import { CallbackError, Error } from "mongoose"
import { IPayment } from "../interfaces/payment"
import Payment from "../models/payment"

const createPayment = (req: Request, res: Response) => {
  const { amount, status, user, expireDate, month } = req.body as IPayment

  const payment = new Payment({
    amount,
    status,
    user,
    expireDate,
    month,
  })

  payment
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

const getUserPayments = (req: Request, res: Response) => {
  const { user } = req.body

  Payment.find({ user }).exec((error: CallbackError, payments) => {
    if (error) {
      return res.json({
        message: error.message,
        error,
      })
    }
    return res.status(200).json({
      payments,
    })
  })
}

export default { createPayment, getUserPayments }
