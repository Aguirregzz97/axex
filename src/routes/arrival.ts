import express from "express"
import controller from "../controllers/arrival"
import auth from "../middleware/auth"

const router = express()

router.get("/get/visit-arrivals", auth, controller.getVisitArrivals)
router.get("/get/user-visit-arrivals", auth, controller.getUserVisitArrivals)
router.get("/get/residency-arrivals", auth, controller.getResidencyArrivals)
router.get(
  "/get/residency-monthly-arrivals",
  auth,
  controller.getMonthResidencyArrivals,
)
// this is a get just to make it work in chrome for now
router.get("/create/arrival", controller.createArrival)

export default router
