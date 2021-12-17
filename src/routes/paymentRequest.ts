import express from "express"
import controller from "../controllers/paymentRequest"

const router = express()

router.get("/get/user-payment-requests", controller.getUserPaymentRequests)
router.post("/create/payment-request", controller.createPaymentRequest)
router.get(
  "/get/residency-payment-requests",
  controller.getResidencyPaymentRequests,
)

export = router
