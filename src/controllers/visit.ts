import mongoose from "mongoose"
import { Response, Express } from "express"
import uploadCareClient from "../clients/uploadCare"
import logging from "../config/logging"
import Visit from "../models/visit"
import constants from "../constants/globalConstants"

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

const createVisit = async (req: any, res: Response) => {
  const { firstName, lastName, visitType, licensePlate, expireDate } = req.body
  let idImageURL = ""
  if (req.file) {
    const { file } = req
    idImageURL = await uploadIdImage(file)
  }
  const visitId = new mongoose.Types.ObjectId()
  const accessId = new mongoose.Types.ObjectId()
  const userId = req.user._id
  const visit = new Visit({
    _id: visitId,
    user: userId,
    firstName,
    lastName,
    visitType,
    licensePlate,
    idImageURL,
    accessCode: `${accessId}/${visitId}`,
    expireDate:
      visitType === "permanent"
        ? constants.noExpireDate.toISOString()
        : expireDate,
    expired: false,
  })
  visit
    .save()
    .then((result) => {
      res.status(201).json({
        result,
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
        error,
      })
    })
}

export default { createVisit }
