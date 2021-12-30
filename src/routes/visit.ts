import bodyParser from "body-parser"
import express from "express"
import multer from "multer"
import controller from "../controllers/visit"

const upload = multer()

const router = express()

const jsonParser = bodyParser.json()

router.post("/create/visit", upload.single("file"), controller.createVisit)
router.get("/get/user-visits", jsonParser, controller.getUserVisits)

export default router
