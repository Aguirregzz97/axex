import express from "express"
import controller from "../controllers/residency"

const router = express()

router.post("/create/residency", controller.createResidency)
router.get("/get/residency", controller.getResidency)

export = router
