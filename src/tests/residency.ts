import faker from "faker"
import request from "supertest"
import server from "../server"

const residencyTests = () => {
  let residencyId = ""
  it("should create residency", async () => {
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

  it("should get a residency", async () => {
    await request(server.router)
      .get("/api/residency/get/residency")
      .set("accept", "application/json")
      .send({ id: residencyId })
      .expect(200)
  })
}

export default residencyTests
