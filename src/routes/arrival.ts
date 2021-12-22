import express from "express"
import controller from "../controllers/arrival"
import auth from "../middleware/auth"

const router = express()

router.get("/get/visit-arrivals", auth, controller.getVisitArrivals)
router.get("/get/user-visit-arrivals", auth, controller.getUserVisitArrivals)
// this is a post just to make it work in chrome for now
router.get("/create/arrival", controller.createArrival)

export = router
