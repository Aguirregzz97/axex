import express from "express"
import controller from "../controllers/dataInit"

const router = express()

router.post("/create/data-init", controller.createDataInit)

export = router
