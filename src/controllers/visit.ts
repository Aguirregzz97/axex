import mongoose from "mongoose"
import { Response, Express, Request } from "express"
import uploadCareClient from "../clients/uploadCare"
import logging from "../config/logging"
import Visit from "../models/visit"
import constants from "../constants/globalConstants"
import config from "../config/config"
import { PaginatedResponse } from "../middleware/pagination"
import pagination from "../utils/pagination"

const NAMESPACE = "Server"

const uploadIdImage = async (file: Express.Multer.File) => {
  return new Promise<string>((resolve) => {
    const { buffer } = file
    uploadCareClient
      .uploadFile(buffer, {
        fileName: file.originalname,
        contentType: file.mimetype,
      })
      .then((fileUC) => {
        if (fileUC.cdnUrl) {
          resolve(fileUC.cdnUrl)
        }
      })
      .catch((error) => {
        if (error) {
          logging.error(NAMESPACE, error.message, error)
          resolve("")
        }
      })
  })
}

const createVisit = async (req: Request, res: Response) => {
  const { firstName, lastName, visitType, licensePlate, expireDate, user } =
    req.body
  let idImageURL = ""
  if (req.file) {
    const { file } = req
    idImageURL = await uploadIdImage(file)
  }
  const visitId = new mongoose.Types.ObjectId()
  const accessCode = new mongoose.Types.ObjectId()
  const qrCodeURL = `${config.server.apiUrl}/api/arrival/create/arrival?visit=${visitId}&accessCode=${accessCode}`
  const visit = new Visit({
    _id: visitId,
    user,
    firstName,
    lastName,
    visitType,
    licensePlate,
    idImageURL,
    accessCode,
    qrCodeURL,
    expireDate:
      visitType === "permanent"
        ? constants.noExpireDate.toISOString()
        : expireDate,
    hasEntered: false,
  })
  visit
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
const getUserVisits = async (
  req: Request,
  res: Response & PaginatedResponse,
) => {
  const { userId } = req.query as any
  const { pageSize } = res.paginationOptions
  const { startIndex } = res.paginationOptions
  const { search } = res.paginationOptions

  try {
    const userVisits = await Visit.find(pagination.getPaginationQuery(search))
      .find({ user: userId })
      .sort(pagination.getPaginationSort(search))
      .limit(pageSize)
      .skip(startIndex)
      .exec()

    const userVisitsCount = await Visit.find(
      pagination.getPaginationQuery(search),
    )
      .find({ user: userId })
      .count()

    const { paginationOptions } = res
    paginationOptions.totalDataCount = userVisitsCount

    return res.status(200).json({
      ...paginationOptions,
      data: userVisits,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

export default { createVisit, getUserVisits }
