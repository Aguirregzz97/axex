import faker from "faker"
import bcrypyt from "bcrypt"
import mongoose from "mongoose"
import { Request, Response } from "express"
import Residency from "../models/residency"
import User from "../models/user"
import Unit from "../models/unit"
import IUser from "../interfaces/user"
import logging from "../config/logging"

const NAMESPACE = "Server"

const deleteAllDocuments = async () => {
  await Residency.deleteMany({})
  await User.deleteMany({})
  await Unit.deleteMany({})
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
const initUsers = async (residencyId: mongoose.Types.ObjectId) => {
  logging.info(NAMESPACE, "Creating Users...")

  const promises: Promise<
    IUser & {
      _id: any
    }
  >[] = []

  for (let i = 0; i < 80; i += 1) {
    promises.push(createUser(residencyId))
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

const initUnits = async () => {
  logging.info(NAMESPACE, "Creating Units...")
  const units = []
  const userIds = await User.find({}).select("_id").exec()
  let roomNumber = 1
  for (let i = 0; i < userIds.length; i += 1) {
    const floorNumber = Math.floor(i / 4) + 2
    if (roomNumber === 5) roomNumber = 1
    const unit = new Unit({
      user: userIds[i],
      unitType: "apartment",
      floor: Number(`${floorNumber}0${roomNumber}`),
      roomNumber,
      address: "",
      dayOfPayment: 15,
      monthlyPayments: true,
      monthlyAmount: getMonthlyAmountBasedOnFloor(floorNumber),
    })

    units.push(unit)

    roomNumber += 1
  }

  Unit.insertMany(units).catch((error) => {
    throw new Error(error)
  })
}

const createDataInit = async (_req: Request, res: Response) => {
  await deleteAllDocuments()
  try {
    const residencyId = await initResidency()
    await initUsers(residencyId)
    await initUnits()
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
