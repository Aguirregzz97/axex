import express from "express"
import controller from "../controllers/user"
import auth from "../middleware/auth"
import pagination from "../middleware/pagination"

const router = express()

router.post("/create/user", controller.createUser)
router.post("/create/login/user", controller.loginUser)
router.get("/get/user", auth, controller.getUser)
router.get("/get/users", auth, controller.getUsers)
router.get(
  "/get/residency-users/count",
  auth,
  controller.getResidencyUsersCount,
)
router.get(
  "/get/residency-users",
  auth,
  pagination.paginatedOptions,
  controller.getResidencyUsers as any,
)
router.get("/get/token", controller.generateToken)
router.put("/put/user/block", auth, controller.blockUser)
router.delete("/delete/logout", controller.logout)

export default router
