import express from "express"
import controller from "../controllers/announcement"

const router = express()

router.get("/get/residency-announcements", controller.getAnnouncements)
router.post("/create/announcement", controller.createAnnouncement)

export = router
