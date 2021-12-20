import { CallbackError } from "mongoose"
import cron from "node-cron"
import logging from "../config/logging"
import { IPaymentRequest } from "../interfaces/paymentRequest"
import IUser from "../interfaces/user"
import User from "../models/user"
import PaymentRequest from "../models/paymentRequest"
import dateUtils from "../utils/dates"

const NAMESPACE = "Server"

const logPaymentRequestExpired = (
  user: IUser,
  paymentRequest: IPaymentRequest,
) => {
  logging.info(
    NAMESPACE,
    `The payment request of the user ${user.firstName} ${
      user.lastName
    } has expired.
      today is: ${new Date().toDateString()}
      the expire date is ${paymentRequest.expireDate.toDateString()}
    `,
    paymentRequest,
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

const expirePaymentRequest = (paymentRequest: IPaymentRequest) => {
  PaymentRequest.updateOne(
    { _id: paymentRequest._id },
    { $set: { expired: true } },
  ).exec((error: CallbackError) => {
    if (error) {
      logging.error(NAMESPACE, error.message, error)
    }
    logging.info(
      NAMESPACE,
      `Succesfully set payment request ${paymentRequest._id} status to expired`,
    )
  })
}

// minute hour dayofmonth month dayofweek
// at 00:30
const checkForExpiredPaymentRequests = () => {
  cron
    .schedule(
      "30 01 * * *",
      () => {
        logging.info(
          NAMESPACE,
          "Check For Expired Payment Requests Job Started",
        )
        User.find({})
          .populate({
            path: "paymentRequests",
            match: { expired: false, payed: false },
          })
          .select("paymentRequests firstName lastName")
          .exec((err: CallbackError, users) => {
            if (err) {
              logging.error(NAMESPACE, err.message, err)
              return
            }
            if (!users) return
            users.forEach((user) => {
              const pendingPaymentRequests = user.paymentRequests
              pendingPaymentRequests.forEach((ppr: IPaymentRequest) => {
                const { expireDate } = ppr
                if (dateUtils.hasExpired(expireDate)) {
                  logPaymentRequestExpired(user, ppr)
                  expirePaymentRequest(ppr)
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
    .start()
}

export default checkForExpiredPaymentRequests
