import { Server } from "http"
import { IVisit } from "../../interfaces/visit"
import Residency from "../../models/residency"
import User from "../../models/user"
import Visit from "../../models/visit"
import PaymentRequest from "../../models/paymentRequest"

const closeServer = async (httpServer: Server): Promise<void> => {
  return new Promise((resolve, reject) => {
    httpServer.close((error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

const getResidencyId = async (): Promise<string> => {
  const residency = await Residency.findOne({}).exec()
  return residency?._id
}

const getUserId = async (): Promise<string> => {
  const user = await User.findOne({}).exec()
  return user?.id
}

const getPermanentVisit = async (): Promise<(IVisit & { _id: any }) | null> => {
  const visit = await Visit.findOne({ visitType: "permanent" }).exec()
  return visit
}

const getSingleTimeVisit = async (): Promise<
  (IVisit & { _id: any }) | null
> => {
  const visit = await Visit.findOne({ visitType: "singleTime" }).exec()
  return visit
}

const getVisitById = async (
  visitId: string,
  // eslint-disable-next-line function-paren-newline
): Promise<(IVisit & { _id: any }) | null> => {
  const visit = await Visit.findOne({ _id: visitId }).exec()
  return visit
}

const expireSingleTimeVisit = async (): Promise<void> => {
  const expiredDate = new Date()
  expiredDate.setDate(expiredDate.getDate() - 1)
  const visitId = await getSingleTimeVisit()
  await Visit.updateOne(
    { _id: visitId },
    { $set: { expireDate: expiredDate } },
  ).exec()
}

const getPaymentRequestId = async () => {
  const paymentRequest = await PaymentRequest.findOne({}).exec()
  return paymentRequest
}

export default {
  closeServer,
  getResidencyId,
  getUserId,
  getPermanentVisit,
  getSingleTimeVisit,
  expireSingleTimeVisit,
  getVisitById,
  getPaymentRequestId,
}
