import express from "express"
import controller from "../controllers/paymentRequest"
import pagination from "../middleware/pagination"

const router = express()

router.get(
  "/get/user-payment-requests",
  pagination.paginatedOptions,
  controller.getUserPaymentRequests as any,
)
router.post("/create/payment-request", controller.createPaymentRequest)
router.get(
  "/get/residency-payment-requests",
  controller.getResidencyPaymentRequests,
)

export default router
