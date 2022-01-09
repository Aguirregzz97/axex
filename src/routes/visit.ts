import bodyParser from "body-parser"
import express from "express"
import multer from "multer"
import controller from "../controllers/visit"
import pagination from "../middleware/pagination"

const upload = multer()

const router = express()

const jsonParser = bodyParser.json()

router.post("/create/visit", upload.single("file"), controller.createVisit)
router.get(
  "/get/user-visits",
  jsonParser,
  pagination.paginatedOptions,
  controller.getUserVisits as any,
)

export default router
