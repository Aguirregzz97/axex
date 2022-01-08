import faker from "faker"
import bcrypyt from "bcrypt"
import mongoose from "mongoose"
import { Request, Response } from "express"
import { endOfMonth, startOfMonth } from "date-fns"
import Residency from "../models/residency"
import User from "../models/user"
import Unit from "../models/unit"
import Visit from "../models/visit"
import Arrival from "../models/arrival"
import PaymentRequest from "../models/paymentRequest"
import Payment from "../models/payment"
import IUser from "../interfaces/user"
import logging from "../config/logging"
import config from "../config/config"
import constants from "../constants/globalConstants"
import { IVisit } from "../interfaces/visit"
import { IArrival } from "../interfaces/arrival"

const NAMESPACE = "Server"

const deleteAllDocuments = async () => {
  await Residency.deleteMany({})
  await User.deleteMany({})
  await Unit.deleteMany({})
  await Visit.deleteMany({})
  await Arrival.deleteMany({})
  await PaymentRequest.deleteMany({})
  await Payment.deleteMany({})
}

const initResidency = async (): Promise<mongoose.Types.ObjectId> => {
  const residency = new Residency({
    name: faker.company.companyName(),
    logo: faker.image.imageUrl(),
    address: faker.address.streetAddress(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    announcements: [],
    incidents: [],
    complaints: [],
  })

  await residency
    .save()
    .then((result) => {
      return result._id
    })
    .catch((error) => {
      throw new Error(error)
    })
  return new mongoose.Types.ObjectId()
}

const initAdminUser = async () => {
  logging.info(NAMESPACE, "Creating Super User...")
  const residency = await Residency.findOne().select("_id").exec()

  if (residency === null) {
    throw new Error("Could not find residency")
  }

  const email = config.superUser.superUserEmail
  const password = config.superUser.superUserPassword
  const salt = await bcrypyt.genSalt()
  const hashedPassword = await bcrypyt.hash(password, salt)

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    userRole: "admin",
    residency: residency.id,
    firstName: "Andres",
    lastName: "Aguirre",
    phone: faker.phone.phoneNumber(),
    email,
    blocked: false,
    password: hashedPassword,
    visits: [],
    paymentRequests: [],
  })

  user.save().catch((error) => {
    throw new Error(error)
  })
}

const createUser = async (
  residencyId: mongoose.Types.ObjectId,
): Promise<
  IUser & {
    _id: any
  }
> => {
  const password = faker.internet.password()
  // eslint-disable-next-line no-await-in-loop
  const salt = await bcrypyt.genSalt()
  // eslint-disable-next-line no-await-in-loop
  const hashedPassword = await bcrypyt.hash(password, salt)

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    userRole: "resident",
    residency: residencyId,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    blocked: false,
    password: hashedPassword,
    visits: [],
    paymentRequests: [],
  })

  return user
}

// init residents
const initUsers = async () => {
  logging.info(NAMESPACE, "Creating Users...")

  const promises: Promise<
    IUser & {
      _id: any
    }
  >[] = []

  const residency = await Residency.findOne().select("_id").exec()

  if (residency === null) {
    throw new Error("Could Not Get Residency")
  }

  for (let i = 0; i < 80; i += 1) {
    promises.push(createUser(residency.id))
  }
  const users = await Promise.all(promises)
  await User.insertMany(users).catch((error) => {
    throw new Error(error)
  })
}

const getMonthlyAmountBasedOnFloor = (floorNumber: number) => {
  if (floorNumber <= 8) return 3000
  if (floorNumber <= 14) return 4000
  if (floorNumber <= 18) return 5000
  if (floorNumber <= 22) return 6000
}

// init apartments
const initUnits = async () => {
  logging.info(NAMESPACE, "Creating Units...")
  const units = []
  const userIds = await User.find({ userRole: "resident" }).select("_id").exec()
  let roomNumber = 1
  const today = new Date().getDate()
  for (let i = 0; i < userIds.length; i += 1) {
    const floorNumber = Math.floor(i / 4) + 2
    if (roomNumber === 5) roomNumber = 1
    const unit = new Unit({
      user: userIds[i],
      unitType: "apartment",
      floor: String(floorNumber),
      roomNumber: `${floorNumber}0${roomNumber}`,
      address: "",
      dayOfPayment: today,
      monthlyPayments: true,
      monthlyAmount: String(getMonthlyAmountBasedOnFloor(floorNumber)),
    })

    units.push(unit)

    roomNumber += 1
  }

  Unit.insertMany(units).catch((error) => {
    throw new Error(error)
  })
}

const initPermanentVisits = async () => {
  logging.info(NAMESPACE, "Creating Permanent Visits...")

  const userIds = await User.find({ userRole: "resident" }).select("_id").exec()

  const permanentVisits: (IVisit & {
    _id: any
  })[] = []

  for (let i = 0; i < userIds.length; i += 1) {
    // generate rand num between 0 and 5
    const randNumVisits = Math.floor(Math.random() * 6)
    for (let j = 0; j < randNumVisits; j += 1) {
      const visitId = new mongoose.Types.ObjectId()
      const accessCode = new mongoose.Types.ObjectId()
      const qrCodeURL = `${config.server.apiUrl}/api/arrival/create/arrival?visit=${visitId}&accessCode=${accessCode}`
      const permanentVisit = new Visit({
        _id: visitId,
        user: userIds[i],
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        visitType: "permanent",
        licensePlate: "",
        idImageURL: faker.image.imageUrl(),
        accessCode,
        qrCodeURL,
        expireDate: constants.noExpireDate.toISOString(),
        hasEntered: false,
      })

      permanentVisits.push(permanentVisit)
    }
  }

  Visit.insertMany(permanentVisits).catch((error) => {
    throw new Error(error)
  })
}

