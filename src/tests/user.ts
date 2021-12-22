import faker from "faker"
import request from "supertest"
import dotenv from "dotenv"
import config from "../config/config"
import server from "../server"
import testHelpers from "./helpers/testHelpers"

dotenv.config()

const userTests = () => {
  const userEmail = config.server.testUserEmail
  const userPassword = config.server.testUserPassword
  test("should create user", async () => {
    const residencyId = await testHelpers.getResidencyId()
    const response = await request(server.router)
      .post("/api/user/create/user")
      .set("accept", "application/json")
      .send({
        email: userEmail,
        password: userPassword,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        blocked: false,
        residency: residencyId,
      })
    expect(response.status).toBe(201)
  })

  test("should login user", async () => {
    const response = await request(server.router)
      .get("/api/user/get/login/user")
      .set("accept", "application/json")
      .send({
        email: userEmail,
        password: userPassword,
      })
    process.env.TEST_ACCESS_TOKEN = response.body.accessToken
    expect(response.status).toBe(200)
  })

  test("should get users", async () => {
    const response = await request(server.router)
      .get("/api/user/get/users")
      .set("accept", "application/json")
      .auth(process.env.TEST_ACCESS_TOKEN || "", { type: "bearer" })
    expect(response.status).toBe(200)
  })
}

export default userTests
