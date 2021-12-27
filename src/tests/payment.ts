import request from "supertest"
import server from "../server"
import testHelpers from "./helpers/testHelpers"

const paymentTests = () => {
  test("should create a payment", async () => {
    const paymentRequestID = await testHelpers.getPaymentRequestId()
    const response = await request(server.router)
      .post("/api/payment/create/payment")
      .set("accept", "application/json")
      .auth(process.env.TEST_ACCESS_TOKEN || "", { type: "bearer" })
      .send({
        paymentRequest: paymentRequestID,
        approved: true,
      })
    expect(response.status).toBe(201)
  })
}

export default paymentTests
