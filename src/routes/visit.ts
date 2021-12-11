import express from "express"
import multer from "multer"
import controller from "../controllers/visit"

const upload = multer()

const router = express()

router.post("/create/visit", upload.single("file"), controller.createVisit)

export = router
