import request from "supertest"
import faker from "faker"
import server from "../server"
import testHelpers from "./helpers/testHelpers"

const visitTests = () => {
  test("should create a permament visit", async () => {
    const expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + 15)
    const userId = await testHelpers.getUserId()
    const response = await request(server.router)
      .post("/api/visit/create/visit")
      .set("Content-Type", "multipart/form-data")
      .auth(process.env.TEST_ACCESS_TOKEN || "", { type: "bearer" })
      .field("firstName", faker.name.firstName())
      .field("lastName", faker.name.lastName())
      .field("visitType", "permanent")
      .field("expireDate", expireDate.toISOString())
      .field("user", userId)
    expect(response.status).toBe(201)
  })

  test("should create a single time visit", async () => {
    const expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + 15)
    const userId = await testHelpers.getUserId()
    const response = await request(server.router)
      .post("/api/visit/create/visit")
      .set("Content-Type", "multipart/form-data")
      .auth(process.env.TEST_ACCESS_TOKEN || "", { type: "bearer" })
      .field("firstName", faker.name.firstName())
      .field("lastName", faker.name.lastName())
      .field("visitType", "singleTime")
      .field("expireDate", expireDate.toISOString())
      .field("user", userId)
    expect(response.status).toBe(201)
  })
}

export default visitTests
