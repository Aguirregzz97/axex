import mongoose from "mongoose"
import server from "../server"
import testHelpers from "./helpers/testHelpers"
import residencyTests from "./residency"
import userTests from "./user"
import unitTests from "./unit"
import visitTests from "./visit"
import Visit from "../models/visit"
import Unit from "../models/unit"
import User from "../models/user"
import Residency from "../models/residency"

describe("Residency Test", residencyTests)
describe("User Tests", userTests)
describe("Unit Tests", unitTests)
describe("Visit Tests", visitTests)

afterAll(async () => {
  await User.deleteMany()
  await Residency.deleteMany()
  await Unit.deleteMany()
  await Visit.deleteMany()

  await testHelpers.closeServer(server.httpServer)
  await mongoose.connection.close()
})
