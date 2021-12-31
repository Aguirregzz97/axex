import mongoose from "mongoose"
import server from "../server"
import testHelpers from "./helpers/testHelpers"
import residencyTests from "./residency"
import userTests from "./user"
import unitTests from "./unit"
import visitTests from "./visit"
import arrivalTests from "./arrival"
import paymentRequestTests from "./paymentRequest"
import paymentTests from "./payment"
import Visit from "../models/visit"
import Unit from "../models/unit"
import User from "../models/user"
import Residency from "../models/residency"
import Arrival from "../models/arrival"
import PaymentRequest from "../models/paymentRequest"
import Payment from "../models/payment"

describe("Residency Test", residencyTests)
describe("User Tests", userTests)
describe("Unit Tests", unitTests)
describe("Visit Tests", visitTests)
describe("Arrival Tests", arrivalTests)
describe("Payment Request Tests", paymentRequestTests)
describe("Payment Tests", paymentTests)

afterAll(async () => {
  await User.deleteMany({})
  await Residency.deleteMany({})
  await Unit.deleteMany({})
  await Visit.deleteMany({})
  await Arrival.deleteMany({})
  await PaymentRequest.deleteMany({})
  await Payment.deleteMany({})

  await testHelpers.closeServer(server.httpServer)

  await mongoose.connection.close()
})
