import express from "express"
import controller from "../controllers/incident"

const router = express()

router.get("/get/residency-incidents", controller.getIncidents)
router.post("/create/incident", controller.createIncident)

export = router
