import express from "express"
import controller from "../controllers/payment"

const router = express()

router.get("/get/residency-payments", controller.getResidencyPayments)
router.get("/get/user-payments", controller.getUserPayments)
router.post("/create/payment", controller.createPayment)

export = router
