import express from "express"
import { register_user, login_user,logout_user,get_current_user } from "../controller/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { validateBody } from "../middleware/validate.middleware.js"
import { registerSchema, loginSchema } from "../validators/auth.validator.js"

const router = express.Router()

router.post("/register", validateBody(registerSchema), register_user)
router.post("/login", validateBody(loginSchema), login_user)
router.post("/logout", logout_user)
router.get("/me", authMiddleware,get_current_user)

export default router