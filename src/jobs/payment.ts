import { CallbackError } from "mongoose"
import cron from "node-cron"
import logging from "../config/logging"
import { IPayment } from "../interfaces/payment"
import IUser from "../interfaces/user"
import User from "../models/user"
import Payment from "../models/payment"
import dateUtils from "../utils/dates"
import config from "../config/config"

const NAMESPACE = "Server"

const logPaymentExpired = (user: IUser, payment: IPayment) => {
  logging.info(
    NAMESPACE,
    `
      The payment of the user ${user.firstName} ${user.lastName} has expired.
        today is: ${new Date().toDateString()}
        the expire date is ${payment.expireDate.toDateString()}
    `,
    payment,
  )
}

const blockUser = (user: IUser) => {
  User.updateOne({ _id: user._id }, { $set: { blocked: true } }).exec(
    (error: CallbackError) => {
      if (error) {
        logging.error(NAMESPACE, error.message, error)
      }
      logging.info(
        NAMESPACE,
        `Blocked user ${user.firstName} ${user.lastName} with id ${user._id}`,
      )
    },
  )
}

const changePaymentStatus = (payment: IPayment) => {
  Payment.updateOne({ _id: payment._id }, { $set: { status: "expired" } }).exec(
    (error: CallbackError) => {
      if (error) {
        logging.error(NAMESPACE, error.message, error)
      }
      logging.info(NAMESPACE, `Set payment ${payment._id} status to expired`)
    },
  )
}

// minute hour dayofmonth month dayofweek
const checkForExpiredPayments = cron.schedule(
  "1 1 1 * *",
  () => {
    if (config.server.hostname === "localhost") return
    logging.info(NAMESPACE, "Check For Expired Payments Job Started")
    User.find({})
      .populate({ path: "payments", match: { status: "pending" } })
      .select("payments firstName lastName")
      .exec((err: CallbackError, users) => {
        if (err) {
          logging.error(NAMESPACE, err.message, err)
        }
        users.forEach((user) => {
          const pendingPayments = user.payments
          pendingPayments.forEach((pp) => {
            const { expireDate } = pp
            if (dateUtils.hasExpired(expireDate)) {
              logPaymentExpired(user, pp)
              changePaymentStatus(pp)
              blockUser(user)
            }
          })
        })
      })
  },
  {
    timezone: "America/Mexico_City",
  },
)

export default checkForExpiredPayments
