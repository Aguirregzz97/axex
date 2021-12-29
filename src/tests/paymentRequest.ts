import request from "supertest"
import faker from "faker"
import server from "../server"
import testHelpers from "./helpers/testHelpers"

const paymentRequestTests = () => {
  test("should create a payment request", async () => {
    const paymentRequestExpireDate = new Date()
    paymentRequestExpireDate.setDate(paymentRequestExpireDate.getDate() + 15)
    const response = await request(server.router)
      .post("/api/payment-request/create/payment-request")
      .set("accept", "applicaiton/json")
      .auth(process.env.TEST_ACCESS_TOKEN || "", { type: "bearer" })
      .send({
        amount: faker.datatype.number({ min: 10, max: 500 }),
        user: await testHelpers.getUserId(),
        expireDate: paymentRequestExpireDate.toISOString(),
        description: faker.commerce.productDescription(),
      })
    expect(response.status).toBe(201)
  })
}

export default paymentRequestTests
