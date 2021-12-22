import request from "supertest"
import server from "../server"
import testHelpers from "./helpers/testHelpers"

const unitTests = () => {
  test("should create a unit", async () => {
    const userId = await testHelpers.getUserId()
    const response = await request(server.router)
      .post("/api/unit/create/unit")
      .set("accept", "application/json")
      .auth(process.env.TEST_ACCESS_TOKEN || "", { type: "bearer" })
      .send({
        user: userId,
        unitType: "apartment",
        dayOfPayment: 15,
        monthlyPayments: true,
        monthlyAmount: 5000,
        floor: 15,
        roomNumber: 1504,
      })
    expect(response.status).toBe(201)
  })
}

export default unitTests
