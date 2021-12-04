import express from "express"
import controller from "../controllers/user"
import auth from "../middleware/auth"

const router = express()

router.post("/create", controller.createUser)
router.get("/get/login", controller.loginUser)
router.get("/get/users", auth, controller.getUsers)
router.get("/get/token", controller.generateToken)
router.delete("/delete/logout", controller.logout)

export = router
