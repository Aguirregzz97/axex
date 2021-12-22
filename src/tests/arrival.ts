import faker from "faker"
import request from "supertest"
import { IVisit } from "../interfaces/visit"
import server from "../server"
import testHelpers from "./helpers/testHelpers"

// create arrival is a get just to make it work in chrome for now

const arrivalTests = () => {
  test("should create an arrival with a permament visit", async () => {
    const permanentVisit = await testHelpers.getPermanentVisit()
    const response = await request(server.router)
      .get("/api/arrival/create/arrival")
      .set("accept", "application/json")
      .auth(process.env.TEST_ACCESS_TOKEN || "", { type: "bearer" })
      .query({
        accessCode: permanentVisit?.accessCode,
        visit: permanentVisit?.id,
      })
    expect(response.status).toBe(201)
  })

  let singleTimeArrivalCreatedVisit: (IVisit & { _id: any }) | null
  test("should create an arrival with a single time visit", async () => {
    const singleTimeVisit = await testHelpers.getSingleTimeVisit()
    const response = await request(server.router)
      .get("/api/arrival/create/arrival")
      .set("accept", "application/json")
      .auth(process.env.TEST_ACCESS_TOKEN || "", { type: "bearer" })
      .query({
        accessCode: singleTimeVisit?.accessCode,
        visit: singleTimeVisit?.id,
      })
    singleTimeArrivalCreatedVisit = await testHelpers.getVisitById(
      response.body.result.visit,
    )
    expect(response.status).toBe(201)
  })

  test("should decline an arrival with incorrect access code", async () => {
    const permanentVisit = await testHelpers.getPermanentVisit()
    const response = await request(server.router)
      .get("/api/arrival/create/arrival")
      .set("accept", "application/json")
      .auth(process.env.TEST_ACCESS_TOKEN || "", { type: "bearer" })
      .query({
        accessCode: faker.internet.password(),
        visit: permanentVisit?.id,
      })
    expect(response.status).toBe(403)
  })

  test("should decline an arrival that has already accesed", async () => {
    const response = await request(server.router)
      .get("/api/arrival/create/arrival")
      .set("accept", "application/json")
      .auth(process.env.TEST_ACCESS_TOKEN || "", { type: "bearer" })
      .query({
        accessCode: singleTimeArrivalCreatedVisit?.accessCode,
        visit: singleTimeArrivalCreatedVisit?.id,
      })
    expect(response.status).toBe(403)
  })

  test("should decline an arrival with an expired date", async () => {
    await testHelpers.expireSingleTimeVisit()
    const singleTimeVisit = await testHelpers.getSingleTimeVisit()
    const response = await request(server.router)
      .get("/api/arrival/create/arrival")
      .set("accept", "application/json")
      .auth(process.env.TEST_ACCESS_TOKEN || "", { type: "bearer" })
      .query({
        accessCode: singleTimeVisit?.accessCode,
        visit: singleTimeVisit?.id,
      })
    expect(response.status).toBe(403)
  })
}

export default arrivalTests
