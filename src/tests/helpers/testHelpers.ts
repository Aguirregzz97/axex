import { Server } from "http"
import Residency from "../../models/residency"
import User from "../../models/user"

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

export default { closeServer, getResidencyId, getUserId }
