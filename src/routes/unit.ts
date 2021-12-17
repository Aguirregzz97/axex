import express from "express"
import controller from "../controllers/unit"

const router = express()

router.get("/get/user-unit", controller.getUserUnit)
router.get("/get/residency-units", controller.getResidencyUnits)
router.post("/create/unit", controller.createUnit)

export = router
