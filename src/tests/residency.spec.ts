import mongoose from "mongoose"
import faker from "faker"
import request from "supertest"
import { Server } from "http"
import Residency from "../models/residency"
import User from "../models/user"
import server from "../server"

describe("Residency", () => {
  let residencyId = ""
  test("should create residency", async () => {
    const response = await request(server.router)
      .post("/api/residency/create/residency")
      .set("accept", "application/json")
      .send({
        name: faker.company.companyName(),
        logo: faker.image.imageUrl(),
        address: faker.address.streetAddress(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
      })
    residencyId = response.body.result._id
    expect(response.status).toBe(201)
  })

  test("should get a residency", async () => {
    await request(server.router)
      .get("/api/residency/get/residency")
      .set("accept", "application/json")
      .send({ id: residencyId })
      .expect(200)
  })
})

const closeServer = async (httpServer: Server): Promise<void> => {
  return new Promise((resolve, reject) => {
    httpServer.close((error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

afterAll(async () => {
  await User.deleteMany()
  await Residency.deleteMany()
  await closeServer(server.httpServer)
  await mongoose.connection.close()
})
