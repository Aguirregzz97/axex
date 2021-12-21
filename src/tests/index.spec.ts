import mongoose from "mongoose"
import Residency from "../models/residency"
import User from "../models/user"
import testHelpers from "./helpers/testHelpers"
import server from "../server"
import residencyTests from "./residency"
import userTests from "./user"
import unitTests from "./unit"

describe("Residency Test", residencyTests)
describe("User Tests", userTests)
describe("Unit Tests", unitTests)

afterAll(async () => {
  await User.deleteMany()
  await Residency.deleteMany()
  await testHelpers.closeServer(server.httpServer)
  await mongoose.connection.close()
})
