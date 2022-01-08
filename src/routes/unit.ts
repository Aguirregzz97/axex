import express from "express"
import controller from "../controllers/unit"
import pagination from "../middleware/pagination"

const router = express()

router.get("/get/user-unit", controller.getUserUnit)
router.get(
  "/get/residency-units",
  pagination.paginatedOptions,
  controller.getResidencyUnits as any,
)
router.post("/create/unit", controller.createUnit)

export default router
