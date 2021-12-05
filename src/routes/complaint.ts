import express from "express"
import controller from "../controllers/complaint"

const router = express()

router.get("/get/residency-complaints", controller.getComplaints)
router.post("/create/complaint", controller.createComplaint)

export = router
