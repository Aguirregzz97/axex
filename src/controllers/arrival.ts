import { Request, Response } from "express"
import Arrival from "../models/arrival"
import Visit from "../models/visit"
import dateUtils from "../utils/dates"

const createArrival = async (req: Request, res: Response) => {
  const { visit, accessCode } = req.query
  try {
    const arrivalsVisit = await Visit.findOne({ _id: visit }).exec()
    // visit not found
    if (!arrivalsVisit) {
      return res.status(404).json({
        message: `Visit with id: ${visit} not found`,
      })
    }
    // access code not same as visit
    if (arrivalsVisit.accessCode !== accessCode) {
      return res.status(403).json({
        message: `Access Code with id: ${accessCode} not valid for visit with id ${visit}`,
      })
    }
    // check if has already entered
    if (arrivalsVisit.hasEntered) {
      return res.status(403).json({
        message: `The visit with id ${visit} has already entered, and it's a single time visit`,
      })
    }
    // check if expired
    if (dateUtils.hasExpired(arrivalsVisit.expireDate)) {
      await Visit.updateOne({ _id: visit }, { $set: { expired: true } }).exec()
      return res.status(403).json({
        message: `The visit with id ${visit} has expired`,
      })
    }
    // At this point the visit can access
    if (arrivalsVisit.visitType === "singleTime") {
      await Visit.updateOne({ _id: visit }, { $set: { expired: true } }).exec()
    }
    const arrival = new Arrival({
      visit,
    })
    const result = await arrival.save()
    return res.status(200).json({
      result,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

const getVisitArrivals = (req: Request, res: Response) => {
  const { visit } = req.body
  Arrival.find({ visit }).exec((error, result) => {
    if (error) {
      res.status(500).json({
        message: error.message,
        error,
      })
    }
    res.status(200).json({
      result,
    })
  })
}

const getUserVisitArrivals = async (req: Request, res: Response) => {
  const { user } = req.body
  try {
    const userVisits = await Visit.find({ user }).exec()
    const userArrivals = await Arrival.find({
      visit: { $in: userVisits },
    }).exec()
    return res.status(200).json({
      userArrivals,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

export default { createArrival, getVisitArrivals, getUserVisitArrivals }