const initSingleTimeVisits = async () => {
  logging.info(NAMESPACE, "Creating Single Time Visits...")

  const userIds = await User.find({ userRole: "resident" }).select("_id").exec()

  const singleTimeVisits: (IVisit & {
    _id: any
  })[] = []

  for (let i = 0; i < userIds.length; i += 1) {
    // generate rand num between 0 and 5
    const randNumVisits = Math.floor(Math.random() * 3)
    for (let j = 0; j < randNumVisits; j += 1) {
      const visitId = new mongoose.Types.ObjectId()
      const accessCode = new mongoose.Types.ObjectId()
      const qrCodeURL = `${config.server.apiUrl}/api/arrival/create/arrival?visit=${visitId}&accessCode=${accessCode}`
      const singleTimeVisit = new Visit({
        _id: visitId,
        user: userIds[i],
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        visitType: "singleTime",
        licensePlate: "",
        idImageURL: faker.image.imageUrl(),
        accessCode,
        qrCodeURL,
        expireDate: constants.noExpireDate.toISOString(),
        hasEntered: false,
      })

      singleTimeVisits.push(singleTimeVisit)
    }
  }

  await Visit.insertMany(singleTimeVisits).catch((error) => {
    throw new Error(error)
  })
}

const initVisits = async () => {
  logging.info(NAMESPACE, "Creating Visits...")
  try {
    await initPermanentVisits()
    await initSingleTimeVisits()
  } catch (error: any) {
    throw new Error(error)
  }
}

const updateVisitHasEntered = async (visitId: mongoose.Types.ObjectId) => {
  await Visit.updateOne({ _id: visitId }, { $set: { hasEntered: true } }).exec()
}

const initArrivals = async () => {
  logging.info(NAMESPACE, "Creating Arrivals...")
  const permanentVisits = await Visit.find({ visitType: "permanent" })
    .select("_id")
    .exec()
  const singleTimeVisits = await Visit.find({ visitType: "singleTime" })
    .select("_id")
    .exec()

  const arrivals: (IArrival & {
    _id: any
  })[] = []

  for (let i = 0; i < permanentVisits.length; i += 1) {
    // generate rand num between 0 and 5
    // creates a permanent arrival 0 to 5 times randomly
    const randNumArivals = Math.floor(Math.random() * 6)
    for (let j = 0; j < randNumArivals; j += 1) {
      const arrivedAt = faker.date.between(
        startOfMonth(new Date()),
        endOfMonth(new Date()),
      )
      const arrival = new Arrival({
        visit: permanentVisits[i],
        createdAt: arrivedAt,
      })
      arrivals.push(arrival)
    }
  }

  const promises = []
  for (let i = 0; i < singleTimeVisits.length; i += 1) {
    // generate rand num between 0 and 2
    // basically 66% chance it creates a single time arrival
    const randNumArivals = Math.floor(Math.random() * 3)
    if (randNumArivals !== 0) {
      const arrival = new Arrival({
        visit: singleTimeVisits[i],
      })
      promises.push(updateVisitHasEntered(singleTimeVisits[i].id))
      arrivals.push(arrival)
    }
  }

  await Promise.all(promises)

  await Arrival.insertMany(arrivals).catch((error) => {
    throw new Error(error)
  })
}

const initPaymentRequests = async () => {
  logging.info(NAMESPACE, "Creating Payment Requests...")
  const users = await User.find({ userRole: "resident" }).exec()
  const paymentRequests = []
  for (let i = 0; i < users.length; i += 1) {
    // generate random number between 0 and 7
    const randNum = Math.floor(Math.random() * 8)
    if (randNum === 0) {
      const paymentRequest = new PaymentRequest({
        amount: faker.datatype.number({ min: 10, max: 9000 }),
        description: faker.commerce.productDescription(),
        user: users[i],
        expireDate: new Date().toISOString(),
        expired: false,
        payed: false,
      })
      paymentRequests.push(paymentRequest)
    }
  }

  await PaymentRequest.insertMany(paymentRequests).catch((error) => {
    throw new Error(error)
  })
}

const setPaymentRequestsAsPayed = async (
  paymentRequestId: mongoose.Types.ObjectId,
) => {
  await PaymentRequest.updateOne(
    { _id: paymentRequestId },
    { $set: { payed: true } },
  )
}

const initPayments = async () => {
  logging.info(NAMESPACE, "Creating Payments...")
  const paymentRequests = await PaymentRequest.find({}).exec()
  const payments = []
  const promises = []
  for (let i = 0; i < paymentRequests.length; i += 1) {
    // generate rand num between 0 and 1
    const randNum = Math.floor(Math.random() * 2)
    if (randNum === 0) {
      const payment = new Payment({
        paymentRequest: paymentRequests[i],
        approved: faker.datatype.boolean(),
      })
      promises.push(setPaymentRequestsAsPayed(paymentRequests[i].id))
      payments.push(payment)
    }
  }

  await Promise.all(promises)

  await Payment.insertMany(payments).catch((error) => {
    throw new Error(error)
  })
}

const createDataInit = async (_req: Request, res: Response) => {
  await deleteAllDocuments()
  try {
    await initResidency()
    await initAdminUser()
    await initUsers()
    await initUnits()
    await initVisits()
    await initArrivals()
    await initPaymentRequests()
    await initPayments()
    return res.status(201).json({
      message: "succesfully inited data :D pog pog",
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error,
    })
  }
}

export default { createDataInit }
