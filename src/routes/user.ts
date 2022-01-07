import express from "express"
import controller from "../controllers/user"
import auth from "../middleware/auth"
import pagination from "../middleware/pagination"
import User from "../models/user"

const router = express()

router.post("/create/user", controller.createUser)
router.post("/create/login/user", controller.loginUser)
router.get("/get/users", auth, controller.getUsers)
router.get("/get/residency-users/count", controller.getResidencyUsersCount)
router.get(
  "/get/residency-users",
  auth,
  pagination.paginatedOptions(User, { userRole: "resident" }),
  controller.getResidencyUsers as any,
)
router.get("/get/token", controller.generateToken)
router.delete("/delete/logout", controller.logout)

export default router
