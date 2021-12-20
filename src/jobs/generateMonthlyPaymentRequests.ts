import cron from "node-cron"
import mongoose from "mongoose"
import logging from "../config/logging"
import { IUnit } from "../interfaces/unit"
import Unit from "../models/unit"
import PaymentRequest from "../models/paymentRequest"

const NAMESPACE = "Server"

const generatePaymentRequest = (
  userId: mongoose.Types.ObjectId,
  expireDate: string,
  monthlyAmount: number,
) => {
  const paymentRequest = new PaymentRequest({
    user: userId,
    expireDate,
    expired: false,
    payed: false,
    amount: monthlyAmount,
  })
  paymentRequest
    .save()
    .then((result) => {
      logging.info(
        NAMESPACE,
        `Monthly Auto Generated Payment Request with id ${result._id} created for user with id ${userId}`,
      )
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message, error)
    })
}

const generatePayments = (units: IUnit[]) => {
  const today: number = new Date().getDate()
  units.forEach((unit) => {
    if (today === unit.dayOfPayment) {
      const expireDate = new Date()
      expireDate.setMonth(expireDate.getMonth() + 1)
      generatePaymentRequest(
        unit.user._id,
        expireDate.toISOString(),
        unit.monthlyAmount,
      )
    }
  })
}

// minute hour dayofmonth month dayofweek
// at 01:30
const generateMonthlyPaymentRequests = () => {
  cron
    .schedule("30 01 * * *", () => {
      logging.info(NAMESPACE, "Generate Monthly Payment Request Job Started...")
      Unit.find({})
        .select("_id dayOfPayment monthlyAmount user")
        .exec((error, units) => {
          if (error) {
            logging.error(NAMESPACE, error.message, error)
            return
          }
          generatePayments(units)
        })
    })
    .start()
}

export default generateMonthlyPaymentRequests
